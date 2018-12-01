/*-------------------------------------API: TO GET THE QUOTES------------------------------------------*/

// Create a request variable and assign a new XMLHttpRequest object to it.
const request = new XMLHttpRequest();

//I don't know why, but we need to define callback (for the next step)
var map;
function callback(cb) {
    map = cb;
    console.log(map);
}

//callback function to know whether the request has succeeded or failed
request.onreadystatechange = () => {
    if (request.readyState == 4 && request.status == 200)
        callback(request.responseText);
}

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://talaikis.com/api/quotes/', true);


/*-------------------------------------CONSTANTS AND VARIABLES------------------------------------------*/

const name_entered = document.querySelector('#inputName');
const button = document.querySelector('.button');
const button_game = document.querySelector('.button_game')

const introPage = document.querySelector('.intro');
const gamePage = document.querySelector('.game');
const lostPage = document.querySelector('.lost');
const end_message = document.querySelector('.end_message');

const question = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const radio1 = document.querySelector('.radio1');
const radio2 = document.querySelector('.radio2');
const radio3 = document.querySelector('.radio3');

var points = 0;
var place; //used in playGame to know which is the right answer
var lost = false;


/*-------------------------------------EVENTS LISTENERS AND THEIR FUNCTIONS-----------------------------------------*/

//if we click on the button, we activate the function "startGame"
button.addEventListener(
  'click',
  startGame
);

//if we click on the game button, the function right_wrong() will see whether the right author has been chosen
button_game.addEventListener(
  'click',
  right_wrong
);


//this function saves the user's name and starts the game by removing a class and adding another one
function startGame (){
    const name = name_entered.value;
    console.log(name);
    gamePage.classList.remove('hide'); //the game page isn't hidden anymore
    introPage.classList.add('hide'); //now we hide the intro page 
}

function endGame (){
    gamePage.classList.add('hide'); //the game page is hidden
    lostPage.classList.remove('hide'); //the lost page appears so that we can write the congratulations text
    
    //congratulations messages in function of number of points won
    switch(true) {  
        case (points == 0):
            end_message.innerHTML = '<span>'+'You should try again '+name+'!'+'</span>';
            break;

        case (points == 1):
            end_message.innerHTML = '<span>'+'You won 1 point, well done '+name+'!'+'</span>';
            break;
            
        case (points > 1):
            end_message.innerHTML = '<span>'+'You won '+points+' points, congratulations '+name+'!!'+'</span>';
            break;
    }
}   

function right_wrong (){
    console.log("appel right_wrong");
    if (place.checked)
        {
            console.log("checked");
            points++;
            playGame();
            console.log("new game");
        }
    else endGame();
}




/*-------------------------------------MAIN FUNCTION: PLAYGAME------------------------------------------*/

function playGame(){
    const data = JSON.parse(request.response);
    
    const random_nb1 = Math.floor(Math.random() * 100); //generates a random number integer from 0 to 99
    const random_nb2 = Math.floor(Math.random() * 100);
    
     //this is to be 99.9% sure the two numbers won't be equal
    if (random_nb1 == random_nb2) random_nb2 = Math.floor(Math.random() * 100); 

                /*general idea:
                    we're generating random numbers that we will be using for 3 reasons:
                        -to select a random quote and its author (1)
                        -to randomly select the wrong authors (2)
                        -to have a random display of authors (3)
                            */
    
    console.log(random_nb1);
    console.log(random_nb2);
    
    var phrase = data[random_nb1].quote; // (1)
    var real_author = data[random_nb1].author; // (1)
    var wrong_author1 = data[random_nb2].author; //(2) to select the author of the quote n°random_nb2
    var wrong_author2 = data[random_nb2 % 3].author;  //(2) to select the author of the quote n°(random_nb2 modulo 3)(change this pls)

    //display the quote 
    question.innerHTML = phrase;

    switch(true) {  //(3) using the random number to have different displays
        case (random_nb1 <= 30):
            option1.innerHTML = '<span>'+real_author+'YAS'+'</span>';
            option2.innerHTML = '<span>'+wrong_author1+'</span>';
            option3.innerHTML = '<span>'+wrong_author2+'</span>';
            place = radio1;
            break;

        case (random_nb1 > 30 && random_nb1 < 60):
            option1.innerHTML = '<span>'+wrong_author2+'</span>';
            option2.innerHTML = '<span>'+real_author+'YAS'+'</span>';
            option3.innerHTML = '<span>'+wrong_author1+'</span>';
            place = radio2;
            break;

        case (random_nb1 >= 60):
            option1.innerHTML = '<span>'+wrong_author1+'</span>';
            option2.innerHTML = '<span>'+wrong_author2+'</span>';
            option3.innerHTML = '<span>'+real_author+'YAS'+'</span>';
            place = radio3;
            break;
    }
    
    console.log("fin du switch dans playGame()");
}



//we need the onload function to access the JSON data, THIS IS WHERE WE CALL PLAYGAME !
request.onload = function () {
    //const data = JSON.parse(this.response);
    
    playGame();
}
    

// Send request
request.send();

/*
problems:
-someimes 2 equal fake answers sometimes
*/

            