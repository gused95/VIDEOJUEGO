// --------------   MICHI CATCH -----------------

let btnStart = document.querySelector(".start"); // Para el botón de START

btnStart.addEventListener("click", () => {
    console.log("ready, set ... Go Michi !!");
    clearInterval(idInterval);
    iniciarJuego();
  });

// idInterval 
let idInterval;



// Imagenes
const fondo = new Image();
fondo.src = "images/refri.jpg";

const pataImg = new Image();
pataImg.src ="images/huellita1.png";

const pezImg = new Image();
pezImg.src ="images/pescado.png"

const poshoImg = new Image();
poshoImg.src = "images/posho.png"


// 1.-Seleccionar canvas
let lienzo = document.getElementById("lienzo");
let ctx = lienzo.getContext("2d");
// w 400 h 600


//Lista de enemigos y otros elementos

const comida = [];
const rotten = [];
const vida = [];


//      MICHI --> class

class Michi {
    constructor(x, y, w, h, color, vida, imagen) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.vida = vida;
        this.imagen = imagen;
        this.alegria = 0;
        
    }
    derecha(){
        // LIMITE DE AVANCE DER.
        if(this.x + this.w < 350){
            this.x += 30; //PASO
        }
        
    }
    izquierda(){
        //  LIMITE DE AVANCE IZQ.
        if(this.x > 30){
            this.x -= 30;
        }
        
    }
    dibujarse(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h);
    }
    morirse(){}

}


// ENEMIGO ------------->   PEZ

class Pez extends Michi {
    constructor(x, y, w, h, color, vida, imagen) {
        super(x, y, w, h, color, vida, imagen);
    }
    dibujarse() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h);
        
        const num = Math.floor(Math.random() * 5); // genera num. aleatorios
        this.y += num;
    }
}

// PUNTOS ------------->   POSHO

class Posho extends Michi {
    constructor(x, y, w, h, color, vida, imagen) {
        super(x, y, w, h, color, vida, imagen);
    }
    dibujarse() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h);
        
        const num = Math.floor(Math.random() * 5); // genera num. aleatorios
        this.y += num;
    }
}

//  DIBUJAR FONDO

function dibujarFondo() {
    ctx.fillStyle = "brown";
    ctx.fillRect(0, 0, 400, 600);
    ctx.drawImage(fondo,50, 50, 300, 500);
}


// MOSTRAR DATOS: ---> NOMBRE DEL JUEGO, MICHI'S LIFE, 

function mostrarDatos(alegria,vida) { 
    //Estilo
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    //vida
    ctx.fillText(`Michi's life: ${vida}`, 10, 30);
    // hambre
    ctx.fillText(`Hunger bar: ${alegria}`, 230, 30);
    // michiPuntos
    // ctx.fillText("MP:", 10, 70); // DISABLED !!
    // vida, hambre, puntos

}


// ESCUCHAR TECLAS

function teclas(micho) {
    //Recibimos un evento
    document.addEventListener("keyup", (evento) => {
      // console.log("Tecla tocada", evento.code);
      switch (evento.code) {
        // case "KeyF":
        //   micho.disparar();
        //   break;
        case "ArrowRight":
          micho.derecha();
          break;
        case "ArrowLeft":
          micho.izquierda();
          break;
      }
    });
  }


//   CREAR ENEMIGOS

function crearPez(){
    const num = Math.floor(Math.random() * 100); // genera num. aleatorios
    const num2 = Math.floor(Math.random() * 300); // genera num. aleatorios para el eje X
    if (num === 3 && num2 > 50){
        const pez = new Pez (num2, 90, 40, 40, "rgba(0, 255, 0, 0.6)",0,pezImg);
        rotten.push(pez); // Envia un elemento al array rotten
    }
};

//   CREAR POSHITO

function crearPosho(){
    const num = Math.floor(Math.random() * 100); // genera num. aleatorios
    const num2 = Math.floor(Math.random() * 300); // genera num. aleatorios para el eje X

    if (num === 3 && num2 >= 50){
        const posho = new Posho (num2, 90, 40, 40, "rgba(0, 0, 255, 0.6)", "", poshoImg);
        comida.push(posho); // Envia un elemento al array comida
    }
};


function iniciarJuego() {

    const michi = new Michi(20, 500, 40, 60, "rgba(30, 144, 255, 0.6)", 7, pataImg);
    teclas(michi);
    console.log(michi);
    
    
    // AQUI SE DIBUJA EL JUEGO
    
    idInterval = setInterval(() => {
        //BORRAR AREA
        ctx.clearRect(0, 0, 330, 210);
    
        //DIBUJAR FONDO
        dibujarFondo();

        //MOSTRAR DATOS
        mostrarDatos(michi.alegria,michi.vida);
        
        //DIBUJAR MICHI
        michi.dibujarse();

        // DIBUJAR ENEMIGOS/ELEMENTOS EXTRA
        rotten.forEach((pez, index) => {
            pez.dibujarse();
            if(
                pez.y + pez.h >= michi.y // Impacto sup.
                && pez.x + pez.w >= michi.x // Impacto lat. izq.
                && pez.x <= michi.x + michi.w  //  Impacto lat. der.
                && pez.y + pez.h <= michi.y + michi.h //lim. inf.
                ) 
                {
                console.log("impacto");
                rotten.splice(index, 1);
                michi.vida -= 1;
                if (michi.vida == 0){
                    clearInterval(idInterval); //ACTIVAR CUANDO SE COLOQUE EL BOTON START
                    alert("MICHI MURIÓ  :( ")
                };
            };

            
        });
        
        //DIBUJAR POSHO
        comida.forEach((posho, index) => {
            posho.dibujarse();
            if(
                posho.y + posho.h >= michi.y // Impacto sup.
                && posho.x + posho.w >= michi.x // Impacto lat. izq.
                && posho.x <= michi.x + michi.w  //  Impacto lat. der.
                && posho.y + posho.h <= michi.y + michi.h // limite inferior
                ) 
                {
                console.log("poshito!");
                comida.splice(index, 1);
                michi.alegria += 1;
                if (michi.alegria == 10){
                    // clearInterval(idInterval); ACTIVAR CUANDO SE COLOCQUE EL BOTON RESTART !!!
                    alert("MICHI ESTA SATISFECHO :D  , MISSION COMPLETE  !! ")
                };
            };
        });



        //DIBUJAR PEZ
        crearPez();
        //DIBUJAR POSHO
        crearPosho(); //ENABLED
    
    }, 1000 / 30);

}

// iniciarJuego(); DISABLED: PARA PRUEBAS ANTES DE COLOCAR BOTON DE START !!