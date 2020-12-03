import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQFi3cjVG3Lu707opR4pZqd-mH9WsdFlA",
  authDomain: "organizer-17294.firebaseapp.com",
  databaseURL: "https://organizer-17294.firebaseio.com",
  projectId: "organizer-17294",
  storageBucket: "organizer-17294.appspot.com",
  messagingSenderId: "536255825437",
  appId: "1:536255825437:web:017026d9a8e14425ac68f4",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
