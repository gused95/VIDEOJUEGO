// --------------   MICHI CATCH -----------------

// let btnStart = document.querySelector(".start"); // Para el botón de START

// btnStart.addEventListener("click", () => {
//     console.log("inicia el juegooooooooo");
//     clearInterval(IdInterval);
//     iniciarJuego();
//   });

// IdInterval
// let IdInterval;



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
        this.y += 1;
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
        this.y += 1;
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
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    //vida
    ctx.fillText(`Michi:${vida}`, 10, 30);
    // hambre
    ctx.fillText(`A:${alegria}`, 310, 500);
    // michiPuntos
    ctx.fillText("MP:", 10, 70);
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
    const num = Math.floor(Math.random() * 125); // genera num. aleatorios
    const num2 = Math.floor(Math.random() * 300); // genera num. aleatorios para el eje X
    if (num === 3 && num2 > 50){
        const pez = new Pez (num2, 90, 40, 40, "green",0,pezImg);
        rotten.push(pez); // Envia un elemento al array rotten
    }
};

//   CREAR POSHITO

function crearPosho(){
    const num = Math.floor(Math.random() * 125); // genera num. aleatorios
    const num2 = Math.floor(Math.random() * 300); // genera num. aleatorios para el eje X

    if (num === 3 && num2 >= 50){
        const posho = new Posho (num2, 90, 40, 40, "blue", "", poshoImg);
        comida.push(posho); // Envia un elemento al array comida
    }
};


function iniciarJuego() {

    const michi = new Michi(20, 500, 40, 60, "dodgerblue", 7, pataImg);
    teclas(michi);
    console.log(michi);
    
    
    // AQUI SE DIBUJA EL JUEGO
    
    setInterval(() => {
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
                    // clearInterval(idInterval); ACTIVAR CUANDO SE COLOCQUE EL BOTON START
                    alert("Michi murió :( ")
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
                    // clearInterval(idInterval); ACTIVAR CUANDO SE COLOCQUE EL BOTON START
                    alert("Michi esta feliz :), MISSION COMPLETE!! ")
                };
            };
        });



        //DIBUJAR PEZ
        // crearPez();
        //DIBUJAR POSHO
        crearPosho(); //DISABLED
    
    }, 1000 / 30);

}

iniciarJuego();