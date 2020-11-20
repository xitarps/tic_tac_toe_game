let player = 'player';
let quadrados = document.querySelectorAll('.cell');

let availableSquares = ['0','1','2','3','4','5','6','7','8'];

let turnMessage = document.querySelector('#jogador-selecionado');



window.onload = ()=>{
  setSquaresListeners();
  showWhoseTurn();
}




function escolherQuadrado(square){
  //console.log(square.id.split('_').pop()));
  setSquareValue(square,player);
  return square;
}

function setSquaresListeners(){

  quadrados.forEach(quadrado=>{
    quadrado.addEventListener('click',()=>{
      escolherQuadrado(quadrado)
    });
  })
}

function setSquareValue(square, whoIsPlaying, ingame=true){
  if(ingame){
    if(whoIsPlaying == 'player'){
      if(!square.selected){
        square.innerHTML = 'X';
        square.selected = true;
        player = 'cpu';
        square_id = Number(square.id.split('_').pop())-1
        availableSquares.splice(availableSquares.indexOf(`${square_id}`),1)
        showWhoseTurn();
        cpuMove();
      }
    }else{
      setTimeout(() => {
        if(!square.selected){
          square.innerHTML = 'O';
          square.selected = true;
          player = 'player';
          square_id = Number(square.id.split('_').pop())-1
          availableSquares.splice(availableSquares.indexOf(`${square_id}`),1)
          showWhoseTurn()
        }
      }, 1200);
    }
  }
}

function cpuMove(){
  let random;
  if(availableSquares.length > 0){
    let trying = true;
    do{
      random = Math.ceil(Math.random()*9)-1;
      if(availableSquares.includes(String(random))){
        console.log('try: ',random)
        trying=false;
        break;
      }
    }while(trying)
    setSquareValue(quadrados[random], 'cpu');
  }
}

function showWhoseTurn(){
  turnMessage.innerHTML = (player == 'player')? 'Player' : 'Cpu';
}