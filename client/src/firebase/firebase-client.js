import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const CONFIG = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(CONFIG);
    this.auth = app.auth();
    this.db = app.database();
  }

  // auth api methods
  doCreateUserWithEmailAndPassword = (email, password) => 
    this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();
  doResetPassword = (email) => this.auth.sendPasswordResetEmail(email);
  doUpdatePassword = (password) => this.auth.currentUser.updatePassword(password);

  // user api methods
  getUser = (user) => this.db.ref(`users/${user.uid}`);
  getUsers = () => this.db.ref('users');
};

export default Firebase;