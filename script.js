let randomAngle = 0;
let g = 0;

function start(){
    g=0;
    draw();
}

window.onload = start();
document.addEventListener('keypress', (event)=>{
    if (event.key == "Enter"){
        guess();
    }
})

function draw(){
    randomAngle = getRandomInt(30, 330);
    console.log(randomAngle + " stopni");
    let angleStartPosX = document.querySelector('#canvas').width/2;
    let angleStartPosY = document.querySelector('#canvas').height/2;
    let x = angleStartPosX;
    let y = angleStartPosY;
    let dir = randomAngle-getRandomInt(0, 180);
    let startDir = dir;

    for (let i = 0; i<200; i++){
        x+=Math.sin(dir*(Math.PI/180));
        y-=Math.cos(dir*(Math.PI/180));
    }
    drawLine(angleStartPosX, angleStartPosY, x, y);

    dir-=360-randomAngle;
    x = angleStartPosX;
    y = angleStartPosY;

    for (let i = 0; i<200; i++){
        x+=Math.sin(dir*(Math.PI/180));
        y-=Math.cos(dir*(Math.PI/180));
    }
    drawLine(angleStartPosX, angleStartPosY, x, y);

    let arcOffset = 20;
    drawArc(angleStartPosX, angleStartPosY, 40, (startDir+270)*(Math.PI/180), (dir+270)*(Math.PI/180))

    drawCircle(angleStartPosX, angleStartPosY, 5);
}

function drawArc(x, y, width, startAngle, endAngle){
    const canvas = document.querySelector('#canvas');
    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.arc(x, y, width, startAngle, endAngle);
    ctx.stroke();
}

function drawCircle(x, y, width){
    const canvas = document.querySelector('#canvas');
    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(x, y, width, 0, 2 * Math.PI);
    ctx.fill();
}

function drawLine(x1, y1, x2, y2){
    const canvas = document.querySelector('#canvas');

    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');

    // set line stroke and line width
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;

    // draw a red line
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function clearCanvas(){
    const canvas = document.querySelector('#canvas');
    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');

    ctx.reset();
    display.innerHTML = "";
}

function guess(){
    g++;
    const canvas = document.querySelector('#canvas');
    const inputfield = document.getElementById("input");
    const display = document.getElementById("display");
    let value = inputfield.value;
    let symbol = "";
    let clueText = "";

    if (value==""){
        return;
    }
    value = Number(value);
    if (!(value < 361 && value > -1)){
        inputfield.value = "";
        return;
    }

    if (randomAngle>value){
        symbol="⬆️";
    } else if(randomAngle<value){
        symbol = "⬇️";
    } else{
        symbol = "🥳";
    }

    if (Math.abs(randomAngle-value)<5){
        clueText = "Boiling!🔥";
        if (Math.abs(randomAngle-value)==0){
            clueText = "🎉🎉🎉";
        }
    } else if (Math.abs(randomAngle-value)<15){
        clueText = "Hot!";
    } else{
        clueText = "Cold!";
    }

    let content = `<div class="guesses">
    <div class="guess">` + value + `°</div>
    <div class="guess">` + symbol + `</div>
    <div class="guess">` + clueText + `</div>
    </div>`;

    display.innerHTML+=content;
    inputfield.value = "";

    if (randomAngle==value){
        clear(value);
    }
}

async function clear(a){
    await new Promise(r => setTimeout(r, 100));
    alert("🎉 " + a + "° 🎉");
    clearCanvas();
    start();
}