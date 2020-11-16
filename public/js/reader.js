
//Document ID
var theid = window.location.hash.substring(1);
//Document
const blogPost = blogPostsCollection.doc(`${theid}`);

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
