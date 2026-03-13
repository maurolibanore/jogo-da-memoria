import * as Theme from "./theme.js";

document.addEventListener("DOMContentLoaded", ()=>{
	console.log("teste");
	Theme.iniciarTema();

	const btnAlterarTema = document.getElementById("btnAlterarTema");

	btnAlterarTema.onclick = Theme.alterarTema;

});