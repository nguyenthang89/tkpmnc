importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js",
);
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js",
);

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    //messagingSenderId: "YOUR-SENDER-ID",
    //apiKey: "YOUR_API_KEY",
    //projectId: "YOUR_PROJECT_ID",
    //appId: "YOUR_APP_ID",
      apiKey: "AIzaSyC0Y73CfqeQ0G-CLLggHFBAVCRYJ-XsfP0",
	  authDomain: "my-push-notification-ed8d5.firebaseapp.com",
	  databaseURL: "https://my-push-notification-ed8d5-default-rtdb.firebaseio.com",
	  projectId: "my-push-notification-ed8d5",
	  storageBucket: "my-push-notification-ed8d5.appspot.com",
	  messagingSenderId: "160054251537",
	  appId: "1:160054251537:web:5db829793084c30a1a21b0",
	  measurementId: "G-556SNS09N6"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/itwonders-web-logo.png",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});
