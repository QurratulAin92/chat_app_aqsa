import  firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"


var firebaseConfig = {
    apiKey: "AIzaSyCKukFe9Ex_I8s3aNATY2Y08RNDGtVnFoU",
    authDomain: "react-chat-a36ae.firebaseapp.com",
    databaseURL: "https://react-chat-a36ae-default-rtdb.firebaseio.com",
    projectId: "react-chat-a36ae",
    storageBucket: "react-chat-a36ae.appspot.com",
    messagingSenderId: "239368021262",
    appId: "1:239368021262:web:e7493a08ead433fde1635f",
    measurementId: "G-5JXDDEQEB9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase; 

