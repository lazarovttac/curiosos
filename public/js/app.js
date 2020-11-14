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

//Auth Object
const auth = firebase.auth();
console.log(auth);

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');

const userImage = document.getElementById('user-image');

const signInButton = document.getElementById('sing-in-btn');
const signOutButton = document.getElementById('sing-out-btn');
const createButton = document.getElementById('create-btn');

const provider = new firebase.auth.GoogleAuthProvider();

signInButton.onclick = () => auth.signInWithPopup(provider);
signOutButton.onclick = () => auth.signOut();

//When there is a change on Authentication state, this function is called. 
auth.onAuthStateChanged(user => {
    if(user) {
        //Someone signed in
        whenSignedIn.style.display = "flex";
        whenSignedOut.style.display = "none";

        createButton.style.display = "flex";
        userImage.src = user.photoURL;
    }else {
        //Someone signed out
        whenSignedIn.style.display = "none";
        whenSignedOut.style.display = "flex";

        createButton.style.display = "none";
        userImage.src = '';
    }
})


function goToEditor() {
    window.location = "blog-editor.html";
}

const projectsList = document.getElementById("list-of-projects")
//Get

var firestore = firebase.firestore();
//Document
const collectionRef = firestore.collection("blog-posts");

getRealTimeUpdates = function(){
  collectionRef.onSnapshot(querySnapshot => {
      const items = querySnapshot.docs.map(doc => {
          return    `<div class="project-card" onclick="openMe('${doc.id}')">
                        <div class="info">
                            <h1 class="title">${doc.data().title}</h1>
                            <p class="description">${doc.data().description}</p>
                            <p class="author">${doc.data().author}</p>
                        </div>
                        <div class="image" style="background: url(${doc.data().image}) no-repeat center"> </div>
                    </div>`
      });

      projectsList.innerHTML = items.join('');
  });
}

getRealTimeUpdates();


function convert(inputText) {
  
    var converter = new showdown.Converter();
    var outputHtml = converter.makeHtml(inputText);
    
    return outputHtml;
}

function openMe(id) {
    window.location.href = 'reader.html' + '#' + id;
}