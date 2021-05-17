// выбор нужного объекта
const canvas = document.getElementById("game");
// формат игры 2d
const ctx = canvas.getContext("2d");
// отображаем игровое поле
const ground = new Image();
ground.src = "img/ground.png"; // вызов нужной картинки 

const foodImg = new Image();
foodImg.src = "img/food.png"; // вызов нужной картинки 

let box = 32; // наш квадратик 32*32

let score = 0; // хранит счёт игры

let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box,
};

// кординаты змейки
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};
// обработчик событий при ножатии на стрелочки
document.addEventListener("keydown", direction);

 
let dir;

// на какую клавишу нажали
function direction(event) {
  if(event.keyCode == 37 && dir != "right")
    dir = "left";
  else if(event.keyCode == 38 && dir != "down")
    dir = "up";
  else if(event.keyCode == 39 && dir != "left")
    dir = "right";
  else if(event.keyCode == 40 && dir != "up")
    dir = "down";
}

// нельзя есть саму себя
function eatTail(head, arr) {
  for(let i = 0; i < arr.length; i++) {
    if(head.x == arr[i].x && head.y == arr[i].y)
     {

     clearInterval(game);
     alert("Вы проиграли");
  }
  }
}
// рисует картинки в блоке
function drawGame() {
  // клубника (в разных появляется местах)
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);

// змейка
  for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "white" : "black"; 
    ctx.fillRect(snake[i].x, snake[i].y, box, box); //квадрат
  }
  // текст - кол во баллов 
  ctx.fillStyle = "white";
  ctx.font = "40px Arial";
  ctx.fillText(score, box * 2.5, box * 1.7);
  
  // координату первого эл-та змейки
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // чтобы змейка могла кушать еду
  if(snakeX == food.x && snakeY == food.y) {
    score++; //добавляем счёт
    // новое место клубники 
    food = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box,
    };
  } else {
    // удаляем последний элемент в массиве
    snake.pop();
  }
  //если выходит за лужайку змейка останавливается
  if(snakeX < box || snakeX > box * 17
    || snakeY < 3 * box || snakeY > box * 17)
  {

     clearInterval(game);
     alert("Вы проиграли");
  }
   


  if(dir == "left") snakeX -= box;
  if(dir == "right") snakeX += box;
  if(dir == "up") snakeY -= box;
  if(dir == "down") snakeY += box;


  let newHead = {
    x: snakeX,
    y: snakeY
  };

// вызываем функцию змейка ест себя
  eatTail(newHead, snake);

  snake.unshift(newHead);
}
//как часто вызываем функцию прорисовки
let game = setInterval(drawGame, 300);






//
