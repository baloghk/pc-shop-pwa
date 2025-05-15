import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }), provideFirebaseApp(() => initializeApp({ projectId: "pc-shop-pwa", appId: "1:662803522709:web:bbfb597da28cf04699679c", storageBucket: "pc-shop-pwa.firebasestorage.app", apiKey: "AIzaSyDSuuazWcB4mJUQIwJ1At83S9-8w5GM3zY", authDomain: "pc-shop-pwa.firebaseapp.com", messagingSenderId: "662803522709" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
