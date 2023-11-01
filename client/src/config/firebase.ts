// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBAEUowZsHJ41ed87rEvoqVetlXVODKT0k",
	authDomain: "my-blog-app-fd7dd.firebaseapp.com",
	projectId: "my-blog-app-fd7dd",
	storageBucket: "my-blog-app-fd7dd.appspot.com",
	messagingSenderId: "94505762613",
	appId: "1:94505762613:web:a2bb0b81ba898773b1567c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
