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


/*-------------------------------------GETTING THE NAME AND STARTING THE GAME------------------------------------------*/

const name = document.querySelector('#inputName');
const button = document.querySelector('.button');
const introPage = document.querySelector('.intro');
const gamePage = document.querySelector('.game');
const question = document.querySelector('.question');
const answer = document.querySelector('.answer');
const f1 = document.querySelector('.false1');
const f2 = document.querySelector('.false2');



//if we click on the button, we activate the function "startGame"
button.addEventListener(
  'click',
  startGame
);

//this function saves the user's name and starts the game by removing a class and adding another one
function startGame (){
    gamePage.classList.remove('hide'); //the game page isn't hidden anymore
    introPage.classList.add('hide'); //now we hide the intro page 
}


//we need the onload function to access the JSON data

request.onload = function () {
    var data = JSON.parse(this.response);

    //go through all the quotes
    data.forEach(e => {
        
        //display the quote
        var phrase = e.quote;
        question.innerHTML = '<span>'+phrase+'</span>';
        
        //display the real author and 2 fake 
        var real_author = e.author;
        answer.innerHTML = '<span>'+real_author+'</span>';
        f1.innerHTML = '<span>Macron</span>';
        f2.innerHTML = '<span>Dieu</span>';
        
    })
}
    

// Send request
request.send();








//c'est un test numero 2



            