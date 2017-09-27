$(document).ready(function(){

 	var currentGame = null;

 	function getNewGame (category = 9, difficulty = "medium"){
		var queryURL = "https://opentdb.com/api.php?amount=1&category=" + category + "&difficulty=" + difficulty;
		console.log("queryURL = " + queryURL);
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response){
			currentGame = new triviaGame (response);
			return currentGame.startTimer();
		});
	}

	function triviaGame (response){
		this.intervalTimer = null;
		this.counter = 15;
		this.correct = 0;
		this.incorrect = 0;
		console.log("response = " + response);
		this.question = response.results[0].question;
		this.answer = response.results[0].correct_answer;

		console.log(this.answer);
		response.results[0].incorrect_answers.push(this.answer);
		this.choices = response.results[0].incorrect_answers;
		console.log("this.choices = " + this.choices);
		console.log("this.choices[1] = " + this.choices[1]);

		this.update = function() {
			$("#question").empty();
			$("#choices").empty();
			$("#question").html(this.question);
			$("#correct").text(this.correct);
			$("#incorrect").text(this.incorrect);
			$("#timer").text(this.counter);
			this.choices.forEach(function(choice){
				console.log("choice = " + choice);
				var buttonDiv = $("<button>").attr("type", "button").attr("class", "btn btn-warning list-group-item choice-button").attr("id", choice);
				$(buttonDiv).text(choice);
				$("#choices").append(buttonDiv);
			});
 		}

 		this.turnOver = function (isCorrect) {
 			$(document).off();
 			clearInterval(this.intervalTimer);
 			if (isCorrect) {
 				console.log("Correct Answer!");
 			}else{
 				console.log("Your Time Is Up!");
 			}
 		}

 		this.startTimer = function(){
 			var self = this;
 			var countDown = function(){
 				console.log(self.counter);
 				if (self.counter < 1){
 					return self.turnOver(false);
 				}
 				self.counter --;
 				self.update();
 			} 			
 			this.intervalTimer = setInterval(countDown,1000);
 			return this.intervalTimer;

 		}

 		this.update();
 	}

 	function submitAnswer(event){
		$(document).off();
		clearInterval(currentGame.intervalTimer);
 		var target = (event.target);
 		var guess = $(target).attr("id");
 		console.log("you guessed: " + guess);
 		if (guess === currentGame.answer){
 			console.log("Correct!");
 			currentGame.correct ++;
 		}else{
 			console.log("Incorrect!");
 			currentGame.incorrect ++;
 		}
 		currentGame.update();
 	}

 	$(document).on("click", ".choice-button", function(event){
 		$(event.target).addClass("active").siblings().removeClass("active");
 		submitAnswer(event);
 	});

 	$(".difficulty-button").on("click",function(event){
 		$(this).addClass("active").siblings().removeClass("active");
 	});

	var currentGame = getNewGame;
	currentGame();
});