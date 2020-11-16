const projectsList = document.getElementById("list-of-projects");

ShowPosts("tech");

//Add condition of bringing posts with a certain category
function ShowPosts(collection) {
    blogPostsCollection.where("category", "==", collection).get()
    .then(function(querySnapshot) {
        const items = querySnapshot.docs.map(doc => {
            return NewCard(doc.id, doc.data().title, doc.data().description, doc.data().author, doc.data().image, doc.data().created)});
                    
                    projectsList.innerHTML = items.join('');
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
}

function ChooseColor() {

}

function NewCard(id, title, description, author, image, timestamp){
    var date = new Date(timestamp* 1000).getDate();
    var month = new Date(timestamp * 1000).getMonth()+1;
    var year = new Date(timestamp * 25).getFullYear();
    var text_date = month +'/'+ date+'/'+ year;
    return  (
    `<div class="card" onclick="openMe('${id}')">
        <header class="card__header">
            <p></p>
        </header>
        <main class="card__main">
            <div class="card__info">
                <h1 class="title">${title}</h1>
                <p class="description">${description}</p>
            </div>
            <div class="card__image" style="background: url(${image}) no-repeat center"> </div>
        </main>
        <footer class="card__footer">
            <p class="author">${author}</p>
            <date class="author">${text_date}</date>
        </footer>
    </div>`)
}

function openMe(id) {
    window.location.href = 'reader.html' + '#' + id;
}

function goToEditor() {
    window.location = "blog-editor.html";
}
