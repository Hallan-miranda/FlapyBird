

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

let intro = {

    spriteX:134,
    spriteY:0,
    altura:152,
    largura:174,
    x:(canvas.width / 2) - 174 / 2,
    y:50,

    desenha(){
        contexto.drawImage(
            sprites,
            intro.spriteX, intro.spriteY, 
            intro.largura, intro.altura, 
            intro.x, intro.y,  
            intro.largura, intro.altura
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
    gravidade: 0.25,
    velocidade: 0,
    atualiza(){

        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
        console.log(flappyBird.y)
    },
    desenha(){
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY, 
            flappyBird.largura, flappyBird.altura, 
            flappyBird.x, flappyBird.y,  
            flappyBird.largura, flappyBird.altura
        );

    }
};

let telaAtiva = {};
function mudarDeTela(novaTela) {
    telaAtiva = novaTela
}
const telas = {
    INICIO: {
        desenha(){
            background.desenha();
            chao.desenha();
            intro.desenha()
        },
        atualiza(){

        },
        click(){
            mudarDeTela(telas.JOGO)
        },
    }
};

telas.JOGO = {
    desenha(){
        background.desenha();
        chao.desenha();
        flappyBird.desenha();
    },
    atualiza(){
        flappyBird.atualiza()
    },
   
};
function loop() {
    
    telaAtiva.desenha();
    telaAtiva.atualiza();

    requestAnimationFrame(loop);
};

window.addEventListener('click', function (){
 if(telaAtiva.click){
    telaAtiva.click();
 }
})
mudarDeTela(telas.INICIO)
loop();