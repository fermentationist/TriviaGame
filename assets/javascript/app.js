$(document).ready(function(){

	// var queryURL = "https://opentdb.com/api.php?amount=1&category=31&difficulty=medium";
 //    var triviaObject;
 //    $.ajax({
 //      url: queryURL,
 //      method: "GET"
 //    }).done(function(response) {
 //      triviaObject = response;
 //      console.log(response.results[0].question);
 //      return triviaObject;
 //  	})
 	var currentGame = null;

 	function getNewGame (category = 9, difficulty = "medium"){
		var queryURL = "https://opentdb.com/api.php?amount=1&category=" + category + "&difficulty=" + difficulty;
		console.log("queryURL = " + queryURL);
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response){
			currentGame = new triviaGame (response);
			return currentGame;
		});
	}

	function triviaGame (response){
		this.correct = 0;
		this.incorrect = 0;
		console.log("response = " + response);
		this.question = response.results[0].question;
		this.answer = decodeURI(response.results[0].correct_answer);

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
			this.choices.forEach(function(choice){
				console.log("choice = " + choice);
				var buttonDiv = $("<button>").attr("type", "button").attr("class", "btn btn-warning list-group-item choice-button").attr("id", choice);
				$(buttonDiv).text(choice);
				$("#choices").append(buttonDiv);
			});
		
 		}
 		this.update();
 	}

 	function submitAnswer(event){
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