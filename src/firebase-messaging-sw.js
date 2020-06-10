importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js');

firebase.initializeApp(
    {
        apiKey: 'api-key',
        authDomain: 'auth-domain',
        databaseURL: 'database-url',
        projectId: 'id',
        storageBucket: 'bucket',
        messagingSenderId: 'senderId',
        appId: 'appId'
    }

);

const messaging = firebase.messaging();
