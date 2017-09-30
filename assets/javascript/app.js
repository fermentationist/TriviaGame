$(document).ready(function(){

 	var correct = 0;
 	var incorrect = 0;

 	var correct = sessionStorage.getItem("correct") || 0;
 	$("#"+correct).text(correct);
 	var incorrect = sessionStorage.getItem("incorrect") || 0;
 	$("#"+incorrect).text(incorrect);
 	var difficulty = sessionStorage.getItem("difficulty") || "medium";
 	$("#"+difficulty).addClass("active").siblings().removeClass("active");
 	console.log ("difficulty stored in sessionStorage = " + sessionStorage.getItem("difficulty"));

 	var currentGame = getNewGame(difficulty);
 	console.log("currentGame initialized : " + currentGame);

 	function getNewGame (difficulty = "medium", category = 9){
		var queryURL = "https://opentdb.com/api.php?amount=1" + "&difficulty=" + difficulty;
		console.log("queryURL = " + queryURL);
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response){
			delete currentGame;
			currentGame = new triviaGame (response);
			console.log("currentGame initialized : " + currentGame);
			currentGame.startTimer();
			return currentGame;
		});
	}

	function triviaGame (response){
		this.intervalTimer = null;
		this.counter = 15;
		// this.correct = 0;
		// this.incorrect = 0;
		console.log("response = " + response);
		this.question = response.results[0].question;
		this.answer = response.results[0].correct_answer;
		response.results[0].incorrect_answers.push(this.answer);
		this.unshuffledChoices = response.results[0].incorrect_answers;
		this.choices = this.unshuffledChoices.sort(function(a, b){return 0.5 - Math.random()});

		this.update = function() {
			$("#question").empty();
			$("#choices").empty();
			$("#question").html(this.question);
			$("#correct").text(correct);
			$("#incorrect").text(incorrect);
			$("#timer").text(this.counter);
			this.choices.forEach(function(choice){
				var buttonDiv = $("<button>").attr("class", "btn btn-default choice-button").attr("id", choice);
				console.log("button added");
				$(buttonDiv).html(choice);
				$("#choices").append(buttonDiv);
			});
			$(document).on("click", ".choice-button", function(event){
				$(document).off();
		 		submitAnswer(event);
		 	});
 		}

 		this.turnOver = function (isCorrect) {
 			var self = this;
 			$(document).off();
 			clearInterval(this.intervalTimer);
 			if (isCorrect){
 				console.log("Correct!");
 			}else{
 				if (!isCorrect && this.counter < 1) {
 				console.log("Your Time Is Up!");
 				$("#choices").html("<div class='alert alert-danger' role='alert'>Your time is up!</div>");
 				incorrect ++;
 				sessionStorage.setItem("incorrect", incorrect);
 				}else{
 				console.log("Incorrect Answer!");
				}
 				setTimeout(function(){$("#choices").html("<div class='alert alert-success' role='alert'>The correct answer was: " + self.answer + "</div>");},3000)
				
			}

 			console.log("setTimeout");
 			var timeout = setTimeout(nextQuestion, 5000);
 	
 		}

 		this.startTimer = function(){
 			var self = this;
 			var countDown = function(){
 				if (self.counter < 1){
 					return self.turnOver(false);
 				}
 				self.counter --;
 				$("#timer").text(self.counter);

 			} 			
 			this.intervalTimer = setInterval(countDown,1000);
 			return this.intervalTimer;

 		}

 		this.update();
 	}


 	function nextQuestion(){
 		console.log("nextQuestion called, this.length = ", this.length);
 		$("#choices").empty();
 		delete currentGame;
 		currentGame = getNewGame(difficulty);
 		// console.log("currentGame = " + currentGame);
 		// currentGame(difficulty);
 		return;
 	}


 	function submitAnswer(event){
 		$(document).off();
 		var win = false;
 		var answer = currentGame.answer;
 		var target = (event.target);
 		var guess = $(target).attr("id");
 		if (guess === answer){
 			$("#choices").html("<div class='alert alert-success' role='alert'>Correct!!</div>");
 			console.log("Correct!");
 			correct ++;
 			sessionStorage.setItem("correct", correct);
 			win = true;
 		}else{
 			$("#choices").html("<div class='alert alert-danger' role='alert'>Wrong!!</div>");
 			console.log("Incorrect!");
 			incorrect ++;
 			sessionStorage.setItem("incorrect", incorrect);
 		}
 		currentGame.turnOver(win);
 	}

 	$(".difficulty-button").on("click",function(event){
 		$(this).addClass("active").siblings().removeClass("active");
 		difficulty = $(this).attr("id");
 		console.log("difficulty = " + difficulty);
 		sessionStorage.setItem("difficulty", difficulty);
 		console.log("difficulty save in sessionStorage:" + sessionStorage.getItem("difficulty"));
 		// $(document).off();
 		// currentGame = null;
 		// nextQuestion();
 	});

 	$(".navbar-brand").on("click", function(){
 		location.reload();
 	})

 	$(".timer").on("click", function (event) {
 		console.log("timer clicked!");
 		if (currentGame.intervalTimer){
 			clearInterval(currentGame.intervalTimer);
 			$(document).off();
 		}
 	});

});