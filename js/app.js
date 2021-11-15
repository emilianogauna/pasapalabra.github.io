// Variables
// -----------------------------------------------------------------------------

var words = [
	new Word(0, "A", "Empieza con A:", " Conjunto de normas para realizar textos académicos.", "APA"),
	new Word(1, "B", "Empieza con B:", " Característica principal de la regla de 3 a la hora de estructurar las diapositivas.", "Balance"),
	new Word(2, "C", "Empieza con C:", " Fuente recomendada para el buen uso de Powerpiont", "Calibri"),
	new Word(3, "D", "Empieza con D:", " Sinónimo de Filmina.", "Diapositiva"),
	new Word(4, "E", "Contiene E:", " Dispositivo que debemos dejar apagado o guardado a la hora de estudiar", "Celular"),
	new Word(5, "F", "Empieza con F:", " Colores que se deben evitar en las presentaciones Powerpiont.", "Fosforescente"),
	new Word(6, "G", "Contiene G:", " Proceso que nos ayuda a llevar un estudio mas eficaz", "Organizacion"),
	new Word(7, "H", "Empieza con H:", " ¿Que se recomienda establecer de manera fija para fomentar a la hora de estudiar?.", "Horario"),
	new Word(8, "I", "Empieza con I:", " Recurso visual utilizado en presentaciones digitales.", "Imagen"),
	new Word(9, "J", "Empieza con J:", " Recurso didáctico que consta de una actividad que se realiza generalmente para divertirse o entretenerse", "Juego"),
	new Word(10, "L", "Empieza con L:", " Aprender para enseñar nos ayuda a organizarnos de una manera mas...", "Logica"),
	new Word(11, "M", "Empieza con M:", " Esquema de ideas que sirve de herramienta para organizar. ", "Mapas"),
	new Word(12, "N", "Empieza con N:", " Se establece para una correcta utilización de herramientas informáticas", "Norma"),
	new Word(13, "Ñ", "Contiene Ñ:", " Proceso que tiene como objetivo la construcción de conocimiento.", "Enseñanza"),
	new Word(14, "O", "Empieza con O:", " Fin al que se desea llegar o la meta que se pretende lograr.", "Objetivo"),
	new Word(15, "P", "Empieza con P:", " Dispositivo interactivo de presentación utilizado en clase.", "Prezi"),
	new Word(16, "Q", "Empieza con Q:", " Dispositivo de preguntas y respuestas utilizado en clase.", "Quizizz"),
	new Word(17, "R", "Empieza con R:", " Recurso utilizado para la apropiación de contenido.", "Resumen"),
	new Word(18, "S", "Contiene S:", " Filosofo que dijo: Yo solo se que no se nada.", "Socrates"),
	new Word(19, "T", "Empieza con T:", " En una presentación powerpoint solo debe servir de guía.", "Texto"),
	new Word(20, "U", "Contiene U:", " Los docentes lo utilian para las estrategias didácticas.", "Recurso"),
	new Word(21, "V", "Empieza con V:", " Recurso multimedia muy utilizado hoy día", "Video"),
	new Word(22, "X", "Contiene X:", " Instancia de evaluación.", "Examen"),
	new Word(23, "Y", "Contiene Y:", " (Lunfardo) Lo que hacemos algunos estudiantes en los exámanes.", "Chamuyar"),
	new Word(24, "Z", "Contiene Z:", " Herramienta tecnológica utilizada para clases virtuales", "Zoom")
];

// Functions
// ----------------------------------------- Disciplina filosófica que estudia las ideas, sus caracteres y especialmente su origen.", "Ideologia"------------------------------------

function Word(idNumber, letter, hint, definition, word, correct) {
	this.idNumber = idNumber;
	this.letter = letter;
	this.hint = hint;
	this.definition = definition;
	this.word = word;
	this.correct = null;
}

function showDefinition(pos) {
	$("#js--hint").html(words[pos].hint);
	$("#js--definition").html(words[pos].definition);
}

var remainingWords = 25;

function checkAnswer(pos) {
	var userAnswer = $("#js--user-answer").val().toLowerCase();
	if (userAnswer == words[pos].word.toLowerCase()) {
		words[pos].correct = true;
		$(".circle .item").eq(words[pos].idNumber).addClass("item--success");

	} else {
		words[pos].correct = false;
		$(".circle .item").eq(words[pos].idNumber).addClass("item--failure");
	}
	remainingWords--;
	$("js--score").html(remainingWords);

	return count++;
}

function pasapalabra(pos) {
	var w = words.splice(pos, 1)[0];
	words.push(w);

}

function continuePlaying() {
	if (count != 25) {
		$("#js--user-answer").val("");
		showDefinition(count);
	} else {
		endGame();
	}
}

var seconds;
var temp;

function countdown() {
	seconds = $("#js--timer").html();
	seconds = parseInt(seconds, 10);
	if (seconds == 1) {
		temp = $("#js--timer");
		temp.innerHTML = 0;
		endGame();
		return;
	}
	seconds--;
	temp = $("#js--timer");
	temp.html(seconds);
	timeoutMyOswego = setTimeout(countdown, 1000);
}

function endGame() {
	$("#js--question-controls").addClass("hidden");
	$("#js--pa-controls").removeClass("hidden");
	$("#js--end-title").html("Fin de partida!");
	$("#js--end-subtitle").html(showUserScore());
	$("#js--close").addClass("hidden")
}

function showUserScore() {
	var counter = 0;
	for (i = 0; i < words.length; i++) {
		if (words[i].correct == true) {
			counter++;
		}
	}
	return "Has conseguido un total de " + counter + " aciertos.";
}


// Main Program
// ----------------------------------------------------------------------------- */

// New game
var count = 0; // Counter for answered words
$("#js--new-game").click(function() {
	$("#js--ng-controls").addClass("hidden");
	$("#js--question-controls").removeClass("hidden");
	$("#js--close").removeClass("hidden");
	showDefinition(count);
	countdown();
});

// Send the answer
$("#js--send").click(function() {
	checkAnswer(count);
	continuePlaying();
});

// Key bindings for send the answer
$("#js--question-controls").keypress(function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == "13") {
		checkAnswer(count);
		continuePlaying();
	}
});

// Skip the word
$("#js--pasapalabra").click(function() {
	pasapalabra(count);
	continuePlaying();
});

// Key bindings for skip the word
$("#js--question-controls").keypress(function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == "32") {
		pasapalabra(count);
		continuePlaying();
	}
});

// Play again
$("#js--pa").click(function() {
	location.reload()
});

// End the game
$("#js--close").click(function() {
	endGame();
});
