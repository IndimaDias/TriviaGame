$(document).ready(function() {
    debugger;
    console.log("ready");
// Array of jobjects with questions and answers

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


function nextQuestion(){
    if (arrayIndex < questionArray.length) {
        console.log(questionArray[arrayIndex]);
    }
    
    
}; 

    $("#play").click(function(){
        // debugger;
        $("#play").hide();
        nextQuestion();
        arrayIndex++;
    });


})