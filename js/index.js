
let palavras = ["DIV", "META", "HEADER", "JS", "FOOTER", "BODY"];

const btnReiniciar = document.getElementById("btnReiniciar");
const cards = document.querySelectorAll(".card");
const url = "https://darkblue-frog-779608.hostingersite.com";

let primeira = null;
let segunda = null;
let tentativas = 0;
let bloqueado = false;

const btnAlterarTema = document.getElementById("btnAlterarTema");
btnAlterarTema.onclick = () => alterarTema();

//iniciar();

buscarPalavras();
//salvarPartida();
iniciarTema();

function iniciarTema(){
    document.documentElement.setAttribute('data-theme', localStorage.getItem("tema") || 'light');
}

function alterarTema(){
    let tema = (localStorage.getItem("tema") || 'light') == 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', tema);
    localStorage.setItem("tema", tema);
}

function atualizarTentativas(){
    document.getElementById("tentativas").textContent = `Tentativas: ${tentativas}`;
}

async function buscarPalavras(){
	try{
		const response = await fetch(`${url}/api/palavras.php?quantidade=6`);
		//o único status aceitável é 200. 200==ok
		if(!response.ok){
			throw new Error(`Error ${response.status}`);
		}
		palavras = await response.json();
		console.log(palavras);
		iniciar();
	}catch(error){
		console.log(error);
	}
}

async function salvarPartida(){
    const nome = document.getElementById("nomeJogador").value || "Anônimo";
    try{
        const response = await fetch(`${url}/api/salvar.php`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({nome: nome, tempo: 20, tentativas: tentativas})
        });
        
        if(!response.ok){
            const errorBody = await response.json();
            throw new Error(`ERRO ${response.status}:${errorBody.erro}`);
        }
        
        const data = await response.json();
        console.log(data);		
    }catch(error){
        console.log(error);
    }
}

function iniciar(){
    tentativas = 0;
    atualizarTentativas();
    let embaralhadas = embaralhar([...palavras, ...palavras]);
    cards.forEach((card, x)=>{
        card.textContent = "?";
        card.dataset.palavra = embaralhadas[x];
        card.onclick = () => virar(card);
    });
}

function virar(card){
	if(bloqueado) return;
	card.textContent = card.dataset.palavra;
	card.classList.add("selecionado");
	if(!primeira){
		primeira = card;
		return;
	}
	segunda = card;
	tentativas++;
    atualizarTentativas();
	verificar();
}

function verificar(){
	if(primeira.textContent == segunda.textContent){
		primeira = null;
		segunda = null;
		console.log("acertou...");
	}else{
		bloqueado = true;
		setTimeout(()=>{
			primeira.textContent = "?";
			segunda.textContent = "?";
			primeira.classList.remove("selecionado");
			segunda.classList.remove("selecionado");
			primeira = null;
			segunda = null;
			bloqueado = false;
			console.log("1")
		},600);
		console.log("2")
	}
}


function embaralhar(array){
	for(let x=array.length - 1; x>0; x--){
		let y = Math.floor(Math.random()*(1+x));
		[array[x], array[y]] = [array[y], array[x]];
	}
	return array;
}

btnReiniciar.onclick =() => buscarPalavras();
