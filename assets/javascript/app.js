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
		var queryURL = "https://opentdb.com/api.php?amount=1&category=" + category + "&difficulty=" + difficulty;
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
		console.log("this.choices[1] = " + this.choices[1]);

		this.update = function() {
			$("#question").empty();
			$("#choices").empty();
			$("#question").text(this.question);
			this.choices.forEach(function(choice){
				console.log("choice = " + choice);
				var radioDiv = $("<input>").attr("type", "radio").attr("class", "optradio");
				var inputDiv = $("<label>").attr("id", choice).text(choice).append(radioDiv);
				$("#choices").append(inputDiv);
			});
			$("#choices label").wrap("<div class='radio'>");
		this.update();
 		}
 	


 		getNewGame();

 	}

	
});