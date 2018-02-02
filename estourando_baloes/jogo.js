var timerId = null; //variavel que armazena a chamada da funcao timeout

function iniciarJogo() {

	//get url
	var url = window.location.search;

	//tira o '?'
	var dificuldade = url.replace("?", "");

	var tempo = 0;

	if (dificuldade == 1) {
		tempo = 120;
	} else if (dificuldade == 2) {
		tempo = 60;
	} else if (dificuldade == 3) {
		tempo = 30;
	}

	//insere tempo no span
	document.getElementById('cronometro').innerHTML = tempo;

	var qtde_baloes = 80;

	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;

	var qtde_baloes_estourados = 0;
	document.getElementById('baloes_estourados').innerHTML = qtde_baloes_estourados;

	criarBaloes(qtde_baloes);
	contagem_tempo(tempo);
}

function criarBaloes(qtde_baloes) {
	for (var i = 1; i <= qtde_baloes; i++) {
		
		var balao = document.createElement("img");
		balao.id = 'b'+i;
		balao.src = "imagens/balao_azul_pequeno.png";
		balao.style.margin = '10px';
		balao.onclick = function () {
			cliqueBalao(this);
		}

		document.getElementById('cenario').appendChild(balao);
	}
}

function contagem_tempo(segundos) {

	segundos = segundos - 1;

	if (segundos == -1) {
		clearTimeout(timerId); //para a execucao da funcao settimeout
		game_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;
	timerId = setTimeout("contagem_tempo("+segundos+")", 1000);
}

function game_over() {
	document.getElementById('tela_end_game').style.visibility = 'visible';
	document.getElementById('tela_end_game_text').innerHTML = "Você perdeu :("
	document.getElementById('tela_end_game_text').style.color = '#FF0000';
	remover_eventos();
}

function cliqueBalao(balao) {
	var balaoClicado = document.getElementById(balao.id);
	var audio = new Audio('balloon explosion.wav');
	audio.play();
	balaoClicado.setAttribute("onclick","");
	balaoClicado.src = "imagens/balao_azul_pequeno_estourado.png";
	pontuacao(-1);
}

function pontuacao(acao) {
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;
	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	
	baloes_estourados = parseInt(baloes_estourados);
	baloes_inteiros = parseInt(baloes_inteiros);

	baloes_estourados = baloes_estourados-acao;
	baloes_inteiros = baloes_inteiros+acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	vitoria(baloes_inteiros);
}

function vitoria(baloes_inteiros) {
	if (baloes_inteiros == 0) {
		document.getElementById('tela_end_game').style.visibility = 'visible';
		document.getElementById('tela_end_game_text').innerHTML = "Você venceu! Parabéns!"
		document.getElementById('tela_end_game_text').style.color = '#32CD32';
		pararJogo();
	}
}

function pararJogo() {
	clearTimeout(timerId);
}

function remover_eventos() {
	var i = 1;
	while (document.getElementById('b'+i)) {
		document.getElementById('b'+i).onclick = '';
		i++;
	}
}