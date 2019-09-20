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
}

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
    limpiarPregunta();
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

var ref;

function abrir() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var url_string = window.location.href;
    var url = new URL(url_string);
    leer(url.searchParams.get("quizId"));
    preguntasSlide();
}

function preguntasSlide() {
    var html = '';

    setTimeout(function() {
        var preguntaIndice = 0;
        console.log(preguntas);
        var count = preguntas[preguntaIndice].tiempo;
        setInterval(function() {
            html = '<h1>' + preguntas[preguntaIndice].pregunta + '</h1><br><button class="btn btn-primary btn-lg">' + preguntas[preguntaIndice].respuesta1 + 
                '</button><button class="btn btn-primary btn-lg">' + preguntas[preguntaIndice].respuesta2 + '</button><button class="btn btn-primary btn-lg">' + preguntas[preguntaIndice].respuesta3 + 
                '</button><br><h2>' + count-- + '</h2>';
            document.getElementById("preguntasSlide").innerHTML = html;
            if (count === 0) {
                preguntaIndice++;
                count = preguntas[preguntaIndice].tiempo;
            }
        }, 1000)
    }, 500)
}

function leer(quizId){
    var database = firebase.database();
    ref = database.ref('Quizzes/' + quizId);

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
            
            preguntas.push(pregunta);
        });
    });
}