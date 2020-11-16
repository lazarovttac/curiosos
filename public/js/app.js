const projectsList = document.getElementById("list-of-projects");

ShowPosts("tech");

//Add condition of bringing posts with a certain category
function ShowPosts(collection) {
    blogPostsCollection.where("category", "==", collection).get()
    .then(function(querySnapshot) {
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
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
}

function openMe(id) {
    window.location.href = 'reader.html' + '#' + id;
}

function goToEditor() {
    window.location = "blog-editor.html";
}
