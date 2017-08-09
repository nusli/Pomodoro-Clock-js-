var bTime = 5, sTime = 25, timeLeft, cd, isRunning = false,     hasStarted = false, circleCD, current = "grow", colorInt,
    clocktime = document.getElementById("clocktime"),
    innerCircle = document.getElementById("circle2"),
    sessiontime = document.getElementById("sessiontime"),
    breaktime = document.getElementById("breaktime"),
    audio = document.getElementById('audio');
// Eventlisteners
document.getElementById("msession").addEventListener("click", reduceSess);
document.getElementById("psession").addEventListener("click", incrSess);
document.getElementById("mbreak").addEventListener("click", reduceBreak);
document.getElementById("pbreak").addEventListener("click", incrBreak);
document.getElementsByTagName("svg")[0].addEventListener("click", checkCountdown);
document.getElementById("reset").addEventListener("click", resetCD);

// start countdown when app has loaded
window.onload = function(){
    changeColor();
    startCountdown(sTime);
    audio.play();
};

//increase + reduce functions
function reduceSess() {
  if(sTime > 1 ) {
    sTime -= 1;
    sessiontime.innerHTML = sTime;
    clocktime.innerHTML = sTime + ":00";
  }
}
function incrSess() {
  if(sTime < 90 ) {
    sTime++;
    sessiontime.innerHTML = sTime;
    clocktime.innerHTML = sTime + ":00";
  }
}
function reduceBreak() {
  if(bTime >1){
    bTime--
    breaktime.innerHTML = bTime;
  }
}
function incrBreak() {
  if(bTime < 90){
    bTime++
    breaktime.innerHTML = bTime;
  }
}

// checks current state of countdown
function checkCountdown () {
  if(!hasStarted) startCountdown(sTime);
  else if (!isRunning) resumeCountdown();
  else pauseCountdown();
} 
    
  function startCountdown (time) {
    hasStarted = true;
    isRunning = true;
    timeLeft = time * 60;
    countdown();
    cd = window.setInterval(countdown, 1000);
    if(current === "grow") {
      circleCD = setInterval(grow, sTime*600);
    } else {
      circleCD = setInterval(shrink, bTime*600);
    }
    colorInt = setInterval(changeColor, 10000);
 }   
  function pauseCountdown () {
    isRunning = false;
    window.clearInterval(cd);
    window.clearInterval(circleCD);
    window.clearInterval(colorInt);
  }
  function resumeCountdown() {
    isRunning = true;
    cd = window.setInterval(countdown, 1000);
    if(current === "grow") {
      circleCD = setInterval(grow, sTime*600);
    } else {
      circleCD = setInterval(shrink, bTime*600);
    }
    colorInt = setInterval(changeColor, 10000);
  }
function resetCD() {
  clearInterval(cd);
  clearInterval(circleCD);
  window.clearInterval(colorInt);
  innerCircle.setAttribute("r", 2);
  current = "grow";
  clocktime.innerHTML = sTime + ":00";
  hasStarted = false;
  isRunning = false;
}

function grow() {
  var radius = parseInt(innerCircle.getAttribute("r"));
  radius++;
  innerCircle.setAttribute("r", radius);
}
function shrink() {
  var radius = parseInt(innerCircle.getAttribute("r"));
  radius--;
  innerCircle.setAttribute("r", radius);
}

function countdown() {
  timeLeft--;
  var min = Math.floor(timeLeft/60);
  var sec = timeLeft%60;
  if(sec<10) {
    clocktime.innerHTML = min + ":0" + sec;
  } else {
  clocktime.innerHTML = min + ":" +sec;
  }
  if(timeLeft === 0 && current === "grow") {
    audio.play();
    clearInterval(cd);
    clearInterval(circleCD);
    window.clearInterval(colorInt);
    current = "shrink"
    clocktime.innerHTML = bTime + ":00";
    setTimeout(function(){startCountdown(bTime);}, 1000)
   } else if (timeLeft === 0 && current === "shrink") {
      audio.play();
      resetCD();
   }
}

function changeColor() {
  var color1 = ["#66ff33", "#cc33ff", "#cc6600", "#00ff99", "#00ffff", "#ff5050", "#ff0000", "#0099ff", "#33ccff", "#33ccff", "#ffffff", "#9933ff", "#993333", "#ff0000"];
  var color2 = ["#cccc00", "#3333ff", "#3333ff", "#000066", "#9966ff", "#99ccff", "#ffcc00", "#ccff66", "#ffff00", "#ffffff", "#444444", "#66ff66", "#ffccff", "#ffff00"];
  var i = Math.floor(Math.random()*color1.length);
  document.getElementById("circle1").style.stroke = color1[i];
  document.getElementById("stop1").style.stopColor = color1[i];
  document.getElementById("stop2").style.stopColor = color2[i];
}

