// -----------------------     MICHI CATCH        -------------------------

let btnStart = document.querySelector(".start"); // Para el botón de START

btnStart.addEventListener("click", () => {
    clearInterval(idInterval);
    iniciarJuego();
  });

// idInterval 
let idInterval;



// Imagenes
const fondoImg = new Image();
fondoImg.src = "images/refri.jpeg";

const pataImg = new Image();
pataImg.src ="images/huellita1.png";

const pezImg = new Image();
pezImg.src ="images/pescado.png"

const poshoImg = new Image();
poshoImg.src = "images/posho.png"

const heartImg = new Image();
heartImg.src = "images/heart.png"


// 1.-Seleccionar canvas
let lienzo = document.getElementById("lienzo");
let ctx = lienzo.getContext("2d");
// w 400 h 550


//Lista de enemigos y otros elementos

const comida = [];
const rotten = [];


// LLAMA PANTALLA INICIO  //////////////////////

pantallaInicio();


//  CLASES ///////////////////////////////////////

//      MICHI --> class

class Michi {
    constructor(x, y, w, h, vida, imagen) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
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
        ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h);
    }
    morirse(){}

}


// ENEMIGO ------------->   PEZ

class Pez extends Michi {
    constructor(x, y, w, h, vida, imagen) {
        super(x, y, w, h, vida, imagen);
    }
    dibujarse() {
        ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h);
        
        const num = Math.floor(Math.random() * 5); // genera num. aleatorios
        this.y += num;
    }
}

// PUNTOS ------------->   POSHO

class Posho extends Michi {
    constructor(x, y, w, h, vida, imagen) {
        super(x, y, w, h, vida, imagen);
    }
    dibujarse() {
        ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h);
        
        const num = Math.floor(Math.random() * 5); // genera num. aleatorios
        this.y += num;
    }
}

// DIBUJA PANTALLA DE INICIO //////////////////////////////

function pantallaInicio() {
    //Estilo
    ctx.fillStyle = "black";
    ctx.font='bold 30px Arial';
    ctx.lineWidth = 100;

    //TEXTO
    ctx.fillText(`PRESS START`, 100, 300);
}

//PANTALLA WIN

function pantallaWin() {
    //DIFUMINA AREA DE JUEGO
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, 400, 550);
    
    //Estilo
    ctx.fillStyle = "white";
    ctx.font='bold 40px Arial';

    
    //TEXTO
    ctx.fillText(`YOU WIN !!`, 100, 300);
};


//PANTALLA LOOSE

function pantallaLose() {
    //DIFUMINA AREA DE JUEGO
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, 400, 550);
    
    //Estilo
    ctx.fillStyle = "white";
    ctx.font='bold 40px Arial';

    
    //TEXTO
    ctx.fillText(`YOU LOSE :(`, 90, 300);
};


//  DIBUJAR FONDO

function dibujarFondo() {
    ctx.fillStyle = "brown";
    ctx.fillRect(0, 0, 400, 550);
    ctx.drawImage(fondoImg,50, 50, 300, 550);
}


// MOSTRAR DATOS: --->  MICHI'S LIFE, HUNGER (ALEGRIA)

function mostrarDatos(alegria,vida) { 
    //Estilo
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    //vida
    ctx.fillText(`Michi's life: ${vida}`, 10, 30);
    // hambre
    ctx.fillText(`Hunger: ${alegria} / 10`, 230, 30);

}

// DIBUJAR CORAZON

function corazon() {
    ctx.fillStyle = "rgba(0, 255, 0, 0.0)"
    ctx.fillRect(155, 5, 40, 40);
    ctx.drawImage(heartImg, 155, 5, 40, 40);
}


// ESCUCHAR TECLAS //////////////////////////////////////

function teclas(micho) {
    //Recibimos un evento
    document.addEventListener("keyup", (evento) => {
      switch (evento.code) {
        case "ArrowRight":
          micho.derecha();
          break;
        case "ArrowLeft":
          micho.izquierda();
          break;
      };
    });
  };


//   CREAR ENEMIGOS ///////////////////////////

function crearPez(){
    const num = Math.floor(Math.random() * 100); // genera num. aleatorios
    const num2 = Math.floor(Math.random() * 300); // genera num. aleatorios para el eje X
    if (num === 3 && num2 > 50){
        const pez = new Pez (num2, 90, 45, 45, 0,pezImg);
        rotten.push(pez); // Envia un elemento al array rotten
    };
};

//   CREAR POSHITO

function crearPosho(){
    const num = Math.floor(Math.random() * 100); // genera num. aleatorios
    const num2 = Math.floor(Math.random() * 300); // genera num. aleatorios para el eje X

    if (num === 3 && num2 >= 50){
        const posho = new Posho (num2, 90, 45, 45, 0, poshoImg);
        comida.push(posho); // Envia un elemento al array comida
    };
};


function iniciarJuego() {

    const michi = new Michi(180, 450, 55, 65, 7, pataImg);
    teclas(michi);
    
    
    // AQUI SE DIBUJA EL JUEGO
    
    idInterval = setInterval(() => {
        //BORRAR AREA DE JUEGO
        ctx.clearRect(0, 0, 400, 550);
    
        //DIBUJAR FONDO
        dibujarFondo();

        //MOSTRAR DATOS
        mostrarDatos(michi.alegria,michi.vida);

        //DIBUJAR CORAZON
        corazon();
        
        //DIBUJAR MICHI
        michi.dibujarse();

        // DIBUJAR PECES
        rotten.forEach((pez, index) => {
            pez.dibujarse();
            if(
                pez.y + pez.h >= michi.y // Impacto sup.
                && pez.x + pez.w >= michi.x // Impacto lat. izq.
                && pez.x <= michi.x + michi.w  //  Impacto lat. der.
                && pez.y + pez.h <= michi.y + michi.h //lim. inf.
                )  

            {
            
                rotten.splice(index, 1);
                michi.vida -= 1;
                if (michi.vida == 0){
                    clearInterval(idInterval); //ACTIVAR CUANDO SE COLOQUE EL BOTON START
                    pantallaLose();
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
                
                comida.splice(index, 1);
                michi.alegria += 1;
                if (michi.alegria == 10){
                    clearInterval(idInterval); //ACTIVAR CUANDO SE COLOQUE EL BOTON RESTART !!!
                    pantallaWin();
                };
            };
        });



        //DIBUJAR PEZ
        crearPez();
        //DIBUJAR POSHO
        crearPosho(); //ENABLED
    
    }, 1000 / 30);

}
///////////////////// FIN //////////////////////////////