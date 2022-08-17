$(document).ready(function() {
  var timeRemaining = 10;
  var gameScore = 0;
  var highScore = [];
  var currentQuestion;
  var interval;
  var value = 10;
  
  var maxValue = function () {
    if(document.getElementById('ten').checked) {
      value = document.getElementById('ten').value;
    } else if(document.getElementById('twenty').checked) {
      value = document.getElementById('twenty').value
    } else if(document.getElementById('thirty').checked) {
      value = document.getElementById('thirty').value
    } else if(document.getElementById('fourty').checked) {
      value = document.getElementById('fourty').value
    } else if(document.getElementById('fifty').checked) {
      value = document.getElementById('fifty').value
    }
  };
  

  var updateRemainingTime = function(amount) {
    timeRemaining += amount;
    $('#timer').text(timeRemaining);
  }

  var startGame = function() {
    if (!interval) {
      if (timeRemaining === 0) {
        updateRemainingTime(10);
      }
      interval = setInterval(function() {
        updateRemainingTime(-1);
        if (timeRemaining === 0) {
          clearInterval(interval);
          interval = undefined;
          alert('Game Over!');
          updateHighScore();
          gameScore = 0;
        } else if(timeRemaining > 4) {
          $('body').css('background-color', 'green');
        } else if(timeRemaining === 3) {
          $('body').css('background-color', 'yellow');
        } else if(timeRemaining === 2) {
          $('body').css('background-color', 'orange');
        } else if(timeRemaining === 1) {
          $('body').css('background-color', 'red')
        };
        
        console.log(timeRemaining);
      }, 1000);
    };
  };

  var randomNumber = function(size) {
    return Math.ceil(Math.random() * size);
  }

  var newQuestion = function() {
    var question = {};
    var firstNumber = randomNumber(value);
    var secondNumber = randomNumber(value);
    //console.log(firstNumber);
    //console.log(secondNumber);

    question.answer = firstNumber + secondNumber;
    question.equation = String(firstNumber) + " + " + String(secondNumber);

    return question;

  }

  var inputNewQuestion = function() {
    currentQuestion = newQuestion();
    $('#new-question').text(currentQuestion.equation);
  }

  var checkResult = function(userInput, answer) {
    if (userInput === answer) {
      inputNewQuestion();
      updateRemainingTime(+1);
      $('#userAnswer').val('');
      gameScore++;
      $('.gameScore').text('');
      $('.gameScore').append(gameScore);
    }
  }

  currentQuestion = newQuestion();
  $('#new-question').text(currentQuestion.equation);


  var updateHighScore = function() {
    var high = highScore.slice(0);
    if (gameScore > high) {
      highScore.pop();
      console.log(highScore)
      highScore.push(gameScore);
      $('.highScore').text('');
      $('.highScore').append(highScore.slice(-1));
    }
  }


  $('#userAnswer').on('keyup', function() {
    startGame();
    checkResult(Number($(this).val()), currentQuestion.answer);
  });

  $('.number-limit').on('click', function () {
    maxValue ();
    inputNewQuestion();
  })

  inputNewQuestion();
});
