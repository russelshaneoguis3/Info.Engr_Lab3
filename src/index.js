// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPyK7IB0J_mtMXnwF46z1ouZsuOJaO5tw",
  authDomain: "oguislab.firebaseapp.com",
  projectId: "oguislab",
  storageBucket: "oguislab.appspot.com",
  messagingSenderId: "827804987095",
  appId: "1:827804987095:web:e8d02d074f5619ea8f0a92",
  measurementId: "G-XQNJZCEWG2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(app)

const db = getFirestore(app);
const saveBtn = document.querySelector(".save")
saveBtn.addEventListener("click", async () => {
    const collectionRef = collection(db, "gadgets")
    const newGadget = await addDoc(collectionRef, {
        name: "Phone",
        os: "Android",
        version: "11"
    });

    console.log(`Created a new gadget: ${newGadget.id}`)
})


