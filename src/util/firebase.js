import firebase from "firebase";
var firebaseConfig = {
    apiKey: "AIzaSyBDO8myFP-ysCVnzojv0RytXNV0sWJLN1M",
    authDomain: "crud-react-1510d.firebaseapp.com",
    databaseURL: "https://crud-react-1510d.firebaseio.com",
    projectId: "crud-react-1510d",
    storageBucket: "crud-react-1510d.appspot.com",
    messagingSenderId: "862635397640",
    appId: "1:862635397640:web:6d25dd8f0078bed8d6f7bd",
    measurementId: "G-QDGDCC6X6W"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
export default firebase;
