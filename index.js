$(document).ready(function(){
  var currentQuestion;
  
  var randomNumber = function (size) {
    return Math.ceil(Math.random()*size);
  }
  
  var newQuestion = function () {
    var question = {};
    var firstNumber = randomNumber(10);
    var secondNumber = randomNumber(10);
  
    question.answer = firstNumber + secondNumber;
    question.equation = String(firstNumber) + " + " + String(secondNumber);
  
    return question;
    
  }
  
  currentQuestion = newQuestion();
  $('#new-question').text(currentQuestion.equation);
});