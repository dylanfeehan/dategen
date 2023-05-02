import {getAuth} from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { firebaseConfig } from './firebaseConfig';

const firebase_app = firebase.initializeApp(firebaseConfig);

export default firebase_app