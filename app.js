let boxes = document.querySelectorAll(".box");
let resetbtn =document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX , playerO
let palyerType = true;
const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

document.getElementById("Player").addEventListener("click", function (e) {
  e.preventDefault();

  palyerType = false;
});
document.getElementById("mycomputer").addEventListener("click", function (e) {
  e.preventDefault();

  palyerType = true;
});

const resetGame = () => {
  turnO = true;
  anableBoxes();
  msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click",() => {
      if(turnO == true){
        //player O
        box.innerText = "O";
        turnO = false;
        palyerType && randomClick();
      } else {
        //player X
        box.innerText ="X";
        
        turnO = true;
      }
      box.disabled = "true";

      checkWinner();
    });
});


const randomClick = ()=>{

  let clickedZeros = Array.prototype.slice.call(boxes)
    .map((d, i) => ({ el: d, index: i }))
    .filter(item => item.el.innerText == "O" || item.el.innerText == "X")
    .map(item => item.index);

  let random = getRandomExcluding(clickedZeros);
  console.log(random)
  random!=undefined && boxes[random].click();
}
const getRandomExcluding = (excluded)=> {
  //const excluded = [1, 4, 6];
  const allowed = [];

  for (let i = 0; i < 9; i++) {
    if (!excluded.includes(i)) {
      allowed.push(i);
    }
  }

  const randomIndex = Math.floor(Math.random() * allowed.length);
  return allowed[randomIndex];
}


const disableBoxes = () => {
  for(let box of boxes) {
    box.disabled =true;
  }
}

const anableBoxes = () => {
  for(let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}

const showWinner = (winner) => {
  msg.innerText = `Congrtulations, Winner is  ${winner}`; 
  msgContainer.classList.remove("hide");
  disableBoxes();
}

const checkWinner = () => {
  for(let pattern of winPattern) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
      if(pos1Val ==pos2Val && pos2Val==pos3Val){
        showWinner(pos1Val);
      }
    }
  }
};



newGameBtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame)