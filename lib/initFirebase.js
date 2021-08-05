import firebase from "firebase/app";
import "firebase/analytics";

// firebase configurations for the web app
const firebaesConfig = {
	apiKey: "AIzaSyD8nPIVcwuhq7djSHMHqDM_TxR9v3Uq97s",
	authDomain: "globalcovid19info.firebaseapp.com",
	projectId: "globalcovid19info",
	storageBucket: "globalcovid19info.appspot.com",
	messagingSenderId: "897338202719",
	appId: "1:897338202719:web:0d60ab06f9d845e266d9ea",
	measurementId: "G-SRRX5RTL23",
};

// Initialize Firebase
export default function initFirebase() {
	if (!firebase.apps.length) {
		firebase.initializeApp(firebaesConfig);
		if (typeof window !== "undefined") {
			firebase.analytics();
		}
	}
}
