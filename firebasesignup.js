let success = false;

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
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
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
            success = true;
            alert("created acc")

            if (success = true) {

                const newUser = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value
                };

                // Store user data for future logins
                const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
                const userExists = existingUsers.find(user => user.email === newUser.email);

                if (!userExists) {
                    existingUsers.push(newUser);
                    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
                }

                // Set as current user
                localStorage.setItem('currentUser', JSON.stringify(newUser));

                // Show success message and redirect
                alert(`Account created successfully! Welcome, ${newUser.name}!`);
                window.location.href = 'index.html';
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
        });

})
console.log(success)