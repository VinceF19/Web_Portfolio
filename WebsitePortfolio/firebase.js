import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import { getAnalytics, isSupported } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBN1Fh72-bqSgFvlZcaQPxfvuHxWEpCo7E',
  authDomain: 'vincef-fabd1.firebaseapp.com',
  projectId: 'vincef-fabd1',
  storageBucket: 'vincef-fabd1.firebasestorage.app',
  messagingSenderId: '194102036788',
  appId: '1:194102036788:web:61d9833d80de711bab3d61',
  measurementId: 'G-1GY1TTGZ2B',
};

const app = initializeApp(firebaseConfig);

// Only enable Analytics where supported (skips e.g., in some browsers or server contexts)
isSupported()
  .then((supported) => {
    if (supported) getAnalytics(app);
  })
  .catch(() => {
    /* no-op */
  });
