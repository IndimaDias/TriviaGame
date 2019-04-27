$(document).ready(function() {
    
    console.log("ready");
$("#qContainer").hide();
// Array of jobjects with questions and answers

var intervalId ; //variable for setInterval
var timeoutId  ; //variable for the timeOut
var clockRunning = false;
var time = 30; // timer set to 30 seconds 
var alertDiv = $("#alert");

var questionArray = [{Question : "What is the closest planet to the Sun?" ,
                      answer1 : "Jupiter" , answer2 : "Titan",
                      answer3 : "Earth", correctAnswer : "Mercury" },

                    {Question : "What is the name of the 2nd biggest planet in our solar system?" ,
                      answer1 : "Jupiter" , answer2 : 'Pluto',
                      answer3 : "Venus", correctAnswer : "Saturn "},

                    {Question : "What is the hottest planet in our solar system?" ,
                      answer1 : "Earth" , answer2 : 'Ganymede',
                      answer3 : "Mercury", correctAnswer : "Venus", correctAns : 3 },

                    {Question : "What planet is famous for its big red spot on it?" ,
                      answer1 : "Saturn" , answer2 : 'Mars',
                      answer3 : "Neptune", correctAnswer : "Jupiter", correctAns : 4 },

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
                      answer3 : "Charon", correctAnswer : "Titan", correctAns : 2 }                   
                    ];

var arrayIndex = 0;

alertDiv.hide();
/*--------------------------------This function reads the next question from the array--------------------------------------- */ 

function nextQuestion(){
    if (arrayIndex < questionArray.length) {
          //read question from the object and assign to the question section
        $("#question").text(questionArray[arrayIndex].Question);

        var tempArray = questionArray[arrayIndex]; // coppy object to a temporary variable

        delete tempArray.Question; // delete the question property from the object 

        // get remaining property names and have in an array in a random order 
        var propertyArray = (Object.getOwnPropertyNames(tempArray).sort(function(a, b){return 0.5 - Math.random()}));
        
        //assign values to buttons with class .answerButton 
        $(".answerButton").each(function(i, elm){
        
          var propertyVal = propertyArray.shift();
          $(elm).data('name' , propertyVal); 
          $(elm).val(propertyVal);
          $(elm).text(Object.getOwnPropertyDescriptor(tempArray,propertyVal).value);
          
        });


    }
    
    
}; //end function nextQuestion

/*----------------------------------This function will create the timer-------------------------------------------- */
function createTimer(){
  
  if (!clockRunning) {
      intervalId = setInterval(count,1000);
      timeoutId = setTimeout(checkArray,30000);
      console.log(intervalId);
      clockRunning = true;
    }

  
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
  clearInterval(intervalId);
  clearTimeout(timeoutId);
  time = 30;
  console.log("timeout");
} //end function checkArray

/*---------------------------------------------------------------------------------------------------------------- */
function AnsAlert(altSymbol){
  debugger;
  var alertImage = $("#alertSymbol");

  if (altSymbol === 'C'){
    
    console.log(alertImage.attr('src'));
    alertImage.attr("src","https://png2.kisspng.com/sh/b2c66ce9415cbfb6db545ba6dff5daba/L0KzQYm3U8AzN6d8iZH0aYP2gLBuTgN6dZN0hJ9yY3BxPbPzlfUufJpog598eX3lf720VfE6QWpmUaNtOEXkQYS1VMM5OmoAUak6NUKzQIK9UME4QGk7SpD5bne=/kisspng-symbol-icon-blue-tick-symbol-5a999a91d85a13.4382999715200160178862.png"); 
  }
  else {
    alertImage.attr("src","https://png2.kisspng.com/sh/836df75f93f4d860e96e369d83356764/L0KzQYm3V8A0N6NtR91yc4Pzfri0gBhzcaR5gdN3LXP1f8T6TgN6dZN0hJ9sb33zhcXskr1qa5Dzi59qbXX1ebTojr1zbZUyTdQ8Y0HoSbaCUcdlbmczTqUDMEW6Qoa4VcMxPmc7Tqc9NUm4SXB3jvc=/kisspng-christian-cross-symbol-computer-icons-american-red-5b3c1e9e917df6.6380572515306666545959.png"); 
  }

  alertDiv.show();
  
}

/*---------------------------------------function on click of the Play button--------------------------------------*/
  $("#play").click(function(){
      
      $("#play").hide(); // hide the play button
    
      $("#qContainer").show(); //show the container with questions and answers
      createTimer();
      nextQuestion();
      arrayIndex++; //set the array index to the next value 
  });

/**------------------------------------function on click answer buttons------------------------------------------- */
  $(".answerButton").click (function(){
    
    if ($(this).data('name') === 'correctAnswer') {
      $(this).css("border-color", "red");
      checkArray();
      AnsAlert('C');
      console.log("Correct");
    }
    else {
      
      $(".answerButton[value = correctAnswer]").css({"border-color":"Green" , "border-width" : "5px"});
      AnsAlert('W');
      console.log("Incorrect");
    }
  });

})