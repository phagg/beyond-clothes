import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA1wLk6Yva6L88gSToDTdUfqqm_JFWjdHw",
    authDomain: "beyond-db-e1532.firebaseapp.com",
    databaseURL: "https://beyond-db-e1532.firebaseio.com",
    projectId: "beyond-db-e1532",
    storageBucket: "beyond-db-e1532.appspot.com",
    messagingSenderId: "337469562295",
    appId: "1:337469562295:web:2d776af6066b7ee0e11c32",
    measurementId: "G-SRFY5R58T1"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`) 
    const snapShot = await userRef.get();

    console.log(snapShot);
    // check if there is a userprofile 
    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      // create a new userprofil document
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error created user', error.message);
      }
    }
      return userRef;
  };

  firebase.initializeApp(config)

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;

