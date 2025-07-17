// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
let successfulLogin = false;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBpkzoRQDuNWenTw5Q5xEwRvC3Ygc0RXpg",
    authDomain: "newroject-b590f.firebaseapp.com",
    projectId: "newroject-b590f",
    storageBucket: "newroject-b590f.firebasestorage.app",
    messagingSenderId: "618943914238",
    appId: "1:618943914238:web:6caaef25938196f89c05af",
    measurementId: "G-7B6PYQ2F73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            
            alert("logged in successfully");
            successfulLogin = true;
            // Signed in 
            const user = userCredential.user;
            // ...
            if (successfulLogin = true) {
  
            const email = document.getElementById('email');
            const name = 'name' in localStorage ? JSON.parse(localStorage.getItem('currentUser')).name : email.value.split('@')[0];
            const currentUser = {
                email: email,
                name: name, // Use stored name or email prefix   
            }
            
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Show success message and redirect
            alert(`Welcome back, ${currentUser.name}!`);
            window.location.href = 'profile.html';
        


            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
        });

})
