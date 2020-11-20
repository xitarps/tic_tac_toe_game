let player = 'player';
let quadrados = document.querySelectorAll('.cell');

let availableSquares = ['0','1','2','3','4','5','6','7','8'];

let turnMessage = document.querySelector('#jogador-selecionado');

let inGame = true;


window.onload = ()=>{
  setSquaresListeners();
  showWhoseTurn();
  setRestartBtntnListener()
}




function escolherQuadrado(square){
  //console.log(square.id.split('_').pop()));
  setSquareValue(square,player,inGame);
  return square;
}

function setSquaresListeners(){

  quadrados.forEach(quadrado=>{
    quadrado.addEventListener('click',()=>{
      escolherQuadrado(quadrado)
    });
  })
}

function setSquareValue(square, whoIsPlaying, ingame){
  if(ingame){
    if(whoIsPlaying == 'player'){
      if(!square.selected){
        square.innerHTML = 'X';
        square.selected = true;
        player = 'cpu';
        square_id = Number(square.id.split('_').pop())-1
        availableSquares.splice(availableSquares.indexOf(`${square_id}`),1)
        checkIfWon('X');
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
          checkIfWon('O');
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
        trying=false;
        break;
      }
    }while(trying)
    setSquareValue(quadrados[random], 'cpu',inGame);
  }
}

function showWhoseTurn(){
  turnMessage.innerHTML = (player == 'player')? 'Player' : 'Cpu';
}

function checkIfWon(symbol){
  let row1 = [];
  let row2 = [];
  let row3 = [];
  quadrados.forEach(item=>{
    if(row1.length < 3){
      row1.push(item.innerHTML)
    }else if(row2.length < 3){
      row2.push(item.innerHTML)
    }else{
      row3.push(item.innerHTML)
    }
  });
  // console.log(row1);
  // console.log(row2);
  // console.log(row3);

  let row1Count = row1.filter(value=>value==symbol).length
  let row2Count = row2.filter(value=>value==symbol).length
  let row3Count = row3.filter(value=>value==symbol).length

  let col1Count = (((row1[0] == symbol)? symbol: '')+
                   ((row2[0] == symbol)? symbol: '')+
                   ((row3[0] == symbol)? symbol: '')).length;

  let col2Count = (((row1[1] == symbol)? symbol: '')+
                   ((row2[1] == symbol)? symbol: '')+
                   ((row3[1] == symbol)? symbol: '')).length;

  let col3Count = (((row1[2] == symbol)? symbol: '')+
                   ((row2[2] == symbol)? symbol: '')+
                   ((row3[2] == symbol)? symbol: '')).length;


  let slashCount = (((row1[2] == symbol)? symbol: '')+
                    ((row2[1] == symbol)? symbol: '')+
                    ((row3[0] == symbol)? symbol: '')).length;

  let backslashCount = (((row1[0] == symbol)? symbol: '')+
                        ((row2[1] == symbol)? symbol: '')+
                        ((row3[2] == symbol)? symbol: '')).length;

  let possibilities = [row1Count, row2Count, row3Count, col1Count,
                       col2Count,col3Count,slashCount,backslashCount];

  let won = false;

  for (let i = 0; i < possibilities.length; i++) {
    console.log('possibility: ',possibilities[i]);
    if(possibilities[i] >= 3){
      won = true;
      break;
    }else{
      won = false;
    }
  }
  

  console.log(possibilities);
  console.log(symbol);
  console.log(won);
  if(won){
    if(symbol == 'X'){
      showWinner('Player Won!')
    }else{
      showWinner('Cpu Won!')
    }
    inGame = false
  }
  
}

function showWinner(who){
  document.querySelector('#vencedor-selecionado').innerHTML = who
}

function restart(){
  console.log('restarting...')
  showWinner('...')
  quadrados.forEach(quadrado=>{
    quadrado.innerHTML = '';
    quadrado.selected = false;
  });
  availableSquares = ['0','1','2','3','4','5','6','7','8'];
  inGame = true;
  showWhoseTurn();
  if(player != 'player'){cpuMove(); player = 'player';}
}

function setRestartBtntnListener(){
  document.querySelector('#btn').addEventListener('click', restart)
}