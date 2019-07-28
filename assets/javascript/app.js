$(document).ready(function() {
    
//hide sections with questions and answers and final result window at page loading 

$("#qContainer").hide();
$("#finalWindow").hide();

var alertDiv = $("#alert");
var intervalId ; //variable for setInterval
var timeoutId  ; //variable for the timeOut
var nextTimeout ; // timeout for next question generating 
var clockRunning = false;
var time = 30; // timer set to 30 seconds 
var totalCorrect = 0; // variable for total correct answers
var totalWrong = 0; // variable for total incorrect answers
var totalUnAnswered = 0; // variable for total unanswered questions

// Array of jobjects with questions and answers

var questionArray = [{Question : "What is the closest planet to the Sun?" ,
                      answer1 : "Jupiter" , answer2 : "Titan",
                      answer3 : "Earth", correctAnswer : "Mercury" },

                    {Question : "What is the name of the 2nd biggest planet in our solar system?" ,
                      answer1 : "Jupiter" , answer2 : 'Pluto',
                      answer3 : "Venus", correctAnswer : "Saturn "},

                    {Question : "What is the hottest planet in our solar system?" ,
                      answer1 : "Earth" , answer2 : 'Ganymede',
                      answer3 : "Mercury", correctAnswer : "Venus" },

                    {Question : "What planet is famous for its big red spot on it?" ,
                      answer1 : "Saturn" , answer2 : 'Mars',
                      answer3 : "Neptune", correctAnswer : "Jupiter" },

                    {Question : "What planet is famous for the beautiful rings that surround it?" ,
                      answer1 : "Jupiter" , answer2 : 'Venus',
                      answer3 : "Pluto", correctAnswer : "Saturn "},

                    {Question : "Who was the first person to walk on the moon?" ,
                      answer1 : "Buzz Aldrin" , answer2 : 'Alan B. Shepard',
                      answer3 : "Michael Collins", correctAnswer : "Neil Armstrong"},

                    {Question : "What planet is known as the red planet?" ,
                      answer1 : "Venus" , answer2 : 'Mercury',
                      answer3 : "Titan", correctAnswer : "Mars"},

                    {Question : "What is the name of the force holding us to the Earth?" ,
                      answer1 : "Friction" , answer2 : 'Air Resistance',
                      answer3 : "Tension", correctAnswer : "Gravity"},

                    {Question : "What is the name of NASA’s most famous space telescope?" ,
                      answer1 : "Spitzer Space Telescope" , answer2 : 'Kepler Space Telescopes',
                      answer3 : "Green Bank Telescope", correctAnswer : "Hubble Space Telescope"},

                    {Question : "Earth is located in which galaxy?" ,
                      answer1 : "Andromeda" , answer2 : 'Whirlpool',
                      answer3 : "Messier 81", correctAnswer : "Milky Way "},

                    {Question : "What is the name of the first satellite sent into space?" ,
                      answer1 : "Aqua" , answer2 : 'Skylab',
                      answer3 : "Calipso", correctAnswer : "Sputnik" },

                    {Question : "Ganymede is a moon of which planet?" ,
                      answer1 : "Mars" , answer2 : 'Mercury',
                      answer3 : "Earth", correctAnswer : "Jupiter"},

                    {Question : " What is the name of Saturn’s largest moon?" ,
                      answer1 : "Europa" , answer2 : 'Triton',
                      answer3 : "Charon", correctAnswer : "Titan" }                   
                    ];

var arrayIndex = 0;

alertDiv.hide();

/*--------------------------------This function reads the next question from the array--------------------------------------- */ 

function nextQuestion(){
  // 
  
  var tempArray ="";
  var propertyArray = "";

    if (arrayIndex < questionArray.length) {
          //read question from the object and assign to the question section
        $("#question").text(questionArray[arrayIndex].Question);

        // clone object to a variable. This way the object reference would not be copied

        tempArray = jQuery.extend({}, questionArray[arrayIndex])

        delete tempArray.Question; // delete the question property from the object 

        // get remaining property names and have in an array in a random order 
        propertyArray = (Object.getOwnPropertyNames(tempArray).sort(function(a, b){return 0.5 - Math.random()}));
        
        //assign values to buttons with class .answerButton 
        $(".answerButton").each(function(i, elm){
        
          var propertyVal = propertyArray.shift();
          $(elm).data('name' , propertyVal); 
          $(elm).val(propertyVal);
          $(elm).text(Object.getOwnPropertyDescriptor(tempArray,propertyVal).value);
          
        });


    }
    else{
      //populate final screen
      finalWindow();
    }
    
}; //end function nextQuestion

/*----------------------------------This function will create the timer-------------------------------------------- */
function createTimer(){
  
  
      intervalId = setInterval(count,1000); // create timer interval
      timeoutId = setTimeout(checkArray,30000); // create timeout for the count down
      

  
} ; //end createTimer

/*--------------------------------------This function will display the timer------------------------------------- */

function count() {
  time--;
  var newTime = timeConverter(time);
  $("#timer").text(newTime);  


}

/*--------------------------------------------------------------------------------------------------------------- */

function timeConverter(t) {

  //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
  var minutes = Math.floor(t / 60);
  var seconds = t - (minutes * 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes === 0) {
    minutes = "00";
  }

  else if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return minutes + ":" + seconds;
}

/*--------------------------------------------This funciton will be excuted at the timeout------------------------- */
function checkArray(){

  clearTimer();
  totalUnAnswered++;
  $(".alertMessage").detach();

  var alertMessage = $("<p>");
  alertMessage.text("Out of Time, Correct answer is " + $(".answerButton[value = correctAnswer]").text());
  alertMessage.addClass("alertMessage");
  
  $("#alertSymbol").hide();
  

  alertDiv.append(alertMessage);
  alertDiv.show();
  $(".answerButton[value = correctAnswer]").css({"border-color":"Green" , "border-width" : "5px"});
  nextQuestionTimer();
} //end function checkArray

/*---------------------------------------------------------------------------------------------------------------- */

/*-------------------------------------------this function will clear all the timers------------------------------ */
function clearTimer(){
  
  clearInterval(intervalId);
  clearTimeout(timeoutId);
  time = 30;

} //end function clearTimer

/*---------------------This function will populate the alter symbol based on the paramerter valiue------------------- */
function ansAlert(altSymbol){

  var alertImage = $("#alertSymbol");
  // alertImage.css("visibility", "visible");

  if (altSymbol === 'C'){ // correct answer
    
    
    alertImage.attr("src","assets/images/kisspng-symbol-icon-blue-tick-symbol-5a999a91d85a13.4382999715200160178862.png"); 
  }
  else { // incorrect answer
    alertImage.attr("src","assets/images/kisspng-christian-cross-computer-icons-clip-art-tick-and-cross-5aad4b8ff11030.6290340215213065119874.png"); 
  }
  $("#timer").text("00:00");
  $(".alertMessage").detach(); // remove the paragraph element from the div 
  alertImage.show();
  alertDiv.show();
  nextQuestionTimer();
  
} // end function ansAlert

/*--------------------------------------this function will create timer to populate the next question ------------ */
function nextQuestionTimer(){  
  
  nextTimeout = setTimeout(nextQuesTimeout,3000);
  
}

/*-------------------------------------Function executed after timeout-------------------------------------------- */
function nextQuesTimeout(){
  alertDiv.hide();
  $(".answerButton").css({"border-color":"grey" , "border-width" : "1px"});
  clearTimeout(nextTimeout);
  createTimer();
  nextQuestion();
  arrayIndex++;
}

/*------------------------------------Funtion will call the section with final results--------------------------*/
function finalWindow(){
  
  clearTimer();
  $("#qContainer").hide();
  var resultDiv = $("#finalWindow");
  

  $("#totalC").text(totalCorrect);
  $("#totalI").text(totalWrong);
  $("#totalU").text(totalUnAnswered);
  
  resultDiv.show();

}

/*----------------------------------------function to reset play-------------------------------------------------- */

function startPlay(){
  $("#play").hide(); // hide the play button
    
  $("#qContainer").show(); //show the container with questions and answers
  createTimer();
  nextQuestion();
  arrayIndex++; //set the array index to the next value 
}
/*---------------------------------------function on click of the Play button--------------------------------------*/
  $("#play").click(function(){
      
    startPlay();

  });

/**------------------------------------function on click answer buttons------------------------------------------- */
  $(".answerButton").click (function(){
    
    if ($(this).data('name') === 'correctAnswer') {
      $(this).css("border-color", "red");
      totalCorrect++;
      clearTimer();
      ansAlert('C');      
    }
    else {
      
      $(".answerButton[value = correctAnswer]").css({"border-color":"Green" , "border-width" : "5px"});
      totalWrong++;
      clearTimer();
      ansAlert('W');      
      
    }
  });

  /*------------------------------------function on click play again button--------------------------------------- */
  $("#btnRestart").click(function(){
    arrayIndex = 0;
    time = 30; // timer set to 30 seconds 
    totalCorrect = 0;
    totalWrong = 0;
    totalUnAnswered = 0;

    $("#finalWindow").hide();
    startPlay();
  })
})