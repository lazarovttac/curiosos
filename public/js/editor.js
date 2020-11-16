
function FixTextAreas() {
  const tx = document.getElementsByClassName('input');
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", OnInput, false);
  }
}

function OnInput() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
}

var editor = document.getElementById("editor");
var categorySelect = document.getElementById("post-type");
var titleInput = document.getElementById("title-input");
var imageInput = document.getElementById("image-input");
var descriptionInput = document.getElementById("description-input");
var contentInput = document.getElementById("content-input");

var saveButton = document.getElementById("save-button");

saveButton.addEventListener("click", function (){

  const categoryToSave = categorySelect.value;
  const titleToSave = titleInput.value;
  const imageToSave = imageInput.value;
  const descriptionToSave = descriptionInput.value;
  const contentToSave = contentInput.value;

  blogPostsCollection.add({
    category: categoryToSave,
    title: titleToSave,
    image: imageToSave,
    description: descriptionToSave,
    content: contentToSave,
    author: currentUser.displayName,
    created: firebase.firestore.FieldValue.serverTimestamp()

    // time: serverTimestamp()
  }).then(function(){
    console.log("All its ok");
    saveButton.classList.add("saved");

  }).catch(function(error){
      alert(error);
  })

})

