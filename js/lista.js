var firebaseConfig = {
    apiKey: "AIzaSyCP10PmQL2ZIWoxlk4J92gszr11sWEcja4",
    authDomain: "creando-test.firebaseapp.com",
    databaseURL: "https://creando-test.firebaseio.com",
    projectId: "creando-test",
    storageBucket: "",
    messagingSenderId: "615733079180",
    appId: "1:615733079180:web:82b8ca7a13c461bf665fa9"
};
firebase.initializeApp(firebaseConfig);

function Mostrar(){
    var database = firebase.database();
    var ref = database.ref('Quizzes');
    var urlPortions = window.location.href.split('/');
    urlPortions.pop();
    var targetUrl = urlPortions.join('/');

    ref.once('value')
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var listDiv = document.getElementById("namelist");
            var li = document.createElement("button");
            texto = document.createTextNode("Quiz " + doc.val().nombre);
            li.setAttribute("class", "btn btn-primary btn-lg");
            li.appendChild(texto);
            li.setAttribute("id", doc.key);
            li.setAttribute("onclick", "window.open('" + targetUrl + "/HacerQuiz.html?quizId=" + doc.key + "');");
            listDiv.appendChild(li);
        });
    })
}