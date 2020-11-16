
var currentUser = {};

//Firebase configuration
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

//Auth
const auth = firebase.auth();
//Provider for Auth
const provider = new firebase.auth.GoogleAuthProvider();
//Database
const dataBase = firebase.firestore();
//Blogs Collection
const blogPostsCollection = dataBase.collection("blog-posts");

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');
const userImage = document.getElementById('user-image');

function SignIn(){
    auth.signInWithPopup(provider);
}
function SignOut(){
    auth.signOut();
}

//When there is a change on Authentication state, this function is called. 
auth.onAuthStateChanged(user => {
    if(user) {
        currentUser = user;
        //Someone signed in
        whenSignedIn.style.display = "flex";
        whenSignedOut.style.display = "none";
        userImage.src = user.photoURL;
    }else {
        currentUser = {};
        //Someone signed out
        whenSignedIn.style.display = "none";
        whenSignedOut.style.display = "flex";

        userImage.src = '';
    }
})

