import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_APP_API_FIREBASE_KEY,
	authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
	projectId: import.meta.env.VITE_APP_PROJECT_ID,
	storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_APP_MESSAGE_ID,
	appId: import.meta.env.VITE_APP_FIRESTORE_ID,
	measurementId: import.meta.env.VITE_APP_MESSURE_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
