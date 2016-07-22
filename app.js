
$(document).ready(function(){
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);
  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});
});

/* My Code */

// Declare Variables
var myNumber;
var userGuess;
var count = 0;

// Generate Random Number
function generateNumber(){
	myNumber = Math.floor(Math.random() * 100 + 1);
};

// New Game
function newGame(){
	$(".new").click(function(){
		$(".gameOver").hide();
		$(".playBall").show();
		$("#feedback").text("Make your Guess!");
		$("#guessList").empty();
		$("#userGuess").empty().attr("placeholder", "Enter your Guess");
		count=0;
		document.getElementById("count").innerHTML=count;
		generateNumber();
	});
};

// Grade
function grade(){
	function letter(message){
		document.getElementById("grade").innerHTML=message;
	};
	if(count>=15) {letter("F");};
	if(count<15 && count >=10) {letter("D");};
	if(count<10 && count >=8) {letter("C");};
	if(count<8 && count >=6) {letter("B");};
	if(count<6 && count >=4) {letter("A");};
	if(count<4) {letter("A+");};
};

// Absolute Feedback
function absolute(){
	function feedback(message){
		document.getElementById("feedback").innerHTML=message;
	};
	var difference = Math.abs(myNumber-userGuess);
	if (difference>50) {feedback("Freezing");};
	if (difference<=50 && difference>25) {feedback("Cold");};
	if (difference<=25 && difference>10) {feedback("Mild");};
	if (difference<=10 && difference>5) {feedback("Warm");};
	if (difference<=5 && difference>2) {feedback("Hot");};
	if (difference<=2 && difference>0) {feedback("Very Hot");};
	if (difference==0) {
			feedback("You Win!");
			$(".playBall").hide();
			$(".gameOver").show();
			document.getElementById("final").innerHTML=count;
			grade();
			$("#guessList").empty();
			newGame();
	};
};

/*
// Relative Feedback
function relative(){
	var difference = Math.abs(myNumber-userGuess);
	var differencePrev;
	var differenceNew;
	
	differencePrev = differenceNew;
	differenceNew = difference;
		
	if (differencePrev<differenceNew){feedback("Colder");};
	if (differencePrev>differenceNew){feedback("Warmer");};
};
*/

// Game
$(document).ready(function(){
	generateNumber();
	newGame();
	$(".gameOver").hide();
// User Guess
	$("#guessButton").click(function(event){
		event.preventDefault();
// Store User Guess (change String to Number)
		userGuess = +$("#userGuess").val();
// Show User Guess in Guess List
		$("#guessList").append("<li>"+userGuess+"</li>");
// Prevent Invalid Responses
		if (isNaN(userGuess) || userGuess < 1 || userGuess > 100){
			feedback("Read the Rules");
			count--;
			$("#guessList li:last").remove();
		};
// Count User Guess
		count++;
		document.getElementById("count").innerHTML=count;
// Empty User Guess
		$("#userGuess").val("").attr("placeholder", "Try Again!");
// Check Guess
		absolute();
	});
});

