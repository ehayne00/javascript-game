document.addEventListener("DOMContentLoaded", ()=>{

  //initial loaded CONSTANTS
  let startBtn = document.querySelector("#start") 
  startBtn.addEventListener("click", startGame)

})


//global variables
let counter = document.querySelector("#counter")


//functions
function startGame() {
    
  let startBtn = document.querySelector("#start")
  setInterval(incrementCounter, 1000);

  startBtn.style.visibility = "hidden";
  let form = document.querySelector("#add-form")

  let inputField = document.createElement("input")
  inputField.type = "text"
  inputField.name = "answer"
  inputField.placeholder = "type answers here.."

  let submitBtn = document.createElement("input")
  submitBtn.type = "submit"

  form.append(inputField, submitBtn)

  movingObjects();

  form.addEventListener("submit", (event)=>checkWordsTyped(event, form))
    
}



function movingObjects() {

  let monkeyDiv = document.createElement("div")
  monkeyDiv.innerText= '🐒'
  monkeyDiv.id = "monkey"
  monkeyDiv.className = "position"

  let fireDiv= document.createElement('div')
  fireDiv.innerText= '🔥'
  fireDiv.id = "fire"
  fireDiv.className = "position"

  let rainDiv = document.createElement('div')
  rainDiv.innerText= '🌧️'
  rainDiv.id= "rain"
  rainDiv.className = "position"

  let ballDiv = document.createElement('div')
  ballDiv.innerText= '⚽'
  ballDiv.id ="ball"
  ballDiv.className = "position"

  let frizbeeDiv = document.createElement('div')
  frizbeeDiv.innerText = '🥏'
  frizbeeDiv.id = "frizbee"
  frizbeeDiv.className = "position"

  let balloonDiv = document.createElement('div')
  balloonDiv.innerText = '🎈'
  balloonDiv.id= "balloon"
  balloonDiv.className = "position"

  let bearDiv = document.createElement('div')
  bearDiv.innerText= '🐻'
  bearDiv.id= "bear"
  bearDiv.className = "position"

  let pandaDiv = document.createElement('div')
  pandaDiv.innerText= '🐼'
  pandaDiv.id= "panda"
  pandaDiv.className = "position"

  let squirrelDiv = document.createElement('div')
  squirrelDiv.innerText= '🐿️'
  squirrelDiv.id = "squirrel" 
  squirrelDiv.className = "position"

  let objectsDiv = document.querySelector("#objects")
  objectsDiv.append(monkeyDiv, fireDiv, rainDiv, ballDiv, frizbeeDiv, balloonDiv, bearDiv, pandaDiv, squirrelDiv);

  let tl = gsap.timeline();

  tl.from("#monkey", {duration:10, opacity: 0, x:1400});
  tl.from("#bear", {duration:9, opacity: 0, x:1400, y:-50});
  tl.from("#balloon", {duration:10, opacity:0, x:1400, y:-100});
  tl.from("#panda", {duration: 9, opacity:0, x:1400});
  tl.from("#frizbee", {duration:8, opacity:0, x:1400, y:90});
  tl.from("#squirrel", {duration:9, opacity:0, x:1400});
  tl.from("#fire", {duration:8, opacity:0, x:1400});
  tl.from("#ball", {duration:9, opacity: 0, x:1400, y:-90});
  tl.from("#rain", {duration:8, opacity:0, x:1400, y:-150});
}




function incrementCounter(){
  let counterText = counter.textContent
  let counterNumber = parseInt(counterText)
  counterNumber +=1
  counter.textContent = counterNumber 
}


function checkWordsTyped(event, form) {
  
  event.preventDefault()
    
  let counterText = counter.textContent
  let counterNumber = parseInt(counterText)

  let words = [];
  let word = event.target.answer.value;
  words.push(word)
    //re-write tommorrow. I want to say, WHEN the counter is at 6, check the words array for "banana".
  const result = words.filter(word => word === "banana") //if result does not contain banana,
  if(counterNumber < 6  && result.length !== 1 ) {
      
      let smallSmile = document.createElement("div")
      smallSmile.innerText = '🙂'
      smallSmile.id = "small-smile"
      let objectsDiv = document.querySelector("#objects")
      objectsDiv.append(smallSmile)
      
    }
    
    form.reset();
  }  








