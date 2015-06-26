/////////////////////////////////////////////////////////
/// Variables
/////////////////////////////////////////////////////////

var hangedMan, storedWord, storedLetter, hint;

var storedWordDone = false;

var Ahorcado = function(canvas) {
  this.scenario = canvas;
  this.topAttempt = 5;
  this.numAttempt = 0;
  this.alive = true;
  this.draw();
}

/////////////////////////////////////////////////////////
/// Main Function
/////////////////////////////////////////////////////////

function main() {
  var canvas = document.getElementById('canvas').getContext('2d');
  hangedMan = new Ahorcado(canvas);
  var letter = document.getElementById('letter');
  var btnLetter = document.getElementById('btnLetter');
  var word = document.getElementById('word');
  var btnWord = document.getElementById('btnWord');

  btnWord.addEventListener('click', storeWord);
  btnLetter.addEventListener('click', storeLetter);
}

/////////////////////////////////////////////////////////
/// Class 'Ahorcado' Functions
/////////////////////////////////////////////////////////

Ahorcado.prototype.tracker = function() {
  this.numAttempt++;
  this.draw();
  if (this.numAttempt >= this.topAttempt) {
    this.alive = false;
    alert('Perdiste');
  }
}

Ahorcado.prototype.draw = function() {
  var scenario = this.scenario;

  scenario.beginPath();
  scenario.moveTo(150,100);
  scenario.lineTo(150,50);
  scenario.lineTo(400,50);
  scenario.lineTo(400,350);
  scenario.lineWidth = 20;
  scenario.strokeStyle = "black";
  scenario.stroke();
  scenario.closePath();

  if (this.numAttempt > 0) {
    scenario.beginPath();
    scenario.arc(150, 140, 40, 0, Math.PI * 2, false);
    scenario.strokeStyle = "red";
    scenario.lineWidth = 5;
    scenario.stroke();
    scenario.closePath();

    if (this.numAttempt > 1) {
      scenario.beginPath();
      scenario.moveTo(150,180);
      scenario.lineTo(150,250);
      scenario.strokeStyle = "red";
      scenario.lineWidth = 5;
      scenario.stroke();
      scenario.closePath();

      if (this.numAttempt > 2) {
        scenario.beginPath();
        scenario.moveTo(120,225);
        scenario.lineTo(150,185);
        scenario.lineTo(180,225);
        scenario.strokeStyle = "red";
        scenario.lineWidth = 5;
        scenario.stroke();
        scenario.closePath();

        if (this.numAttempt > 3) {
          scenario.beginPath();
          scenario.moveTo(120,290);
          scenario.lineTo(150,250);
          scenario.lineTo(180,290);
          scenario.strokeStyle = "red";
          scenario.lineWidth = 5;
          scenario.stroke();
          scenario.closePath();

          if (this.numAttempt > 4) {
            scenario.beginPath();
            scenario.moveTo(125,120);
            scenario.lineTo(145,145);
            scenario.moveTo(145,120);
            scenario.lineTo(125,145);
            scenario.moveTo(155,120);
            scenario.lineTo(175,145);
            scenario.moveTo(175,120);
            scenario.lineTo(155,145);
            scenario.strokeStyle = "blue";
            scenario.lineWidth = 5;
            scenario.stroke();
            scenario.closePath();
          }
        }
      }
    }
  }
}

/////////////////////////////////////////////////////////
/// Functions
/////////////////////////////////////////////////////////

function setFocusWord() {
    document.getElementById("word").focus();
}

function setFocusLetter() {
    document.getElementById("letter").focus();
}

function storeWord(){
  storedWord = word.value;
  storedWord = storedWord.toUpperCase();
  word.value = '';
  setFocusWord();
  storedWordDone = true;
  hint = new Array(storedWord.length);
  console.log(storedWord);
}

function storeLetter(){
  storedLetter = letter.value;
  storedLetter = storedLetter.toUpperCase();
  letter.value = '';
  setFocusLetter();
  console.log(storedLetter);
  if (storedWordDone) {
    check(storedLetter, storedWord, hangedMan);
    fullHint(hint);
  } else {
    alert('First choose a word and submit it');
  }
}

function check(storedLetter, storedWord, hangedMan){
  var founded = false;

  for (var i = 0; i < storedWord.length; i++ ) {
    if (storedWord[i] == storedLetter) {
      hint[i] = storedLetter;
      founded = true;
    }
  }
  if (!founded) {
    hangedMan.tracker();
  }
}

function fullHint(hint){
  var showedHint = document.getElementById('hint');
  var storedHint = "";

  for (var i = 0; i < hint.length; i++) {
    if (hint[i] != undefined) {
      storedHint += hint[i] + " ";
    } else {
      storedHint += "_ "
    }
  }
  showedHint.innerText = storedHint;
}
