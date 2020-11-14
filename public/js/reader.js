var theid = window.location.hash.substring(1);

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD45RIV1b1vlHuzEL5k_iFxn0cVX1xjFhg",
    authDomain: "curiosidad.firebaseapp.com",
    databaseURL: "https://curiosidad.firebaseio.com",
    projectId: "curiosidad",
    storageBucket: "curiosidad.appspot.com",
    messagingSenderId: "71425050918",
    appId: "1:71425050918:web:a9e55a46983c86c3a959e7"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var firestore = firebase.firestore();
//Document
const blogPost = firestore.collection("blog-posts").doc(`${theid}`);

blogPost.get().then(function(doc) {
    if (doc.exists) {
        ShowContent(doc);
    } else {
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});


var title = document.getElementById("title");
var image = document.getElementById("image");
var description = document.getElementById("description");
var content = document.getElementById("content");

function ShowContent(doc) {
    title.innerText = doc.data().title;
    image.src = doc.data().image;
    description.innerText = doc.data().description;
    content.innerHTML = doc.data().content;
}
