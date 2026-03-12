import { alterarTema, iniciarTema } from "./theme.js";

document.addEventListener("DOMContentLoaded",()=>{
	console.log("teste");
	iniciarTema();

	const btnAlterarTema = document.getElementById("btnAlterarTema");

	btnAlterarTema.onclick = iniciarTema;

});