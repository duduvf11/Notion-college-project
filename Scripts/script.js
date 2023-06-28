let postagens = [];


function adicionarPostagem(event) {
    event.preventDefault();

    let titulo = document.getElementById('titulo').value;
    let imagem = document.getElementById('imagem').value;
    let data = document.getElementById('data').value;
    let conteudo = document.getElementById('conteudo').value;

    const postagem = {
        titulo,
        imagem,
        data,
        conteudo
    }
    postagens.push(postagem);

    document.getElementById('formulario').reset();

    exibirPostagem();
}

function exibirPostagem() {
    const postFinal = document.querySelector('.postagem-final');
    const postCards = document.querySelectorAll(`.card`);
    postCards.forEach((card) => {
        card.parentNode.removeChild(card);
      });
    
    postagens.forEach((postagem, index) => {
        const postagemDiv = document.createElement('div');
        postagemDiv.classList.add('card');
        postagemDiv.id = `card-${index}`;
        
        const imageBlock = (postagem.imagem) ? `<img src="${postagem.imagem}" alt="Imagem da Postagem">` : ``;
        
        postagemDiv.innerHTML =
        `<h3>${postagem.titulo}</h3>
        ${imageBlock}
        <p>Data: ${postagem.data}</p>
        <p>${postagem.conteudo}</p>
        <button onclick="editarPostagem(${index})">Editar</button>
        <button onclick="removerPostagem(${index})">Remover</button>`;
        
        postFinal.appendChild(postagemDiv);
    });
}

function buscarPostagem() {
    const termoBusca = document.getElementById('busca').value.toLowerCase();

    const postagensFiltradas = postagens.filter(postagem => {
        const titulo = postagem.titulo.toLowerCase();
        const conteudo = postagem.conteudo.toLowerCase();
        return titulo.includes(termoBusca) || conteudo.includes(termoBusca);
    });

    const postCards = document.querySelectorAll(`.card`);
    postCards.forEach((card) => {
        card.parentNode.removeChild(card);
      });

      const postFinal = document.querySelector('.postagem-final');

    postagensFiltradas.forEach((postagem, index) => {
        const postagemDiv = document.createElement('div');
        postagemDiv.classList.add('card');
        postagemDiv.id = `card-${index}`;
        
        const imageBlock = (postagem.imagem) ? `<img src="${postagem.imagem}" alt="Imagem da Postagem">` : ``;
        
        postagemDiv.innerHTML =
        `<h3>${postagem.titulo}</h3>
        ${imageBlock}
        <p>Data: ${postagem.data}</p>
        <p>${postagem.conteudo}</p>
        <button onclick="editarPostagem(${index})">Editar</button>
        <button onclick="removerPostagem(${index})">Remover</button>`;
        
        postFinal.appendChild(postagemDiv);
    });
}