

const sprites = new Image() ; // cria uma imagem na memória
sprites.src = './sprites.png'; // indica a imagem 

const canvas = document.querySelector('canvas'); // pega a tag canvas do HTML
const contexto = canvas.getContext('2d'); // indica que o jogo está sendo feito em 2D

let background = {

    spriteX:390,
    spriteY:0,
    altura:204,
    largura:275,
    x:0,
    y:canvas.height - 204,

    desenha(){

        contexto.fillStyle = '#70c5ce'
        contexto.fillRect(0,0,canvas.height,canvas.width)
        contexto.drawImage(
            sprites,
            background.spriteX, background.spriteY, 
            background.largura, background.altura, 
            background.x, background.y,  
            background.largura, background.altura
        )

        contexto.drawImage(
            sprites,
            background.spriteX, background.spriteY, 
            background.largura, background.altura, 
            (background.x + background.largura), background.y,  
            background.largura, background.altura
        )
    }
}

let chao = {

    spriteX:0,
    spriteY:610,
    altura:112,
    largura:224,
    x:0,
    y:canvas.height - 112,

    desenha(){
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, 
            chao.largura, chao.altura, 
            chao.x, chao.y,  
            chao.largura, chao.altura
        )

        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, 
            chao.largura, chao.altura, 
            (chao.x + chao.largura), chao.y,  
            chao.largura, chao.altura
        )
    }
}
let flappyBird = {

    spriteX:0,
    spriteY:0,
    altura:24,
    largura:33,
    x:10,
    y:50,

    desenha(){
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY, 
            flappyBird.largura, flappyBird.altura, 
            flappyBird.x, flappyBird.y,  
            flappyBird.largura, flappyBird.altura
        );

    }
}
function loop() {
    
    background.desenha();
    flappyBird.desenha();
    chao.desenha();

    
    requestAnimationFrame(loop)
}

loop();