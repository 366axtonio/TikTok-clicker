
// Firebase-Konfiguration (ersetzen mit deinen echten Daten)
const firebaseConfig = {
  apiKey: "AIzaSyDA2750QzYrgowjEMg-ttIjVJv40OrnIzI",
  authDomain: "tiktok-clicker.firebaseapp.com",
  projectId: "tiktok-clicker",
  storageBucket: "tiktok-clicker.firebasestorage.app",
  messagingSenderId: "1038465084599",
  appId: "1:1038465084599:web:0fb17a388dbb072851f132",
  databaseURL: "https://tiktok-clicker-default-rtdb.firebaseio.com/"
};

// Initialisieren
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
