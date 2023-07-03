const postagens = [];


function adicionarPostagem(event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const imagem = document.getElementById('imagem').value;
    const data = document.getElementById('data').value;
    const conteudo = document.getElementById('conteudo').value;

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

function editarPostagem(index) {
  const postagem = postagens[index];

  document.getElementById('titulo').value = postagem.titulo;
  document.getElementById('imagem').value = postagem.imagem;
  document.getElementById('data').value = postagem.data;
  document.getElementById('conteudo').value = postagem.conteudo;

  removerPostagem(index);
}

function removerPostagem(index) {
  postagens.splice(index, 1);
  const post = document.getElementById(`card-${index}`);
  post.remove();
  exibirPostagem();
}

document.getElementById('formulario').addEventListener('submit', adicionarPostagem);
document.getElementById('buscar').addEventListener('click', buscarPostagem);