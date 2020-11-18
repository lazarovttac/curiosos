

var inputElements = document.getElementsByClassName('input');
var inputElementsArray = [].slice.call(inputElements);

function UpdateInputElements() {
  for (let i = 0; i < inputElementsArray.length; i++) {
    inputElementsArray[i].addEventListener("input", OnInput, false);
  }
}


function OnInput() {
  this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
  this.style.height = (this.scrollHeight) + 'px';
}

var editor = document.getElementById("editor");
var categorySelect = document.getElementById("post-type");
var titleInput = document.getElementById("title-input");
var imageInput = document.getElementById("image-input");
var descriptionInput = document.getElementById("description-input");

var content = document.getElementById("content");

var saveButton = document.getElementById("save-button");

saveButton.addEventListener("click", function (){

  const authorToSave = currentUser;
  const categoryToSave = categorySelect.value;
  const titleToSave = titleInput.value;
  const imageToSave = imageInput.value;
  const descriptionToSave = descriptionInput.value;
  const contentToSave = ConvertContent();

  if(titleToSave.length > 10){
      if(descriptionToSave.length > 50){
        if(imageToSave != ""){
          blogPostsCollection.add({
        
            category: categoryToSave,
            title: titleToSave,
            image: imageToSave,
            description: descriptionToSave,
            author: authorToSave.displayName,
            content: contentToSave,
            created: firebase.firestore.FieldValue.serverTimestamp()
        
            // time: serverTimestamp()
          }).then(function(){
            console.log("All its ok");
            saveButton.classList.add("saved");
        
          }).catch(function(error){
              alert(error);
          })


        }else {
          alert("Añada una URL para la imagen de Portada");
        }
      
      }else {
        alert("Añada una descripción de al menos 50 caracteres");
      }

  }else {
    alert("Añada un título de al menos 10 caracteres");
  }

  
})


function CreateTextArea(className, placeHolder){
  var button = document.createElement("button");
  button.classList.add('button');
  button.classList.add('button--delete');
  button.innerText = 'X';
  button.setAttribute('onclick', 'Remove(this)')
  
  var container = document.createElement("div");
  container.className = 'element';
  
  var textarea = document.createElement("textarea");
  textarea.classList.add(className);
  textarea.classList.add('content-input');
  
  inputElementsArray.push(textarea);
  UpdateInputElements();
  
  textarea.setAttribute('placeholder', placeHolder)
  
  
  container.appendChild(textarea);
  container.appendChild(button);
  content.appendChild(container);

}

UpdateInputElements();

function Remove(element){ 
    element.parentNode.remove();
}

function ConvertContent() {
  var contentInputsCollection = document.getElementsByClassName('content-input');
  var contentInputsArray = [].slice.call(contentInputsCollection);

  var content = '';

  for (let index = 0; index < contentInputsArray.length; index++) {
    const element = contentInputsArray[index];

    switch (element.classList[0]) {
      case 'heading1':
        content = content.concat(`<h1 class='element heading1'>${element.value}</h1>`);
        break;
      case 'paragraph':
        var text = element.value;
        text = text.replace(/\r?\n/g, '<br />');
        content = content.concat(`<p class='element text'>${text}</p>`);
        break;
      case 'image':
        content = content.concat(`<img  class='element image' src='${element.value}'/>`);
        break;
      default:
        break;
    }
    
  }

  return content;

}
