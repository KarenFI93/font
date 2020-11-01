// Add your javascript here , para efecto en el texto principal de H1
$(document).ready(function () {
  animateForever();
});

function animateForever() {
  var div = $("h1");
  var color1 = "#FEFEFE";
  var color2 = "#21F765";

  div.animate({ color: color1 }, 1000, function () {
    div.animate({ color: color2 }, 1000, function () {
      animateForever();
    });
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".panel-tablero");
  const scoreDisplay = document.getElementById("score-text");
  const width = 7;
  const squares = [];
  let score = 0;
  let moves=0;

  const candyColors = [
    "url(image/1.png)",
    "url(image/2.png)",
    "url(image/3.png)",
    "url(image/4.png)",
  ];

  //create your board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("draggable", true);
      square.setAttribute("id", i);
      let randomColor = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundImage = candyColors[randomColor];
      grid.appendChild(square);
      squares.push(square);
    }
  }
  createBoard();

  // Dragging the Candy
  let colorBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;

  squares.forEach((square) => square.addEventListener("dragstart", dragStart));
  squares.forEach((square) => square.addEventListener("dragend", dragEnd));
  squares.forEach((square) => square.addEventListener("dragover", dragOver));
  squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
  squares.forEach((square) => square.addEventListener("drageleave", dragLeave));
  squares.forEach((square) => square.addEventListener("drop", dragDrop));

  function dragStart() {
    colorBeingDragged = this.style.backgroundImage;
    squareIdBeingDragged = parseInt(this.id);
    // this.style.backgroundImage = ''
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragLeave() {
    this.style.backgroundImage = "";
  }

  function dragDrop() {
    colorBeingReplaced = this.style.backgroundImage;
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundImage = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
  }

  function dragEnd() {
    //What is a valid move?
	moves++;
	document.getElementById("movimientos-text").innerHTML =  moves;
	
    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width,
    ];
    let validMove = validMoves.includes(squareIdBeingReplaced);

    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null;
    } else if (squareIdBeingReplaced && !validMove) {
      squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    } else
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
  }

  //drop candies once some have been cleared
function moveIntoSquareBelow() {
  for (i = 0; i < 40; i ++) {
      if(squares[i + width].style.backgroundImage === '') {
          squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
          squares[i].style.backgroundImage = ''
          const firstRow = [0, 1, 2, 3, 4, 5, 6]
          const isFirstRow = firstRow.includes(i)
          if (isFirstRow && (squares[i].style.backgroundImage === '')) {
            let randomColor = Math.floor(Math.random() * candyColors.length)
            squares[i].style.backgroundImage = candyColors[randomColor]
          }
      }
  }
}

///Checking for Matches
//for row of Four
function checkRowForFour() {
  for (i = 0; i < 45; i ++) {
    let rowOfFour = [i, i+1, i+2, i+3]
    let decidedColor = squares[i].style.backgroundImage
    const isBlank = squares[i].style.backgroundImage === ''

    const notValid = [5, 6, 12, 13, 19, 20, 26, 27, 33, 34, 40, 41, 47,48]
    if (notValid.includes(i)) continue

    if(rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
      score += 4
      scoreDisplay.innerHTML = score
      rowOfFour.forEach(index => {
      squares[index].style.backgroundImage = ''
      })
    }
  }
}
checkRowForFour()

//for column of Four
function checkColumnForFour() {
  for (i = 0; i < 24; i ++) {
    let columnOfFour = [i, i+width, i+width*2, i+width*3]
    let decidedColor = squares[i].style.backgroundImage
    const isBlank = squares[i].style.backgroundImage === ''

    if(columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
      score += 4
      scoreDisplay.innerHTML = score
      columnOfFour.forEach(index => {
      squares[index].style.backgroundImage = ''
      })
    }
  }
}
checkColumnForFour()


 //for row of Three
  function checkRowForThree() {
    for (i = 0; i < 46; i ++) {
      let rowOfThree = [i, i+1, i+2]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      const notValid = [6, 13, 20, 27, 34, 41, 48]
      if (notValid.includes(i)) continue

      if(rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        score += 3
        scoreDisplay.innerHTML = score
        rowOfThree.forEach(index => {
        squares[index].style.backgroundImage = ''
        })
      }
    }
  }
  checkRowForThree()

//for column of Three
  function checkColumnForThree() {
    for (i = 0; i < 32; i ++) {
      let columnOfThree = [i, i+width, i+width*2]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      if(columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        score += 3
        scoreDisplay.innerHTML = score
        columnOfThree.forEach(index => {
        squares[index].style.backgroundImage = ''
        })
      }
    }
  }
checkColumnForThree()


// Checks carried out indefintely - Add Butotn to clear interval for best practise
window.setInterval(function(){
  checkRowForFour()
  checkColumnForFour()
  checkRowForThree()
  checkColumnForThree()
  moveIntoSquareBelow()
}, 100);

});


var cronometro;

//para cambiar texto de botón y recargar página
$(".btn-reinicio").click(function () {
  uno = document.getElementById("reinicio");
  if (uno.innerHTML == "Iniciar")
	  uno.innerHTML = "Reiniciar";
  else location.reload();

  if (uno.innerHTML == "Reiniciar")
  contador_s = 00;
  contador_m = 02;
  s = document.getElementById("seconds");
  m = document.getElementById("minutes");

  cronometro = setInterval(function () {
    if (contador_s == 0) {
      contador_s = 59;
      contador_m--;
      if (contador_m < 10) m.innerHTML = "0" + contador_m;
      else m.innerHTML = contador_m;
    }

    if (contador_s < 10) s.innerHTML = "0" + contador_s;
    else s.innerHTML = contador_s;
    contador_s--;

    Total_secs = contador_s;
    Total_mins = contador_m;

    if (contador_m == 0 && contador_s == 0) {
      clearInterval(cronometro);

      $(".panel-tablero").remove();
      $(".time").remove();

      $("#mensaje").show();
      $("#mensaje").text("Juego Terminado");

      $(".score").parent().css({ position: "relative" });
      $(".score").css({ width: 400 + "%", position: "absolute" });

      $(".moves").parent().css({ position: "relative" });
      $(".moves").css({ top: 200, position: "absolute" });
      $(".moves").css({ width: 400 + "%", position: "absolute" });

      $(".buttons").parent().css({ position: "relative" });
      $(".buttons").css({ bottom: 220, position: "absolute" });
	  $(".buttons").css({ width: 400 + "%", position: "absolute" });
	  
	  
    }
  }, 1000);
});

