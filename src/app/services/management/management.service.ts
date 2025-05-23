import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Product } from '../../shared/product';
import { CartNumberService } from '../cart/cart-number.service';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  private db!: IDBDatabase;
  private readonly objectStoreName = 'products';
  private dbReady: Promise<void>;
  public products: Product[] = [];

  constructor(private cartService: CartNumberService) {
    const request = indexedDB.open('products-db', 1);
    this.dbReady = this.initDB();

    request.onerror = (event: any) => {
      console.log('Database error:', event.target.error);
    };

    request.onupgradeneeded = (event: any) => {
      const db: IDBDatabase = event.target.result;

      const objectStore = db.createObjectStore(this.objectStoreName, {
        keyPath: 'id',
        autoIncrement: true,
      });

      objectStore.createIndex('nameIndex', 'name', { unique: false });
    };

    request.onsuccess = (event: any) => {
      this.db = event.target.result;
      this.loadProducts().then((products) => {
        this.products = products;
        this.recalculateCartQuantity();
      });
    };
  }

  // Termék hozzáadása vagy mennyiségének frissítése
  public createProduct(product: Product): void {
    const transaction = this.db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);

    const index = objectStore.index('nameIndex');
    const request = index.get(product.name);

    request.onsuccess = (event: any) => {
      const existingProduct = event.target.result;

      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 0) + 1;

        const updateRequest = objectStore.put(existingProduct);

        updateRequest.onsuccess = () => {
          console.log('Termék mennyisége frissítve:', existingProduct);
          this.cartService.setQuantity(this.cartService.getQuantity() + 1);

          const index = this.products.findIndex(
            (p) => p.id === existingProduct.id
          );
          if (index !== -1) {
            this.products[index] = existingProduct;
          }
        };

        updateRequest.onerror = (event: any) => {
          console.log('Hiba a termék frissítésekor:', event.target.error);
        };
      } else {
        const addRequest = objectStore.add(product);

        addRequest.onsuccess = (event: any) => {
          const newProduct: Product = {
            ...product,
            id: event.target.result,
            quantity: 1,
          };
          this.products.push(newProduct);
          console.log('Új termék hozzáadva:', newProduct);
          this.cartService.setQuantity(this.cartService.getQuantity() + 1);
        };

        addRequest.onerror = (event: any) => {
          console.log('Hiba a termék hozzáadásakor:', event.target.error);
        };
      }
    };

    request.onerror = (event: any) => {
      console.log('Hiba a termék lekérdezésekor:', event.target.error);
    };
  }

  // Adatbázis inicializálása
  private initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('products-db', 1);

      request.onerror = (event: any) => {
        console.log('Adatbázis hiba:', event.target.error);
        reject(event.target.error);
      };

      request.onupgradeneeded = (event: any) => {
        const db: IDBDatabase = event.target.result;
        const objectStore = db.createObjectStore(this.objectStoreName, {
          keyPath: 'id',
          autoIncrement: true,
        });
        objectStore.createIndex('nameIndex', 'name', { unique: false });
      };

      request.onsuccess = (event: any) => {
        this.db = event.target.result;
        resolve();
        console.log('Adatbázis inicializálva.');
      };
    });
  }

  // Termékek betöltése
  public async loadProducts(): Promise<Product[]> {
    await this.dbReady;
    return new Promise((resolve, reject) => {
      const products: Product[] = [];
      const transaction = this.db.transaction(this.objectStoreName);
      const objectStore = transaction.objectStore(this.objectStoreName);

      objectStore.openCursor().onsuccess = (event: any) => {
        const cursor = event.target.result;
        if (cursor) {
          products.push(cursor.value);
          cursor.continue();
        } else {
          resolve(products);
        }
      };

      objectStore.openCursor().onerror = (event: any) => {
        reject('Error loading products: ' + event.target.error);
      };
    });
  }

  // Termék eltávolítása
  public removeProduct(id: number): void {
    const transaction = this.db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);

    const request = objectStore.delete(id);

    request.onsuccess = () => {
      console.log('Termék törölve:', id);
      this.products = this.products.filter((product) => product.id !== id);
      this.cartService.setQuantity(this.cartService.getQuantity() - 1);
    };

    request.onerror = (event: any) => {
      console.log('Hiba a termék törlésekor:', event.target.error);
    };
  }

  // Kosár kiürítése
  public clearCart(): void {
    const transaction = this.db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);

    const request = objectStore.clear();

    request.onsuccess = () => {
      console.log('Kosár kiürítve');
      this.products = [];
      this.cartService.setQuantity(0);
    };

    request.onerror = (event: any) => {
      console.log('Hiba a kosár kiürítésekor:', event.target.error);
    };
  }

  // Kosár mennyiségének frissítése
  public updateProductQuantity(id: number, quantity: number): void {
    const transaction = this.db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);
    const request = objectStore.get(id);

    request.onsuccess = (event: any) => {
      const product = event.target.result;
      if (product) {
        product.quantity = quantity;
        objectStore.put(product).onsuccess = () => {
          console.log('Termék mennyisége frissítve:', id, quantity);
          if (quantity === 0) {
            this.recalculateCartQuantity();
          } else {
            this.recalculateCartQuantity();
          }
        };
      }
    };
  }

  // Kosárban lévő termékek számának lekérdezése
  public getProductCount(): number {
    return this.products.reduce(
      (sum, product) => sum + (product.quantity || 0),
      0
    );
  }

  // Kosár mennyiségének újraszámítása
  public recalculateCartQuantity(): void {
    const transaction = this.db.transaction(this.objectStoreName, 'readonly');
    const objectStore = transaction.objectStore(this.objectStoreName);
    const request = objectStore.getAll();

    request.onsuccess = (event: any) => {
      const products = event.target.result;
      const totalQuantity = products.reduce(
        (sum: number, product: any) => sum + (product.quantity || 0),
        0
      );

      this.cartService.setQuantity(totalQuantity);
    };
  }
}
