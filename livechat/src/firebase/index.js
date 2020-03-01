 import * as firebase from 'firebase/app';
 import 'firebase/database';
 import 'firebase/auth';
const apikey = `${process.env.REACT_APP_API_KEY}`


  var firebaseConfig = {
    apiKey: apikey,
    authDomain: "livechat-19851.firebaseapp.com",
    databaseURL: "https://livechat-19851.firebaseio.com",
    projectId: "livechat-19851",
    storageBucket: "livechat-19851.appspot.com",
    messagingSenderId: "844930179758",
    appId: "1:844930179758:web:2b29ae20bbde7082"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

      // messages database
  let messagesRef = firebase.database().ref('messages');

    // get data from database
  let getDataBase = firebase.database();
  let dataRef     = getDataBase.ref('messages');

  // data from current user

  export {
   firebase, messagesRef, dataRef as default
  }