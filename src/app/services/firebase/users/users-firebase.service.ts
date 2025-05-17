import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import {
  Auth,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UsersFirebaseService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  async registerUser(
    email: string,
    password: string,
    username: string,
    forename: string,
    surname: string
  ): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      const userRef = doc(this.firestore, `users/${userCredential.user.uid}`);
      await setDoc(userRef, {
        email,
        username,
        forename,
        surname,
        createdAt: new Date(),
      });

      console.log('Felhasználó sikeresen regisztrálva és adatbázisba mentve.');
    } catch (error) {
      console.error('Hiba a regisztráció során:', error);
      throw error;
    }
  }

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = this.auth.currentUser;

    if (!user || !user.email) {
      return Promise.reject(new Error('Nem vagy bejelentkezve.'));
    }

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    try {
      // Újra hitelesítés a régi jelszóval
      await reauthenticateWithCredential(user, credential);
      // Jelszó módosítása az újra
      await updatePassword(user, newPassword);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
