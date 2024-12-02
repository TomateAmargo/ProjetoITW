let inputPrecoTotal = document.getElementById("total");
let inputQtdTotal = document.getElementById("quantidades");
let precoTotal = 0;
let qtdTotal = 0;


function addProduct(number) {
    let quantidadeProdutoSelecionado = document.getElementById("qty" + number);
    quantidadeProdutoSelecionado.value++;
    calculate();
}

function calculate() {
    let precAtual, qtdAtual;
    precoTotal = 0;
    qtdTotal = 0;

    for (let i = 1; i <= 6; i++) {
        precAtual = parseFloat(document.getElementById('price' + i).value);
        qtdAtual = parseFloat(document.getElementById('qty' + i).value);
        precoTotal += precAtual * qtdAtual;
        qtdTotal += qtdAtual;
    }

    if (precoTotal> 100) {
        precoTotal  = precoTotal * 0.95;
    }

    if (qtdTotal>= 5) {
        precoTotal  = precoTotal * 0.95;
    }
    
    inputQtdTotal.innerText = qtdTotal;
    inputPrecoTotal.innerText = precoTotal.toFixed(2);
}

function valid() {
    if (precoTotal <= 0 && qtdTotal <= 0) {
        alert("Erro o carrinho está vazio");
        return false;
    } else {
        return true
    }
}

function clean() {
    for (let i = 1; i <= 6; i++) {
        qtdAtual = document.getElementById('qty' + i).value = 0;
    }
    precoTotal = 0;
    qtdTotal = 0;
    inputPrecoTotal.innerText = "0.00";
    inputQtdTotal.innerText = 0;
}