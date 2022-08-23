// --------------   MICHI CATCH -----------------

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

function mostrarDatos() { 
    //Estilo
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    //vida
    ctx.fillText("Michi", 10, 30);
    // hambre
    // ctx.fillText("Panza", 310, 500);
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
        rotten.push(posho); // Envia un elemento al array comida
    }
};


function iniciarJuego() {

    const michi = new Michi(20, 500, 40, 60, "dodgerblue", 100, pataImg);
    teclas(michi);
    console.log(michi);
    
    
    // AQUI SE DIBUJA EL JUEGO
    
    setInterval(() => {
        //BORRAR AREA
        ctx.clearRect(0, 0, 330, 210);
    
        //DIBUJAR FONDO
        dibujarFondo();

        //MOSTRAR DATOS
        mostrarDatos();
        
        //DIBUJAR MICHI
        michi.dibujarse();

        // DIBUJAR ENEMIGOS/ELEMENTOS EXTRA
        rotten.forEach((pez, index) => {
            pez.dibujarse();
        });
        
        //DIBUJAR POSHO
        comida.forEach((posho, index) => {
            posho.dibujarse();
        });



        //DIBUJAR PEZ
        crearPez();
        //DIBUJAR POSHO
        crearPosho();
    
    }, 1000 / 30);

}

iniciarJuego();