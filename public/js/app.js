const projectsList = document.getElementById("list-of-projects");
var lastButton = null;

ShowPosts("all");

var colors = {
    env: '#CAD315',
    tech: '#3D97EA',
    medicine: '#ec524b',
    music: '#ffdd93',
    food: '#a05344',
    other: '#7e7474'
}

//Add condition of bringing posts with a certain category
function ShowPosts(collection) {
    if(collection == 'all'){
        blogPostsCollection.get()
        .then(function(querySnapshot) {
            const items = querySnapshot.docs.map(doc => {
                return NewCard(doc.id, doc.data().title, doc.data().description, doc.data().author, doc.data().image, doc.data().created, ChooseColor(doc.data().category))});
                        
                        projectsList.innerHTML = items.join('');
                    })
                    .catch(function(error) {
                        console.log("Error getting documents: ", error);
                    });
    }else {
        blogPostsCollection.where("category", "==", collection).get()
        .then(function(querySnapshot) {
            const items = querySnapshot.docs.map(doc => {
                return NewCard(doc.id, doc.data().title, doc.data().description, doc.data().author, doc.data().image, doc.data().created, ChooseColor(doc.data().category))});
                        
                        projectsList.innerHTML = items.join('');
                    })
                    .catch(function(error) {
                        console.log("Error getting documents: ", error);
                    });
    }
}

function ChooseColor(category) {
    switch (category) {
        case 'environment':
            return colors.env;
    
        case 'tech':
            return colors.tech;
    
        case 'medicine':
            return colors.medicine;
    
        case 'music':
            return colors.music
    
        case 'food':
            return colors.food;
    
        case 'other':
            return colors.other;
    
        default:
            return colors.other;
    }
}

function NewCard(id, title, description, author, image, timestamp, color){
    var date = new Date(timestamp* 1000).getDate();
    var month = new Date(timestamp * 1000).getMonth()+1;
    var year = new Date(timestamp * 25).getFullYear();
    var text_date = month +'/'+ date+'/'+ year;
    return  (
    `<div class="card" onclick="openMe('${id}')">
        <div class="card__image" style="background:  url(${image}) no-repeat center; background-size:cover;"> </div>
        <main class="card__main">
            <h1 class="title">${title}</h1>
            <p class="description">${description}</p>
        </main>
        <footer class="card__footer">          
            <p class="author">${author}</p>
        </footer>

    </div>`)

    // <div class="card__tag" style='background-color: ${color};'>${text_date}</div>

}

function openMe(id) {
    window.location.href = 'reader.html' + '#' + id;
}

function goToEditor() {
    window.location = "blog-editor.html";
}
