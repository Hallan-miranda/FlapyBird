

const sprites = new Image() ; // cria uma imagem na memória
sprites.src = './sprites.png'; // indica a imagem 

const canvas = document.querySelector('canvas'); // pega a tag canvas do HTML
const contexto = canvas.getContext('2d'); // indica que o jogo está sendo feito em 2D

let frames = 0;
const HIT = new Audio();
HIT.src = './efeitos/efeitos_hit.wav'

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

function flappyBirdColide(flappyBird, chao){
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoy = chao.y

    if(flappyBirdY >= chaoy){
        return true;
    }
    
    return false


};
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
function criaChao() {
    let chao = {
    
        spriteX:0,  
        spriteY:610,
        altura:112,
        largura:224,
        x:0,
        y:canvas.height - 112,
        
        atualiza(){
            const moviemntoDoChao = 1;
            const repetechao = chao.largura / 2;
            const movimentacao =  chao.x -moviemntoDoChao;

            chao.x = movimentacao % repetechao;
        },
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

    return chao
};

function criaFlappyBird(){
    let flappyBird = {

    spriteX:0,
    spriteY:0,
    altura:24,
    largura:33,
    x:canvas.width / 2 - 16,
    y:105,
    gravidade: 0.25,
    velocidade: 0,
    pulo: 3.8,

    movimento:[
        {spriteX:0, spriteY:0,},    
        {spriteX:0, spriteY:26,},    
        {spriteX:0, spriteY:52,},
        {spriteX:0, spriteY:26,},        
    ],

    frameAtual: 0,
    atualizaFrameAtual(){
        const intervaloDeFrames = 10;
        const passouIntervalo = frames % intervaloDeFrames === 0;
        console.log(passouIntervalo)

        if(passouIntervalo){
            const baseDoIncremento = 1;
            const incremento = baseDoIncremento + flappyBird.frameAtual;
            const baseDaRepeticao = flappyBird.movimento.length;
            flappyBird.frameAtual = incremento % baseDaRepeticao;

        }
    },
    pula() {
        flappyBird.velocidade = - flappyBird.pulo
    },
    atualiza(){

        if(flappyBirdColide(flappyBird,global.chao )) {
            console.log('flappyBird bateu')
            HIT.play();

            setTimeout(() => {
                mudarDeTela(telas.INICIO);  

            }, 500)

            return; 
        }

        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    desenha(){
        flappyBird.atualizaFrameAtual()
        const{spriteX,spriteY} = flappyBird.movimento[flappyBird.frameAtual];

        contexto.drawImage(
            sprites,
            spriteX, spriteY, 
            flappyBird.largura, flappyBird.altura, 
            flappyBird.x, flappyBird.y,  
            flappyBird.largura, flappyBird.altura
        );

    }
    }

    return flappyBird
};

const global = {};
let telaAtiva = {};

function mudarDeTela(novaTela) {
    telaAtiva = novaTela;

    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
}
const telas = {
    INICIO: {
        inicializa(){
            global.flappyBird = criaFlappyBird();
            global.chao = criaChao();
        },
        desenha() {
            background.desenha();
            // global.flappyBird.desenha();
            global.chao.desenha();
            intro.desenha();
        },
        atualiza() {
            global.chao.atualiza(); 
        },
        click() {
            mudarDeTela(telas.JOGO);
        },
    }
};

telas.JOGO = {
    desenha(){
        background.desenha();
        global.chao.desenha();
        global.flappyBird.desenha();
    },
    atualiza(){
        global.flappyBird.atualiza();
        global.chao.atualiza();
    },
    click(){
        global.flappyBird.pula();
    },
   
};
function loop() {
    
    telaAtiva.desenha();
    telaAtiva.atualiza();
    
    frames += 1;
    
    requestAnimationFrame(loop);
};

window.addEventListener('click', function (){
 if(telaAtiva.click){
    telaAtiva.click();
 };

})
mudarDeTela(telas.INICIO)
loop();