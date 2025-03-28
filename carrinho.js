let produtos = [
    { id: 1, nome: "Vestido Longo", preco: 79.90, estoque: 5 },
    { id: 2, nome: "Vestido Curto Detalhe", preco: 79.90, estoque: 3 },
    { id: 3, nome: "Calça Alfaiataria", preco: 79.90, estoque: 4 },
    { id: 4, nome: "Camisa Oversized", preco: 79.90, estoque: 6 },
    { id: 5, nome: "Calça Moletom Masculina", preco: 79.90, estoque: 2 },
    { id: 6, nome: "Vestido Malha", preco: 79.90, estoque: 5 },
    { id: 7, nome: "Blusa Canelada Um Ombro", preco: 79.90, estoque: 7 },
    { id: 8, nome: "Conjunto Jeans", preco: 79.90, estoque: 4 },
    { id: 9, nome: "Regata Oversized", preco: 79.90, estoque: 5 },
    { id: 10, nome: "Calça Jeans", preco: 79.90, estoque: 6 },
    { id: 11, nome: "Camisa Polo", preco: 79.90, estoque: 7 },
    { id: 12, nome: "Calça Alfaiataria Masculina", preco: 79.90, estoque: 5 }
];

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function adicionarAoCarrinho(button) {
    let produtoId = button.getAttribute("data-id");
    let produto = produtos.find(p => p.id == produtoId);

    if (produto.estoque > 0) {
        produto.estoque--;
        let itemCarrinho = carrinho.find(item => item.id == produtoId);

        if (itemCarrinho) {
            itemCarrinho.quantidade++;
        } else {
            carrinho.push({ ...produto, quantidade: 1 });
        }

        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarEstoque(produtoId);
    } else {
        alert("Produto fora de estoque!");
    }
}

function atualizarEstoque(produtoId) {
    let produto = produtos.find(p => p.id == produtoId);
    document.getElementById(`estoque-${produtoId}`).textContent = produto.estoque;
}

function atualizarCarrinho() {
    let container = document.getElementById("carrinho");
    container.innerHTML = "";
    let total = 0;

    if (carrinho.length === 0) {
        container.innerHTML = "<p>Seu carrinho está vazio.</p>";
        document.getElementById("valorTotal").textContent = "0.00";
        return;
    }

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
        container.innerHTML += `
            <div>
                <p>${item.nome} - R$ ${item.preco} x ${item.quantidade} 
                <button onclick="removerDoCarrinho(${item.id})">Remover</button></p>
            </div>
        `;
    });

    document.getElementById("valorTotal").textContent = total.toFixed(2);
}

function removerDoCarrinho(id) {
    let itemIndex = carrinho.findIndex(item => item.id == id);
    let produto = produtos.find(p => p.id == id);

    if (itemIndex !== -1) {
        let item = carrinho[itemIndex];
        if (item.quantidade > 1) {
            item.quantidade--;
        } else {
            carrinho.splice(itemIndex, 1);
        }

        produto.estoque++;
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinho();
    }
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let reciboDetalhes = document.getElementById("reciboDetalhes");
    reciboDetalhes.innerHTML = "<p><strong>Resumo da Compra:</strong></p>";
    
    let total = 0;
    carrinho.forEach(item => {
        reciboDetalhes.innerHTML += `<p>${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}</p>`;
        total += item.preco * item.quantidade;
    });

    reciboDetalhes.innerHTML += `<p><strong>Total: R$ ${total.toFixed(2)}</strong></p>`;

   
    document.getElementById("reciboModal").style.display = "block";

    
    carrinho = [];
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

function fecharRecibo() {
    document.getElementById("reciboModal").style.display = "none";
}



if (document.getElementById("carrinho")) {
    atualizarCarrinho();
}
