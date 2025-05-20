import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsFirebaseService {
  constructor(private firestore: Firestore) {}

  getProductsCollection(): Observable<any[]> {
    const productsRef = collection(this.firestore, 'products');
    return collectionData(productsRef, { idField: 'id' }) as Observable<any[]>;
  }

  getProductsByCategory(category?: string): Observable<any[]> {
    const productsRef = collection(this.firestore, 'products');

    if (!category) {
      return collectionData(productsRef, { idField: 'id' }) as Observable<
        any[]
      >;
    }

    return collectionData(productsRef, { idField: 'id' }).pipe(
      map((items) =>
        items.filter(
          (item) =>
            item['category'] &&
            item['category'].toLowerCase() === category.toLowerCase()
        )
      )
    ) as Observable<any[]>;
  }
}
