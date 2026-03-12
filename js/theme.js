export function alterarTema(){
	let tema = localStorage.getItem("tema") || 'light';
	tema = tema == 'light' ? 'dark' : 'light';
	document.body.dataset.theme = tema;
	localStorage.setItem("tema", tema);
}

export function iniciarTema(){
	let tema = localStorage.getItem("tema") || 'light';
	document.body.dataset.theme = tema;
}


