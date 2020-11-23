import { Injectable } from "@angular/core";
import firebase from "firebase";

@Injectable()
export class FirebaseService {
  firebase;
  firebaseConfig = {
    apiKey: "AIzaSyAc0X6Oy_oxG3f1D83slkirAZBAvZMzCH0",
    authDomain: "sparkfabrik-assignment.firebaseapp.com",
    databaseURL: "https://sparkfabrik-assignment.firebaseio.com",
    projectId: "sparkfabrik-assignment",
    storageBucket: "sparkfabrik-assignment.appspot.com",
    messagingSenderId: "130071964387",
    appId: "1:130071964387:web:8d01a904bcf8b0e04f73d6",
    measurementId: "G-DMT0X3PYC6"
  };
  constructor() {}
  public initFirebase() {
    if (!firebase.apps.length) {
      this.firebase = firebase.initializeApp(this.firebaseConfig);
      console.log(this.firebase.name);
    }
  }
  /**
   * params: {email:string, password:string}
   */
  public login(params) {
    return this.firebase
      .auth()
      .signInWithEmailAndPassword(params.email, params.password);
  }
  /**
   * params: {email:string, password:string}
   */
  public register(params) {
    return this.firebase
      .auth()
      .createUserWithEmailAndPassword(params.email, params.password);
  }
  /**
   * uid
   */
  public getData(params) {
    let db = firebase.firestore();
    return db.collection(params).get();
  }
  /**
   * uid
   * item to add
   */
  public addNewQuote(value, item) {
    console.log(item);
    item.timestamp = new Date().getTime();
    let db = firebase.firestore();
    return db.collection(value).add(Object.assign({}, item));
  }
  /**
   * uid
   * item to delete
   */
  public delete(value, item) {
    let db = firebase.firestore();
    return db
      .collection(value)
      .doc(item.id)
      .delete();
  }
}
