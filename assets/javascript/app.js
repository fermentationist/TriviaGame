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

 	function getNewGame (category = 9, difficulty = "medium"){
		var queryURL = "https://opentdb.com/api.php?amount=1&category=" + category + "&difficulty=" + difficulty + "&encode=url3986";
		console.log("queryURL = " + queryURL);
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response){
			return new triviaGame (response);
		});
	}

	function triviaGame (response){
		console.log("response = " + response);
		this.question = response.results[0].question;
		this.answer = response.results[0].correct_answer;
		console.log(this.answer);
		response.results[0].incorrect_answers.push(this.answer);
		this.choices = response.results[0].incorrect_answers;
		console.log("this.choices = " + this.choices);

		this.update = function()_{
			$
		}
 	}
 	


 	getNewGame();

	
});