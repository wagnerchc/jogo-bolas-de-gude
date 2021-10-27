class Jogo{
    constructor(){
        this.vez=1;
        this.np=[];
        this.nc=[];
        this.numP=0;
        this.paridadeP='';
        this.numC=0;
        this.paridadeC='';
    }
    itens(){
        //Área de impressão dos botões
        let btn = document.querySelector('.buttons');
        for(let i=0;i<this.np.length;i++){
            var p=document.createElement("p");
            p.textContent=this.np[i];
            p.classList.add("number");
            btn.appendChild(p);
        };
    }
    novosItens(){
        //Remover botões antigos e imprimir os novos
        let btn=document.querySelector('.buttons');
        let number=document.querySelectorAll('.number');
        while (btn.firstChild) {
            btn.removeChild(btn.firstChild);
        };
        game.itens();
        game.mapear();
    }
    mapear(){
        //Mapear os botões quando pressionados
        let teclado = document.querySelectorAll('.number');
        for(let i = 0; teclado.length > i; i++) {
            teclado[i].addEventListener('click', game.btnPress);
        };
        let acao = document.querySelectorAll('.acao');
        for(let i = 0; acao.length > i; i++) {
            acao[i].addEventListener('click', game.btnPress);
        };
    }
    arrayNumerosIniciais(){
        //Números iniciais do jogador e computador
        for(let i=1;i<=10;i++){
            this.np.push(i);
            this.nc.push(i);
        };
    }
    iniciar(){
        //Montagem do cenário inicial do jogo
        game.addHide('.inicio');
        game.removeHide('.ocultar');
        game.addHide('.proximo');
        game.addHide('.desenvolvidoPor');
        game.arrayNumerosIniciais();
        game.itens();
        game.mapear();
        game.tituloRodada();
    }
    numComp(){
        //Número de bolas do computador
        let bolasComputador = (Math.random(1)*this.np.length).toFixed(0);
        if(bolasComputador==0){
            this.numC=bolasComputador=1;
        }else{
            this.numC=Math.round(Number(bolasComputador));
        };
    }
    paridadeComp(){
        //Paridade do computador - somente quando as rodadas forem ímpares
        if(((Math.random()*3).toFixed(0))%2===0){
            this.paridadeC='Par';
        }else{
            this.paridadeC='Ímpar';
        };
    }
    numPress(vlrBtn){
        //Número de bolas do jogador
        let altNumP=0;
        altNumP+=1;
        return this.numP=vlrBtn;
    }
    paridadePress(vlrBtn){
        //Paridade escolhida pelo jogador
        if(this.vez%2>0){
            return this.paridadeP=vlrBtn;
        }
    }
    paridadeAposta(qtd){
        //Testar a paridade da aposta
        if(qtd%2===0){
            return `Par`;
        }else{
            return `Ímpar`;
        };
    }
    incluirNumeros(array,qtd){
        //Incluir números
        for(let i=1;i<=qtd;i++){
            array.push((array.length)+1);
        };
    }
    retirarNumeros(array,qtd){
        //Retirar números
        for(let i=1;i<=qtd;i++){
            array.pop();
        };
    }
    pagarAposta(ganhadorArray,apostaGanhador,perdedorArray,apostaPerdedor){
        //Pagar a aposta
        if(apostaGanhador>apostaPerdedor){
            game.retirarNumeros(perdedorArray,apostaPerdedor);
            game.incluirNumeros(ganhadorArray,apostaPerdedor);
        }else{
            game.retirarNumeros(perdedorArray,apostaGanhador);
            game.incluirNumeros(ganhadorArray,apostaGanhador);
        };
    }
    testarParidade(){
        //Testar a paridade de acordo com a alternância das rodadas
        let apostaJogador=game.paridadeAposta(this.numP);
        let apostaComputador=game.paridadeAposta(this.numC);
        if(this.vez%2>0){
            if(apostaComputador==this.paridadeP){
                game.pagarAposta(this.np,this.numP,this.nc,this.numC);
                if(this.nc.length!==0){
                    if(this.numP>this.numC){
                        game.msg(`Você ganhou ${this.numC} bolas.`,'r');
                    }else{
                        game.msg(`Você ganhou ${this.numP} bolas`,'r');
                    };
                };
            }else{
                game.pagarAposta(this.nc,this.numC,this.np,this.numP);
                if(this.np.length!==0){
                    if(this.numC>this.numP){
                        game.msg(`Você perdeu! ${this.numP}`,'r');
                    }else{
                        game.msg(`Você perdeu! ${this.numC}`,'r');
                    };
                };
            };
        }else{
            if(apostaJogador==this.paridadeC){
                game.pagarAposta(this.nc,this.numC,this.np,this.numP);
                if(this.np.length!==0){
                    if(this.numC>this.numP){
                        game.msg(`Você perdeu! ${this.numP}`,'r');
                    }else{
                        game.msg(`Você perdeu! ${this.numC}`,'r');
                    };
                };
            }else{
                game.pagarAposta(this.np,this.numP,this.nc,this.numC);
                if(this.nc.length!==0){
                    if(this.numP>this.numC){
                        game.msg(`Você ganhou ${this.numC} bolas.`,'r');
                    }else{
                        game.msg(`Você ganhou ${this.numP} bolas`,'r');
                    };
                };
            };
        };
    }
    telaFinal(){
        game.addHide('.buttons');
        game.addHide('.escolha');
        game.addHide('.confirm');
        game.addHide('.proximo');
        game.removeHide('.novo');
        game.removeHide('.desenvolvidoPor');
    }
    qtdBolas(){
        //Testar se acabou o jogo
        if(this.np.length==0){
            game.msg('Fim de jogo, você perdeu! Acabaram suas bolas de gule para apostar.','r');
            game.telaFinal();
        }else if (this.np.length>=20){
            game.msg('Fim de jogo, você ganhou todas as bolas do computador. Parabéns!','r');
            game.telaFinal();
        }else{
            game.btnMostrarProximo();
        }
    }
    resultado(){
        //Cálculo do resultado do jogo
        game.paridadeComp();
        game.numComp();
        game.testarParidade();
        game.qtdBolas();
    }
    contarRodada(){
        //Zerar as escolhas de números e paridades do jogador e contar a rodada
        this.numP=0;
        this.numC=0;
        this.paridadeP='';
        this.numC='';
        this.vez+=1;
    }
    msg(frase,q){
        //Mensagens das etapas de cada rodada
        let etapas=document.querySelector('.etapas');
        etapas.innerHTML+=`<p class="descricao-etapas-${q}">${frase}</p>`;
        etapas.scrollTop = etapas.scrollHeight;
    }
    tituloRodada(){
        //Título da rodada
        game.msg(`Rodada ${this.vez}`,'r')
    }
    addHide(nomeClasse){
        //Adicionar a class Hide
        let addHide=document.querySelector(nomeClasse);
        addHide.classList.add('hide');
    }
    removeHide(nomeClasse){
        //Remover a class Hide
        let removeHide=document.querySelector(nomeClasse);
        removeHide.classList.remove('hide');
    }
    tirarParidade(){
        //Retirar os botões de par e ímpar
        if(this.vez%2==0){
            game.addHide('.escolha');
        }else{
            game.removeHide('.escolha');
        };
    }
    btnMostrarProximo(){
        //Alterações após resultado da rodada
        game.addHide('.buttons');
        game.addHide('.escolha');
        game.addHide('.confirm');
        game.removeHide('.proximo');
    }
    proximaRodada(){
        //Alterações após pressiona em próximo
        game.removeHide('.buttons');
        game.removeHide('.confirm');
        game.addHide('.proximo');
        game.contarRodada();
        game.tirarParidade();
        game.tituloRodada();
        game.novosItens();
    }
    confirmarPress(){
        //Testes quando o jogar pressiona em próximo
        let p=game.paridadeP;
        let n=game.numP;
        if(this.vez%2>0){
            if(p!='Par'&&p!='Ímpar'&&n==0){
                game.msg(`Não dá para jogar se não escolher um número e uma paridade (par ou ímpar).`,'a');
            }else if(p!='Par'&&p!='Ímpar') {
                game.msg(`Você já escolheu um número, mas falta escolher uma paridade (par ou ímpar).`,'a');
            }else if(n==0){ 
                game.msg(`Você já escolheu uma paridade (par ou ímpar), mas falta escolher um número de bolas.`,'a');
            }else{
                game.resultado();
            }
        } else {
            if(n==0){    
                game.msg(`O computador já fez as escolhas dele, agora falta só você escolher um número de bolas.`,'a');
            }else{
                game.resultado();
            }
        }
    }
    btnPress(){
        //Identificação dos botões pressionados pelo jogador
        let vlrBtn = this.textContent;
        if(vlrBtn>0&&vlrBtn<20){
            game.numPress(vlrBtn);
            game.msg(`Você vai apostar <strong>${game.numP} bolas</strong>.`,'p');
        } else if(vlrBtn=="Par"||vlrBtn=="Ímpar"){
            game.paridadePress(vlrBtn);
            game.msg(`Você vai apostar que o número total de bolas apostadas pelo computador é <strong>${game.paridadeP}</strong>.`,'p');
        } else if(vlrBtn=="Confirmar"){
            game.confirmarPress();
        } else if(vlrBtn=="Próxima rodada"){
            game.proximaRodada();
        }
    }
}
//Criação do objeto
let game = new Jogo();