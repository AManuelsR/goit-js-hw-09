const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const intervalo = 1000;
let tiempo = "";
btnStop.disable = true;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function Iniciar (){
    btnStart.disable = true;
    btnStart.getElementsByClassName.opacity = 0.5;
    btnStop.disable = false;

    tiempo = setInterval(()=> {
        document.body.style.backgroundColor = getRandomHexColor();
    }, intervalo);
}

function parar (){
    btnStart.disable = false;
    btnStart.style.opacity = 1;
    btnStop.disable = true;

    clearInterval(tiempo);
}

btnStart.addEventListener("click", Iniciar);
btnStop.addEventListener("click", parar)