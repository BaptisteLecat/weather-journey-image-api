import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseProvider {
  private initialized = false;

  constructor(private readonly configService: ConfigService) { }

  private initialize() {

    if (process.env.NODE_ENV == 'production') {
      admin.initializeApp();
    } else {
      // Import the service account key JSON file
      const service_account = require(`../../${this.configService.get<string>('SERVICE_ACCOUNT_KEY_FILE')}`);
      // Initialize Firebase Admin SDK
      admin.initializeApp(
        {
          credential: admin.credential.cert(service_account as admin.ServiceAccount),
        }
      );
    }

    this.initialized = true;
  }

  getFirestore(): FirebaseFirestore.Firestore {
    if (!this.initialized) {
      if (!admin.apps.length) { // Vérifiez que l'application n'est pas déjà initialisée
        this.initialize();
      }
    }
    return admin.firestore();
  }

  getAuth(): admin.auth.Auth {
    if (!this.initialized) {
      if (!admin.apps.length) { // Vérifiez que l'application n'est pas déjà initialisée
        this.initialize();
      }
    }
    return admin.auth();
  }
}
