
const sprites = new Image() ; // cria uma imagem na memória
sprites.src = './sprites.png'; // indica a imagem 

const canvas = document.querySelector('canvas'); // pega a tag canvas do HTML
const contexto = canvas.getContext('2d'); // indica que o jogo está sendo feito em 2D

let frames = 0;
let pontuacao = 0;
let melhorPontuacao = 0;

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
        validarPontuacao()
        return true;
    }
    
    return false


};
function validarPontuacao (){
    if(pontuacao >= 40){
        gameOver.medalha.spriteX = 0;
        gameOver.medalha.spriteY =78;
        return
    }
    if(pontuacao >= 30){
        gameOver.medalha.spriteX = 0;
        gameOver.medalha.spriteY = 124;
        return
    }
    if(pontuacao >= 20){
        gameOver.medalha.spriteX = 48;
        gameOver.medalha.spriteY = 78;
        return
    }
    if(pontuacao >= 10){
        gameOver.medalha.spriteX = 48;
        gameOver.medalha.spriteY = 124;
        console.log('Medalha de bronze')
        return
    }
    gameOver.medalha.spriteX =undefined ;
    gameOver.medalha.spriteY = undefined ;
    console.log('sem medalha')
    return

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
let gameOver = {

    spriteX:134,
    spriteY:153,
    altura:200,
    largura:226,
    x:(canvas.width / 2) - 226 / 2,
    y:50,
    medalha:{
        spriteX:undefined,
        spriteY:undefined,
        altura:44,
        largura:44,
        x:73,
        y:137,
    },
    desenha(){
        contexto.drawImage(
            sprites,
            gameOver.spriteX, gameOver.spriteY, 
            gameOver.largura, gameOver.altura, 
            gameOver.x, gameOver.y,  
             gameOver.largura, gameOver.altura
         )

         contexto.drawImage(
            sprites,
            this.medalha.spriteX, this.medalha.spriteY, 
            this.medalha.largura, this.medalha.altura, 
            this.medalha.x, this.medalha.y,  
            this.medalha.largura, this.medalha.altura
         
         )
        
        contexto.font = '35px "VT323"';
        contexto.textAlign = 'right';
        contexto.fillStyle = 'white';
        contexto.fillText(`${pontuacao}`, canvas.width - 80, 148);    

    

        contexto.font = '35px "VT323"';
        contexto.textAlign = 'right';
        contexto.fillStyle = 'white';
        contexto.fillText(`${ melhorPontuacao}`, canvas.width - 80, 190);    
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

function criaCanos() {
    let canos = {
        altura:400,
        largura:52,
        chao:{
            spriteX:0,  
            spriteY:169,
        },
        ceu:{
            spriteX:52,  
            spriteY:169,
        },
        espaco: 80,

        desenha(){
            canos.pares.forEach(function(par) {
                const movimentoYCano = -par.y;
                const espacamentoDoCano = 90;
                
                const canoCeuX = par.x;
                const canoCeuY =movimentoYCano;
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                    
                    )
                    
                const canoChaoX = par.x;
                const canoChaoY = espacamentoDoCano + canos.altura + movimentoYCano;
                    contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                    
                )                        
                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY  
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }
            })
        },
        temColisaoComOFlappBird(par){
            const cabecaDoFlappyBird = global.flappyBird.y;
            const peDoFlappyBird = global.flappyBird.y + global.flappyBird.altura;
            
            if(canos.pares[0] !== undefined){
                let canoAPassar = canos.pares[0].x;

                if(canoAPassar >= 108 && canoAPassar <= 120  + canos.largura){
                    if((global.flappyBird.x + global.flappyBird.largura) >= par.x){
                        if (cabecaDoFlappyBird <= par.canoCeu.y ) {
                            validarPontuacao()
                            return true;
                        }
            
                        if (peDoFlappyBird >= par.canoChao.y) {
                            validarPontuacao()
                            return true;
                        }
                    }
                    return false;
    
                }
            }
        },

        pares: [],
        atualiza(){
            const passou100Frames = frames % 100 === 0;

            if(passou100Frames){
                canos.pares.push ({
                    x: canvas.width,
                    y: 150 * (Math.random() + 1),
                })
                console.log('passou 100 Frames ' + canos.pares.y)
            }

            canos.pares.forEach(function(par) {
                par.x = par.x - 2;
                console.log(par.x)
                if(canos.temColisaoComOFlappBird(par)){
                    if(pontuacao > melhorPontuacao){
                        melhorPontuacao = pontuacao
                    }                    
                    HIT.play(); 
                    
                    mudarDeTela(telas.GAME_OVER)
                }
                
                if(par.x + canos.largura<= 0){
                    canos.pares.shift();
                }
            })
            let canoAPassar = canos.pares[0];
            if(canoAPassar != undefined){
                let passouPeloCano = canoAPassar.x === 108;
                console.log( 'passou do cano ' + canoAPassar)
                
                if(passouPeloCano){
                     console.log('passou do meio')
                
                    pontuacao += 1;
                }
            }
            
        }
    }

    return canos
};

function criarPlacar(){
    const placar = {
        desenha() {
            contexto.font = '35px "VT323"';
            contexto.textAlign = 'right';
            contexto.fillStyle = 'white';
            contexto.fillText(`${pontuacao}`, canvas.width - 10, 35);      
        },
           
        atualiza() {
          
        },
    }
    return placar;
}

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
            if(pontuacao > melhorPontuacao){
                melhorPontuacao = pontuacao
            }                    
            HIT.play();
            
            mudarDeTela(telas.GAME_OVER );  

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
            global.canos= criaCanos();
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
            pontuacao = 0;
        },
    }
};

telas.JOGO = {
    inicializa(){
        global.placar = criarPlacar();
    },    
    desenha(){
        background.desenha();
        global.canos.desenha()
        global.chao.desenha();
        global.flappyBird.desenha();
        global.placar.desenha()
        
    },
    atualiza(){
        global.flappyBird.atualiza();
        global.chao.atualiza();
        global.canos.atualiza();
        global.placar.atualiza()
        global.placar.atualiza()

    },
    click(){
        global.flappyBird.pula();
    },
   
};

telas.GAME_OVER = { 
    desenha(){
        gameOver.desenha();

    },
    atualiza(){

    },
    click(){
        mudarDeTela(telas.INICIO)
    }
}
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