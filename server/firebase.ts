import { initializeApp } from 'firebase/app';
import { User } from '../shared/types/users';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const googleProvider = provider;

const firebaseConfig = {
  appId: process.env.NEXT_PUBLIC_APPID,
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  projectId: process.env.NEXT_PUBLIC_PROJECTID || `smart-garden-abbf4`,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const Environments = {
    prod: ``,
    beta: `beta_`,
}
  
export const DatabaseTableNames = {
    users: `users`,
    plants: `plants`,
}

export const environment = process.env.NODE_ENV == `production` ? Environments.prod : Environments.beta;

export const userConverter = {
    toFirestore: (usr: User) => {
      return JSON.parse(JSON.stringify(usr));
    },
    fromFirestore: (snapshot: any, options: any) => {
      const data = snapshot.data(options);
      return new User(data);
    }
}

export default app;