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
var myQuiz;
var preguntas = [];

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
    limpiarFormulario();
    console.log(myQuiz);
}

function limpiarFormulario() {
    document.getElementById("preguntasMostrar").innerHTML = '';
    preguntas = [];
    limpiarPregunta();
}

function limpiarPregunta() {
    document.getElementById("pre1").value = '';
    document.getElementById("res1").value = '';
    document.getElementById("res2").value = '';
    document.getElementById("res3").value = '';
    document.getElementById("tiempo").value = '';
}

function pregunta() {
    var database = firebase.database();
    var quizzes = database.ref('Quizzes');

    var question = document.getElementById("pre1");
    var resp1 = document.getElementById("res1");
    var resp2 = document.getElementById("res2");
    var resp3 = document.getElementById("res3");
    var tiempo = document.getElementById("tiempo");
    

    var pregunta = {
        pregunta: question.value,
        respuesta1: resp1.value,
        respuesta2: resp2.value,
        respuesta3: resp3.value,
        tiempo: tiempo.value 
    }

    var updates = {};
    updates['/Quizzes/'+ myQuiz.key] = pregunta;
    preguntas.push(pregunta);
    myQuiz.update({'preguntas':preguntas});
    leer();
    limpiarPregunta();
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
    var ref = database.ref('Quizzes/' + myQuiz.key);

    // ref.on('value', gotData, errData);
    ref.once('value').then(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        document.getElementById("preguntasMostrar").innerHTML = '';
        var tr = document.createElement("tr");
        var th1 = document.createElement("th");
        th1.appendChild(document.createTextNode("Pregunta"));
        tr.appendChild(th1);
        var th2 = document.createElement("th");
        th2.appendChild(document.createTextNode("Respuesta 1"));
        tr.appendChild(th2);
        var th3 = document.createElement("th");
        th3.appendChild(document.createTextNode("Respuesta 2"));
        tr.appendChild(th3);
        var th4 = document.createElement("th");
        th4.appendChild(document.createTextNode("Respuesta 3"));
        tr.appendChild(th4);
        document.getElementById("preguntasMostrar").appendChild(tr);

        doc.val().preguntas.forEach(function (pregunta){
            console.log(pregunta)
            var tr = document.createElement("tr");
            var th1 = document.createElement("td");
            th1.appendChild(document.createTextNode(pregunta.pregunta));
            tr.appendChild(th1);
            var th2 = document.createElement("td");
            th2.appendChild(document.createTextNode(pregunta.respuesta1));
            tr.appendChild(th2);
            var th3 = document.createElement("td");
            th3.appendChild(document.createTextNode(pregunta.respuesta2));
            tr.appendChild(th3);
            var th4 = document.createElement("td");
            th4.appendChild(document.createTextNode(pregunta.respuesta3));
            tr.appendChild(th4);
            document.getElementById("preguntasMostrar").appendChild(tr);
        });
    });
}