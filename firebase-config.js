
// Firebase-Konfiguration (ersetzen mit deinen echten Daten)
const firebaseConfig = {
  apiKey: "DEINE_API_KEY",
  authDomain: "DEIN_AUTH_DOMAIN",
  projectId: "DEIN_PROJECT_ID",
  storageBucket: "DEIN_STORAGE_BUCKET",
  messagingSenderId: "DEIN_SENDER_ID",
  appId: "DEINE_APP_ID",
  databaseURL: "https://DEIN_PROJECT_ID.firebaseio.com"
};

// Initialisieren
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
