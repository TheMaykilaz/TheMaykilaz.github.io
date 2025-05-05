import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAXt4yNF70zPyOfsy5HsczDmlp9kr4w0uU",
    authDomain: "lab4-f53f0.firebaseapp.com",
    projectId: "lab4-f53f0",
    storageBucket: "lab4-f53f0.firebasestorage.app",
    messagingSenderId: "604316381497",
    appId: "1:604316381497:web:5d4cb483d89367def0b8e8",
    measurementId: "G-ERNHZ2HS8R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Функція для отримання бронювань
export const getUserBookings = async (userId) => {
    const bookingsRef = collection(db, "bookings");
    const q = query(bookingsRef, where("userId", "==", userId));  // Запит по userId
    const querySnapshot = await getDocs(q);
    const bookings = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
    return bookings;
};

// Функція для додавання нового бронювання
export const addBooking = async (bookingData) => {
    try {
        const docRef = await addDoc(collection(db, "bookings"), bookingData);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

// Функція для оновлення бронювання
export const updateBooking = async (bookingId, updatedData) => {
    const bookingRef = doc(db, "bookings", bookingId);
    await updateDoc(bookingRef, updatedData);
    console.log(`Booking ${bookingId} updated`);
};

// Функція для видалення бронювання
export const deleteBooking = async (bookingId) => {
    const bookingRef = doc(db, "bookings", bookingId);
    await deleteDoc(bookingRef);
    console.log(`Booking ${bookingId} deleted`);
};
