const { evaluate } = math;

window.onload = function () {
    document.getElementById("resultadoCalculadora").disabled = true;

    document.getElementById("btnLimpar").addEventListener("click", () => document.getElementById("resultadoCalculadora").value = "");

    document.querySelectorAll(".btnCalculadora").forEach(btn => {
        btn.addEventListener("click", () => insereDigitoInput(btn));
    })

    document.getElementById("excluirUltimoDigito").addEventListener("click", () => limpaUltimoDigito());

    document.getElementById("botaoCalcular").addEventListener("click", () => realizaCalculo());
}

function insereDigitoInput(botao){
    if (document.getElementById("resultadoCalculadora").value == "Operação inválida!"){
        document.getElementById("resultadoCalculadora").value = "";
        document.getElementById("resultadoCalculadora").value += botao.innerText;
    } else {
        document.getElementById("resultadoCalculadora").value += botao.innerText;
    }
}

function realizaCalculo() {
    try {
        let calculoOperacao = trataCalculo(document.getElementById("resultadoCalculadora").value);

        let resultado = trataResultado(calculoOperacao.toFixed(2));

        adicionarOperacaoHistorico(document.getElementById("resultadoCalculadora").value, resultado);

        document.getElementById("resultadoCalculadora").value = resultado;
    } catch {
        document.getElementById("resultadoCalculadora").value = "Operação inválida!";
    }
}

function trataCalculo(valorOperacao) {
    if (valorOperacao.includes("x")) valorOperacao = valorOperacao.replaceAll("x", "*");

    if (valorOperacao.includes(",")) valorOperacao = valorOperacao.replaceAll(",", ".");

    return evaluate(valorOperacao);
}

function trataResultado(resultadoOperacao) {
    if (resultadoOperacao.toString().includes(".")) resultadoOperacao = resultadoOperacao.toString().replace(".", ",");

    return resultadoOperacao;
}

function limpaUltimoDigito(){
    let valorAtual = document.getElementById("resultadoCalculadora").value;

    document.getElementById("resultadoCalculadora").value = valorAtual.substring(0, valorAtual.length - 1);
}

function adicionarOperacaoHistorico(formula, resultado){
    document.getElementById("operacoesRealizadas").innerHTML += `${formula} = ${resultado}<br>`;
}