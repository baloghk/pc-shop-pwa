import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';

const firebaseConfig = {
  apiKey: 'AIzaSyDSuuazWcB4mJUQIwJ1At83S9-8w5GM3zY',
  authDomain: 'pc-shop-pwa.firebaseapp.com',
  projectId: 'pc-shop-pwa',
  storageBucket: 'pc-shop-pwa.firebasestorage.app',
  messagingSenderId: '662803522709',
  appId: '1:662803522709:web:bbfb597da28cf04699679c',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => getFirestore())
    ),
  ],
};
