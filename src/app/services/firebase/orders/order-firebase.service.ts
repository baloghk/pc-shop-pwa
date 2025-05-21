import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable, of, switchMap } from 'rxjs';
import { Product } from '../../../shared/product';
import { doc, deleteDoc } from '@angular/fire/firestore';
import { UserProfile } from '../../../shared/user';
import { Shipping } from '../../../shared/shipping';
import { AuthFirebaseService } from '../authorization/auth-firebase.service';

@Injectable({
  providedIn: 'root',
})
export class OrderFirebaseService {
  constructor(
    private firestore: Firestore,
    private authService: AuthFirebaseService
  ) {}

  getOrdersCollection(): Observable<any[]> {
    const ordersRef = collection(this.firestore, 'orders');
    return collectionData(ordersRef, { idField: 'id' }) as Observable<any[]>;
  }

  getOrdersByUser(): Observable<any[]> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user) return of([]);

        const ordersRef = collection(this.firestore, 'orders');
        const userOrdersQuery = query(
          ordersRef,
          where('email', '==', user.email)
        );
        return collectionData(userOrdersQuery, { idField: 'id' }) as Observable<
          any[]
        >;
      })
    );
  }

  async createOrder(
    email: string,
    items: Product[],
    price: number,
    user?: UserProfile,
    shipping?: Shipping,
    message?: string
  ): Promise<void> {
    try {
      const ordersRef = collection(this.firestore, 'orders');
      const orderData: any = {
        email,
        items,
        price,
      };

      if (user) {
        orderData.user = user;
      }

      if (shipping) {
        orderData.shipping = shipping;
      }

      if (message) {
        orderData.message = message;
      }

      await addDoc(ordersRef, orderData);
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
