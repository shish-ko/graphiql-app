import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyBBf9hUi5bVA0m9eMa79VzHiHE1dPWvBjg',
  authDomain: 'graphiql-313a5.firebaseapp.com',
  projectId: 'graphiql-313a5',
  storageBucket: 'graphiql-313a5.appspot.com',
  messagingSenderId: '550671677636',
  appId: '1:550671677636:web:ff6a6bdbcdc5898fc77191',
  measurementId: 'G-CPXQS71FZ2',
};
const app = initializeApp(firebaseConfig);
export const authState = getAuth(app);
