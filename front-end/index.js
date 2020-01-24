

//write myself a guide for using the serializer gabe showed..


  //fetches


  function get(url) {
    return fetch(url)
    .then(resp => resp.json())
  }


  function post(url, obj) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(obj)
    })
    .then(resp => resp.json())
  }


  function destroy(url, id){
    return fetch(`${url}${id}`, {
      method: "DELETE"
    })
  }


  //global variables
const counter = document.querySelector("#counter")
const startBtn = document.querySelector("#start")
const nameForm = document.querySelector("#user-form")

const smallSmile = document.createElement("div")
const containerImage = document.querySelector("#container-image")
const appendScore = document.querySelector("#score-instance")
const yourScore = document.createElement("p")
yourScore.id = "your-score"
const objectsDiv = document.querySelector("#objects")
const form = document.getElementById("add-form")
const appendName = document.querySelector("#name-p")
const gamesUrl = "http://localhost:3000/games/"
const userUrl = "http://localhost:3000/users/"

//functions

  function getGames(){
    get(gamesUrl)
    .then(games => games.forEach(renderScores))
  }


  function renderScores(game){
    const scoresUl = document.querySelector("#scores")
    const newLi = document.createElement("li")
    newLi.innerText= `Name: ${game.username}, Score: ${game.score}`
    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "delete score"

    scoresUl.append(newLi, deleteBtn)
    deleteBtn.addEventListener("click", () => deleteScore(game, newLi, deleteBtn))
  }


  function deleteScore(game, newLi, deleteBtn){
    destroy(gamesUrl, game.id).then(()=>{ 
      newLi.remove();
      deleteBtn.remove()
    })
  }


  function postUserThenRender(e){

    e.preventDefault()
    
    let userDetails = {
      name: event.target.name.value
    }

    let userObject = {
      user: userDetails
    }
  
    post(userUrl, userObject)
    .then(user => {renderUser(user), startBtn.addEventListener("click", ()=> startGame(user))})
  
    nameForm.reset()
    nameForm.style.visibility = "hidden"
    
  }


  function renderUser(user){
    appendName.innerHTML= `You are playing as: <u>${user.name}</u>`
  }


 function startGame(user) {
  form.innerHTML = ""
  counter.innerText = "0"
  if (appendScore.hasChildNodes === yourScore){
  appendScore.removeChild(yourScore)
  }
  if (smallSmile){
    smallSmile.remove()
  }
  yourScore.innerText = ""

  containerImage.src = "/Users/admin/Development/code/javascript-game/front-end/images/game image.png"
  
  let intervalCount = setInterval(incrementCounter, 1000);

  startBtn.style.visibility = "hidden";
  
  let inputField = document.createElement("input")
  inputField.type = "text"
  inputField.name = "answer"
  inputField.placeholder = "type answers here.."

  let submitBtn = document.createElement("input")
  submitBtn.type = "submit"
  
  form.append(inputField, submitBtn)

  movingObjects();

  let words = [];
  form.addEventListener("submit", function(e){
    e.preventDefault()
    
    let word = event.target.answer.value;
    words.push(word)
    form.reset()
    
  })

  
  setTimeout(()=> interval1(words), 7000)
  setTimeout(()=> interval2(words), 17000)
  setTimeout(()=> interval3(words), 26000)
  setTimeout(()=> interval4(words), 36000)
  setTimeout(()=> interval5(words, user, intervalCount, form), 44000)
  setTimeout(()=> interval6(words, user, intervalCount, form), 53000)
  setTimeout(()=> interval7(words, user, intervalCount, form), 61000)
  setTimeout(()=> interval8(words, user, intervalCount, form), 69000)
  setTimeout(()=> interval9(words, user, intervalCount, form), 78000)


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


function interval1(words){
    const result = words.filter(word => word === "banana")
    if (result.length !== 1) {

      smallSmile.innerText = '🙂'
      smallSmile.id = "small-smile"
      let objectsDiv = document.querySelector("#objects")
      objectsDiv.append(smallSmile)

    }
}


function interval2(words){
  const result2 = words.filter(word => word === "honey")
    if (result2.length !== 1) {
       if (smallSmile.innerText === '🙂'){
         smallSmile.innerText = '😑'
       }
       else {
         smallSmile.innerText = '🙂'
        smallSmile.id = "small-smile"
        let objectsDiv = document.querySelector("#objects")
        objectsDiv.append(smallSmile)
       }
    }
}


function interval3(words){
  const result3 = words.filter(word => word === "pop")
    if (result3.length !== 1) {
      if (smallSmile.innerText === '😑'){
        smallSmile.innerText = '😔'
      }
      else if (smallSmile.innerText === '🙂'){
        smallSmile.innerText = '😑'
      }
      else {
        smallSmile.innerText = '🙂'
        smallSmile.id = "small-smile"
        let objectsDiv = document.querySelector("#objects")
        objectsDiv.append(smallSmile)
      }
    }
}


function interval4(words){
    const result4 = words.filter(word => word === "bamboo")
    if (result4.length !== 1) {
      if (smallSmile.innerText === '😔'){
        smallSmile.innerText = '🤕'
      }
      else if(smallSmile.innerText === '😑') {
        smallSmile.innerText = '😔'
      }
      else if (smallSmile.innerText === '🙂'){
        smallSmile.innerText = '😑'
      }
      else{
        smallSmile.innerText ='🙂'
        smallSmile.id = "small-smile"
        let objectsDiv = document.querySelector("#objects")
        objectsDiv.append(smallSmile)
      }
    }
}


function interval5(words, user, intervalCount, form){
    const result5 = words.filter(word => word === "catch")
    if(result5.length !== 1){
      if (smallSmile.innerText === '🤕'){
        smallSmile.innerText = '💀'
        endGame(user, intervalCount, form)
      }
      else if (smallSmile.innerText === '😔'){
        smallSmile.innerText = '🤕'
      }
      else if(smallSmile.innerText === '😑') {
        smallSmile.innerText = '😔'
      }
      else if (smallSmile.innerText === '🙂'){
        smallSmile.innerText = '😑'
      }
      else{
        smallSmile.innerText ='🙂'
        smallSmile.id = "small-smile"
        let objectsDiv = document.querySelector("#objects")
        objectsDiv.append(smallSmile)
      }
    }
}


function interval6(words, user, intervalCount, form){
    const result5 = words.filter(word => word === "nut")
    if(result5.length !== 1){
      if (smallSmile.innerText === '💀'){
        smallSmile.innerText = '💀'
      }
      else if (smallSmile.innerText === '🤕'){
        smallSmile.innerText = '💀'
        endGame(user, intervalCount, form)
      }
      else if (smallSmile.innerText === '😔'){
        smallSmile.innerText = '🤕'
      }
      else if(smallSmile.innerText === '😑') {
        smallSmile.innerText = '😔'
      }
      else if (smallSmile.innerText === '🙂'){
        smallSmile.innerText = '😑'
      }
      else{
        smallSmile.innerText ='🙂'
        smallSmile.id = "small-smile"
        let objectsDiv = document.querySelector("#objects")
        objectsDiv.append(smallSmile)
      }
    }
}


function interval7(words, user, intervalCount, form){
    const result5 = words.filter(word => word === "water")
    if(result5.length !== 1){
      if (smallSmile.innerText === '💀'){
        smallSmile.innerText = '💀'
      }
      else if (smallSmile.innerText === '🤕'){
        smallSmile.innerText = '💀'
        endGame(user, intervalCount, form)
      }
      else if (smallSmile.innerText === '😔'){
        smallSmile.innerText = '🤕'
      }
      else if(smallSmile.innerText === '😑') {
        smallSmile.innerText = '😔'
      }
      else if (smallSmile.innerText === '🙂'){
        smallSmile.innerText = '😑'
      }
      else{
        smallSmile.innerText ='🙂'
        smallSmile.id = "small-smile"
        let objectsDiv = document.querySelector("#objects")
        objectsDiv.append(smallSmile)
      }
    }
}


function interval8(words, user, intervalCount, form){
    const result5 = words.filter(word => word === "kick")
    if(result5.length !== 1){
      if (smallSmile.innerText === '💀'){
        smallSmile.innerText = '💀'
      }
      else if (smallSmile.innerText === '🤕'){
        smallSmile.innerText = '💀'
        endGame(user, intervalCount, form)
      }
      else if (smallSmile.innerText === '😔'){
        smallSmile.innerText = '🤕'
      }
      else if(smallSmile.innerText === '😑') {
        smallSmile.innerText = '😔'
      }
      else if (smallSmile.innerText === '🙂'){
        smallSmile.innerText = '😑'
      }
      else{
        smallSmile.innerText ='🙂'
        smallSmile.id = "small-smile"
        let objectsDiv = document.querySelector("#objects")
        objectsDiv.append(smallSmile)
      }
    }
}


function interval9(words, user, intervalCount, form){
    const result5 = words.filter(word => word === "umbrella")
    if(result5.length !== 1){
      if (smallSmile.innerText === '💀'){
        smallSmile.innerText = '💀'

      }
      else if (smallSmile.innerText === '🤕'){
        smallSmile.innerText = '💀'
        endGame(user, intervalCount, form)
      }
      else if (smallSmile.innerText === '😔'){
        smallSmile.innerText = '🤕'
        youWin(user, intervalCount, form)
      }
      else if(smallSmile.innerText === '😑') {
        smallSmile.innerText = '😔'
        youWin(user, intervalCount, form)
      }
      else if (smallSmile.innerText === '🙂'){
        smallSmile.innerText = '😑'
        youWin(user, intervalCount, form)
      }
      else{
        smallSmile.innerText ='🙂'
        smallSmile.id = "small-smile"
      let objectsDiv = document.querySelector("#objects")
      objectsDiv.append(smallSmile)
      youWin(user, intervalCount, form)
      }
    } else if (result5.length === 1){
      youWin(user, intervalCount, form)
    }
    
}


function endGame(user, intervalCount, form){
  clearInterval(intervalCount)
  
  // form.innerHTML = ""
  containerImage.src = "/Users/admin/Development/code/javascript-game/front-end/images/gameover-pic.png"
  objectsDiv.innerHTML =""
  // nameForm.style.visibility = "visible"

  appendName.innerHTML = ""
  const playAgain = document.createElement("button")
  playAgain.innerText = "Play Again"
  appendName.append(playAgain)
  form.style.visibility = "hidden"
  
  yourScore.innerText = `Your score: ${Number(counter.innerText) * 1000}`
  appendScore.append(yourScore)

  
  postGame(user)

  playAgain.addEventListener("click", ()=>pageRefresh(playAgain))
    
}


function youWin(user, intervalCount, form){
  
  clearInterval(intervalCount)
  // form.innerHTML = ""
  containerImage.src = "/Users/admin/Development/code/javascript-game/front-end/images/youwin-pic.png"
  // nameForm.style.visibility = "visible"
  appendName.innerHTML = ""

  // nameForm.addEventListener("submit", (e)=> postUserThenRender(e))
  const playAgain = document.createElement("button")
  playAgain.innerText = "Play Again"
  appendName.append(playAgain)
  form.style.visibility = "hidden"

  yourScore.innerText = `Your score: ${Number(counter.innerText) * 1000}`
  appendScore.append(yourScore)

  postGame(user)

  playAgain.addEventListener("click", ()=>pageRefresh(playAgain))
  
}

function pageRefresh(playAgain){
  playAgain.remove()
  location.reload()
}


function postGame(user){
  let gameDetails = {
    score: `${Number(counter.innerText) * 1000}`,
    user_id: user.id
  }

  let gameObj = {
    game: gameDetails
  }
  

  post(gamesUrl, gameObj)
  .then(game => renderScores(game))
}

document.body.onload = getGames

nameForm.addEventListener("submit", (e)=> postUserThenRender(e))