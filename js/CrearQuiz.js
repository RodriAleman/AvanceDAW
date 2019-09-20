var firebaseConfig = {
    apiKey: "AIzaSyCP10PmQL2ZIWoxlk4J92gszr11sWEcja4",
    authDomain: "creando-test.firebaseapp.com",
    databaseURL: "https://creando-test.firebaseio.com",
    projectId: "creando-test",
    storageBucket: "",
    messagingSenderId: "615733079180",
    appId: "1:615733079180:web:82b8ca7a13c461bf665fa9"
};
// Inicializa Firebase
// firebase.initializeApp(firebaseConfig);
// var database = firebase.database();
// var quizzes = database.ref('Quizzes');
firebase.initializeApp(firebaseConfig);
var myQuiz;

function Crear(){
    var database = firebase.database();
    var quizzes = database.ref('Quizzes');

    var nameQ = document.getElementById("nombre").value;
    var quiz = {
        nombre: nameQ,
        numeroPre: 0,
        preguntas: [],
        respuestas: []
    }

    myQuiz = quizzes.push(quiz);
    console.log(myQuiz);
}

var preguntas = [];

function pregunta() {
    var database = firebase.database();
    var quizzes = database.ref('Quizzes');

    var question = document.getElementById("pre1");
    var resp1 = document.getElementById("res1");
    var resp2 = document.getElementById("res2");
    var resp3 = document.getElementById("res3");
    

    var pregunta = {
        pregunta: question.value,
        respuesta1: resp1.value,
        respuesta2: resp2.value,
        respuesta3: resp3.value,
        //tiempo: 
    }

    var updates = {};
    updates['/Quizzes/'+ myQuiz.key] = pregunta;
    preguntas.push(pregunta);
    myQuiz.update({'preguntas':preguntas});
    leer();
}

function gotData(data){
    //console.log(data.val());
    var pregun = data.val();
    var keys = Object.keys(pregun);
    console.log(keys);
    for (var i = 0; i < keys.length; i++){
        var k = keys[i];
        var pregunta = pregun[k].pregunta;
        var respuesta1 = pregun[k].respuesta1;
        var respuesta2 = pregun[k].respuesta2;
        var respuesta3 = pregun[k].respuesta3;
        console.log(pregunta, respuesta1, respuesta2, respuesta3);

        document.getElementById("demo").innerHTML = pregunta + respuesta1 + respuesta2 + respuesta3;
    }
}

function errData(err){
    console.log("Error");
}

function Mostrar() {
    var firebaseConfig = {
        apiKey: "AIzaSyCP10PmQL2ZIWoxlk4J92gszr11sWEcja4",
        authDomain: "creando-test.firebaseapp.com",
        databaseURL: "https://creando-test.firebaseio.com",
        projectId: "creando-test",
        storageBucket: "",
        messagingSenderId: "615733079180",
        appId: "1:615733079180:web:82b8ca7a13c461bf665fa9"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();
    var ref = database.ref('preguntas');

    ref.on('value', gotData, errData);
}

function leer(){
    var database = firebase.database();
    var ref = database.ref('Quizzes');

    // ref.on('value', gotData, errData);

    ref.once('value')
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            document.getElementById("preguntasMostrar").innerHTML = '';
            var th = document.createElement("th");
            th.appendChild(document.createTextNode("Pregunta"));
            th.appendChild(document.createTextNode("Respuesta 1"));
            th.appendChild(document.createTextNode("Respuesta 2"));
            th.appendChild(document.createTextNode("Respuesta 3"));
            document.getElementById("preguntasMostrar").appendChild(th);
            doc.val().preguntas.forEach(function (pregunta){
                var td = document.createElement("td");
                var tr = document.createElement("tr");
                // tr.setAttribute("class", "btn btn-primary btn-lg");
                td.appendChild(document.createTextNode(pregunta.pregunta));
                td.appendChild(document.createTextNode(pregunta.respuesta1));
                td.appendChild(document.createTextNode(pregunta.respuesta2));
                td.appendChild(document.createTextNode(pregunta.respuesta3));
                tr.appendChild(td);
                // tr.setAttribute("id","elemento_"+conta);
                document.getElementById("preguntasMostrar").appendChild(tr);
            });
        });
    })
}