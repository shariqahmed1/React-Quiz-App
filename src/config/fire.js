import * as firebase from 'firebase';
 const config = {
    apiKey: "AIzaSyDJ8Nor7LYPuqPZ3Y5lSJfmsTcAz8XEcl4",
    authDomain: "sa-reactquiz.firebaseapp.com",
    databaseURL: "https://sa-reactquiz.firebaseio.com",
    projectId: "sa-reactquiz",
    storageBucket: "sa-reactquiz.appspot.com",
    messagingSenderId: "816386859381"
  };
  const fire = firebase.initializeApp(config);
  export default fire;