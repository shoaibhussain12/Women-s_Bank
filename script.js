import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDokG9WCjg4HKtgC-gyQByFSew1ug3DYRs",
  authDomain: "resturant-website-9288e.firebaseapp.com",
  projectId: "resturant-website-9288e",
  storageBucket: "resturant-website-9288e.firebasestorage.app",
  messagingSenderId: "499831079014",
  appId: "1:499831079014:web:3027c4dbe176121068eda7",
  measurementId: "G-CT01ZZK4SM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "login.html";
    }).catch(alert);
};

window.signup = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "login.html";
    }).catch(alert);
};

window.googleLogin = function () {
  signInWithPopup(auth, provider)
    .then(() => {
      window.location.href = "login.html";
    }).catch(alert);
};

onAuthStateChanged(auth, (user) => {
  if (window.location.pathname.includes("login.html")) {
    if (user) {
      document.getElementById("userEmail").value = user.email;
    } else {
      alert("Please login first.");
      window.location.href = "index.html";
    }
  }
});

window.submitForm = function () {
  const username = document.getElementById("username").value;
  const userEmail = document.getElementById("userEmail").value;
  const message = document.getElementById("message").value;

  if (username && message) {
    push(ref(database, "contacts/"), {
      name: username,
      email: userEmail,
      message: message,
      timestamp: new Date().toISOString()
    });
    alert("Message sent successfully!");
    document.getElementById("username").value = "";
    document.getElementById("message").value = "";
  } else {
    alert("Please fill out all fields.");
  }
};


  const toggleBtn = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });



