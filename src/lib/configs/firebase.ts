// firebase.ts
import firebase from 'firebase/app';
import 'firebase/storage';
import { firebaseConfig } from '$lib/configs/firebaseConfig';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
