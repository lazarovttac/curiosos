
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
//Database
const dataBase = firebase.firestore();
//Provider for Auth
const provider = new firebase.auth.GoogleAuthProvider();
//Blogs Collection
const blogPostsCollection = dataBase.collection("blog-posts");

const whenSignedIn = document.getElementsByClassName('whenSignedIn');
const whenSignedOut = document.getElementsByClassName('whenSignedOut');
const userImages = document.getElementsByClassName('user-image');

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
        for (let i = 0; i < whenSignedIn.length; i++) {
            whenSignedIn[i].style.display = "flex";
            
        }
        for (let i = 0; i < whenSignedOut.length; i++) {
            whenSignedOut[i].style.display = "none";
            
        }
        for (let i = 0; i < userImages.length; i++) {
            userImages[i].src = user.photoURL;
            
        }

        FixTextAreas();

    }else {
        currentUser = {};
        //Someone signed out
        for (let i = 0; i < whenSignedIn.length; i++) {
            whenSignedIn[i].style.display = "none";
            
        }
        for (let i = 0; i < whenSignedOut.length; i++) {
            whenSignedOut[i].style.display = "flex";
            
        }
        for (let i = 0; i < userImages.length; i++) {
            userImages[i].src = "";
            
        }
    }
})

