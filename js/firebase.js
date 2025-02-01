import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import{getAuth} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import {getStorage } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDnPRsErSSNV6MuUv6vNnoSgbL4u4rq_lQ",
    authDomain: "jltf-dicis-ej2025.firebaseapp.com",
    projectId: "jltf-dicis-ej2025",
    storageBucket: "jltf-dicis-ej2025.firebasestorage.app",
    messagingSenderId: "1087682881833",
    appId: "1:1087682881833:web:849b6f2e35b5c0faebef38",
    measurementId: "G-9JTTS0XDBL"
  };

  const app = initializeApp(firebaseConfig)
  export const auth = getAuth (app)
  export const db = getFirestore (app)
  export const storage = getStorage (app)
  