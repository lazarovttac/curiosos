
const tx = document.getElementsByTagName('textarea');
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
}


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

//Firestore
const auth = firebase.auth();
console.log(auth);


//Firestore object
var firestore = firebase.firestore();

var currentUser;
//Document
const collectionRef = firestore.collection("blog-posts");
const saveButton = document.getElementById("save-btn");

const signedIn = document.getElementById('whenSignedIn');
const signedOut = document.getElementById('whenSignedOut');

var editor = document.getElementById("editor");
var titleInput = document.getElementById("title-input");
var subtitleInput = document.getElementById("subtitle-input");
var imageInput = document.getElementById("image-input");
var descriptionInput = document.getElementById("description-input");
var contentInput = document.getElementById("content-input");

auth.onAuthStateChanged(user => {
  if(user) {
      //Someone signed in
      currentUser = user;
      saveButton.hidden = false;
      signedIn.hidden = false;
      signedOut.hidden = true;

  }else {
      //Someone signed out
      currentUser = undefined;
      saveButton.hidden = true;
      signedIn.hidden = true;
      signedOut.hidden = false;

  }
})

saveButton.addEventListener("click", function(){
  const titleToSave = titleInput.value;
  const subtitleToSave = subtitleInput.value;
  const imageToSave = imageInput.value;
  const descriptionToSave = descriptionInput.value;
  const contentToSave = contentInput.value;

  collectionRef.add({
      title: titleToSave,
      subtitle: subtitleToSave,
      image: imageToSave,
      description: descriptionToSave,
      content: contentToSave,
      author: currentUser.displayName
      // time: serverTimestamp()

  }).then(function(){
      console.log("All its ok");
  }).catch(function(error){
      alert(error);
  })
})

