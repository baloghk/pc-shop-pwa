import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/product';
import { doc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class OrderFirebaseService {
  constructor(private firestore: Firestore) {}

  getOrdersCollection(): Observable<any[]> {
    const ordersRef = collection(this.firestore, 'orders');
    return collectionData(ordersRef, { idField: 'id' }) as Observable<any[]>;
  }

  async createOrder(
    items: Product[],
    price: number,
    message?: string
  ): Promise<void> {
    try {
      const ordersRef = collection(this.firestore, 'orders');
      await addDoc(ordersRef, {
        items,
        price,
        message,
      });

      console.log('Rendelés sikeresen leadva és adatbázisba mentve.');
    } catch (error) {
      console.error('Hiba a rendelés leadása során:', error);
      throw error;
    }
  }

  async deleteOrder(orderId: string): Promise<void> {
    try {
      const orderRef = doc(this.firestore, 'orders', orderId);
      await deleteDoc(orderRef);
      console.log('Rendelés sikeresen törölve.');
      alert('Rendelés sikeresen törölve.');
    } catch (error) {
      console.error('Hiba a rendelés törlése során:', error);
      throw error;
    }
  }
}
