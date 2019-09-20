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

    ref.on('value', gotData, errData);

    // ref.once('value')
    // .then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.val());
    //     });
    // })
}

var conta = 0;
function gotData(data){
    //console.log(data.val());
    var names = data.val();
    var keys = Object.keys(names);
    // console.log(keys);
    for (var i = 0; i < keys.length; i++){
        var k = keys[i];
        var nombre = names[k].nombre;
        console.log(nombre);
        var li = document.createElement("button");
        texto = document.createTextNode("Quiz " + nombre);
        li.setAttribute("class", "btn btn-primary btn-lg");
        li.appendChild(texto);
        li.setAttribute("id","elemento_"+conta);
		conta++;
        document.getElementById("namelist").appendChild(li);

        // document.getElementById("demo").innerHTML = pregunta + respuesta1 + respuesta2 + respuesta3;
    }
}

function errData(err){
    console.log("Error");
}