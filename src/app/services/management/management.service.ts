import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Product } from '../../shared/product';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  private db!: IDBDatabase;
  private readonly objectStoreName = 'products'; // Object store neve

  public products: Product[] = [];

  constructor() {
    // Adatbázis létrehozása (ha még nem létezik) és megnyitása
    const request = indexedDB.open('products-db', 1);

    // Error kezelése az adatbázis létrehozásakor/megnyitásakor
    request.onerror = (event: any) => {
      console.log('Database error:', event.target.error);
    };

    // Ha a verziószám növekedett (vagy most hoztuk létre az adatbázist), itt kell frissíteni az object store sémát
    request.onupgradeneeded = (event: any) => {
      const db: IDBDatabase = event.target.result;

      // Object store létrehozása
      const objectStore = db.createObjectStore(this.objectStoreName, {
        keyPath: 'id',
        autoIncrement: true,
      });

      // Adatbázis index létrehozása a hatékonyabb működés érdekében
      objectStore.createIndex('nameIndex', 'name', { unique: false });
    };

    // Adatbázis sikeres létrehozásának&megnyitásának kezelése
    request.onsuccess = (event: any) => {
      this.db = event.target.result;
      this.loadProducts();
    };
  }

  public createProduct(product: Product): void {
    // Először ellenőrizzük, hogy létezik-e már a termék (pl. név alapján)
    const transaction = this.db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);

    // Index alapján keresünk (pl. név index)
    const index = objectStore.index('nameIndex');
    const request = index.get(product.name);

    request.onsuccess = (event: any) => {
      const existingProduct = event.target.result;

      if (existingProduct) {
        // Ha létezik, növeljük a quantity értéket
        existingProduct.quantity = (existingProduct.quantity || 0) + 1;

        // Frissítjük az adatbázisban
        const updateRequest = objectStore.put(existingProduct);

        updateRequest.onsuccess = () => {
          console.log('Termék mennyisége frissítve:', existingProduct);

          // Memóriában is frissítjük a terméket
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
        // Ha nem létezik, hozzáadjuk az új terméket
        const addRequest = objectStore.add(product);

        addRequest.onsuccess = (event: any) => {
          const newProduct: Product = {
            ...product,
            id: event.target.result, // Új ID mentése
            quantity: 1, // Mennyiség kezdeti értéke
          };
          this.products.push(newProduct);
          console.log('Új termék hozzáadva:', newProduct);
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

  private loadProducts(): void {
    // Object store tranzakció létrehozása és object store lekérése
    const objectStore = this.db
      .transaction(this.objectStoreName)
      .objectStore(this.objectStoreName);

    // Adatbázisban tárolt objektumok bejárása kurzor segítségével
    // Itt lehet opcionálisan további feltételeket definiálni (az SQL "WHERE"-hez hasonlóan)
    objectStore.openCursor().onsuccess = (event: any) => {
      const cursor = event.target.result;

      if (cursor) {
        this.products.push(cursor.value);

        cursor.continue(); // Következő elemre lépés
      }
    };
  }
}
