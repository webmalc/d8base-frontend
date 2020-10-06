importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js');

firebase.initializeApp(
    {
            apiKey: 'AIzaSyBeOZGKwhC5S6AiioaY9w9kh56GVH_hNPA',
            authDomain: 'd8btest.firebaseapp.com',
            databaseURL: 'https://d8btest.firebaseio.com',
            projectId: 'd8btest',
            storageBucket: 'd8btest.appspot.com',
            messagingSenderId: '252850429498',
            vapidKey: 'BJqNDHlAWKT_b_vrtERKJuC9-g27uJ1VQq6lbMQ5mGVKLPSPdw1U6glQZFvFsT-psLvvdjK5H8MMLRoC5ALmrnU',
            appId: '1:252850429498:web:5a2874e1ca6689a2921f03'
    }
);

const messaging = firebase.messaging();
