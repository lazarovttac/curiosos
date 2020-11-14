
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
var currentUser;


//Firestore object
var firestore = firebase.firestore();


//Collections
const environmentCollection = firestore.collection("environment");
const techCollection = firestore.collection("tech");
const medicineCollection = firestore.collection("medicine");
const foodCollection = firestore.collection("food");
const musicCollection = firestore.collection("music");
const othersCollection = firestore.collection("others");

const signedIn = document.getElementById('whenSignedIn');
const signedOut = document.getElementById('whenSignedOut');

var editor = document.getElementById("editor");
var categorySelect = document.getElementById("post-type");
var titleInput = document.getElementById("title-input");
var imageInput = document.getElementById("image-input");
var descriptionInput = document.getElementById("description-input");
var contentInput = document.getElementById("content-input");

const saveButton = document.getElementById("save-btn");

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

  const categoryToSave = categorySelect.value;

  switch (categoryToSave) {
    case "environment":
      SaveTo(environmentCollection);
      break;
    case "tech":
      SaveTo(techCollection);
      break;
    case "medicine":
      SaveTo(medicineCollection);
      break;
    case "food":
      SaveTo(foodCollection);
      break;
    case "music":
      SaveTo(musicCollection);
      break;
    case "other":
      SaveTo(othersCollection);
      break;
    default:
      SaveTo(othersCollection);
      break;
  }
})

  

function SaveTo(collection)  {
  const categoryToSave = categorySelect.value;
  const titleToSave = titleInput.value;
  const imageToSave = imageInput.value;
  const descriptionToSave = descriptionInput.value;
  const contentToSave = contentInput.value;

  collection.add({
    category: categoryToSave,
    title: titleToSave,
    image: imageToSave,
    description: descriptionToSave,
    content: contentToSave,
    author: currentUser.displayName

    // time: serverTimestamp()
  }).then(function(){
    console.log("All its ok");
    saveButton.style.animation = "saved 1s ease forwards";
    saveButton.innerHTML = "Publicado"
    window.location = "index.html"
  }).catch(function(error){
      alert(error);
  })
  
}

