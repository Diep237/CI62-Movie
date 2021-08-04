
  var firebaseConfig = {
    apiKey: "AIzaSyC3Q6U16ZvepP33r8zRgUbe8nt3HlSXJEA",
    authDomain: "ci62-movie.firebaseapp.com",
    projectId: "ci62-movie",
    databaseURL:"https://ci62-movie-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: "ci62-movie.appspot.com",
    messagingSenderId: "217197745039",
    appId: "1:217197745039:web:01e06d18087757c8a331fa",
    measurementId: "G-P16XY1D9H0"
    
  };
  // Initialize Firebase
  const firebaseDB = firebase.initializeApp(firebaseConfig);
  firebase.analytics();
 
  export {firebaseDB}