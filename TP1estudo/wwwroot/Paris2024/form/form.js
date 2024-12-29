
function submitFeedback () {
    var select = document.getElementById('tipo');
    var mensagem = document.getElementById('mensagem');

    feedback = {
        id: Date.now(),
        select: select.value,
        mensagem: mensagem.value,        
    };
    
    if (mensagem.value.trim().split(' ').length < 3) {
        alert("A mensagem deve ter no mínimo três palavras.");
        return; 
    }

    // Determina a chave de armazenamento com base no tipo
    if (select.value === 'sugestao') {
        salvarFeedback('sugestoes', feedback);
    } else if (select.value === 'bug') {
        salvarFeedback('bugs', feedback);
    } else {
        alert("Selecione um tipo válido.");
    }
}

// Função para salvar no localStorage
function salvarFeedback(chave, novoFeedback) {
    // Recupera os itens armazenados (se existirem)
    var lista = JSON.parse(localStorage.getItem(chave)) || [];

    // Adiciona o novo feedback à lista
    lista.push(novoFeedback);

    // Atualiza o localStorage
    localStorage.setItem(chave, JSON.stringify(lista));

    alert("Feedback enviado com sucesso!");
}

