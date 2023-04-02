// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, connectFirestoreEmulator, query, getDocs, setDoc, doc, deleteDoc, onSnapshot, querySnapshot } from "firebase/firestore"; 

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

const db = getFirestore();
connectFirestoreEmulator(db, 'localhost', 8080);


const saveBtn = document.querySelector(".save")
saveBtn.addEventListener("click", async () => {
    const fruitCollectionRef = collection(db, 'fruits')
    try {
    const newFruitRef = await addDoc(fruitCollectionRef, {
        name: "Apple",
        color: "red",
        size: "small"
    })
    console.log(`Created a new fruit: ${newFruitRef.id}`)
  }catch (error) {
    console.log(error)
  }
})

const getDataBtn = document.querySelector(".data")
getDataBtn.addEventListener("click", async () => {
  const q = query(collection(db, "fruits"))
  const fruits = await getDocs(q)
  fruits.forEach((fruit) =>  {
    console.log(fruit.data())
  })
})

const changeDataBtn = document.querySelector(".change-data")
changeDataBtn.addEventListener("click", async () =>
{
  const q = query(collection(db, "fruits"))
  const fruits = await getDocs(q)
  if(fruits.empty){
    console.log("No data to change yet")
    return
  }
  try {
    await setDoc(doc(db, 'fruits', fruits.docs[0].id), {
      name: "Banana",
      color: "yellow",
      size: "long"
    }, {merge: true})
    console.log("Data updated successfully")
  } catch (error) {
    console.log(error)
  }
})

const deleteDataBtn = document.querySelector(".delete")
deleteDataBtn.addEventListener('click', async () => {
  const q = query(collection(db, "fruits"))
  const fruits = await getDocs(q)
  if(fruits.empty){
    console.log("No data to be deleted")
    return
  }
  await deleteDoc(doc(db, 'fruits', fruits.docs[fruits.docs.length-1].id))
  console.log("Deleted Successfully")
})

const q = query(collection(db, "fruits"))
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  console.log("-----------------------------------------------------")
  querySnapshot.forEach((fruit) => {
    console.log(fruit.data())
  })
})

//unsubscribe()