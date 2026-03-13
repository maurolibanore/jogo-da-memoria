const Calculadora = {
    valor1:0,
    valor2:0,
    somar(){
        this.valor1 = parseInt(document.getElementById("valor1").value);
        this.valor2 = parseInt(document.getElementById("valor2").value);
        console.log(this.valor1 + this.valor2);
        this.mostrarResultado(this.valor1 + this.valor2);
    },

    mostrarResultado(resultado){
        const spanResultado = document.getElementById("resultado");
        spanResultado.textContent = `A soma de ${this.valor1} e ${this.valor2} é ${resultado}`;
    }
}