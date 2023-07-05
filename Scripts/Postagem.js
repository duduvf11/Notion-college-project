class Postagem {

  constructor(titulo, imagem, data, conteudo) {
    this.titulo = titulo;
    this.imagem = imagem;
    this.data = data;
    this.conteudo = conteudo;
    this.postId = Math.random() * 999999 + 1;
  }

  adicionarPostagem() {
    const postagens = JSON.parse(localStorage.getItem('postagens'));
    if(postagens) {
      postagens.push(this);
      localStorage.setItem('postagens', JSON.stringify(postagens));
    } else {
      localStorage.setItem('postagens', JSON.stringify([this]));
    }
    this.exibirPostagem();
  }

  exibirPostagem() {
    this.cleanCards();
    const postagens = JSON.parse(localStorage.getItem('postagens'));
    if(postagens) {
      this.renderPostCard(postagens);
    }
  }

  renderPostCard(postagens) {
    const postFinal = document.querySelector('.postagem-final');
    postagens.forEach((postagem) => {
      const postagemDiv = document.createElement('div');
      postagemDiv.classList.add('card');
      postagemDiv.id = `card-${postagem.postId}`;

      const imageBlock = postagem.imagem ? `<img src="${postagem.imagem}" alt="Imagem da Postagem">` : '';

      postagemDiv.innerHTML = `
          <h3>${postagem.titulo}</h3>
          ${imageBlock}
          <p>Data: ${postagem.data}</p>
          <p>${postagem.conteudo}</p>
          <button onclick="postagem.editarPostagem(${postagem.postId})">Editar</button>
          <button onclick="postagem.removerPostagem(${postagem.postId})">Remover</button>`;

      postFinal.appendChild(postagemDiv);
    });
  }

  buscarPostagem() {
    const termoBusca = document.getElementById('busca').value.toLowerCase();

    const postagens = JSON.parse(localStorage.getItem('postagens'));
    if(postagens) {
      const postagensFiltradas = postagens.filter((postagem) => {
        const titulo = postagem.titulo.toLowerCase();
        const conteudo = postagem.conteudo.toLowerCase();
        return titulo.includes(termoBusca) || conteudo.includes(termoBusca);
      });
      this.cleanCards();
      this.renderPostCard(postagensFiltradas);
   }
  }

  cleanCards() {
    const postCards = document.querySelectorAll('.card');
    postCards.forEach((card) => {
      card.parentNode.removeChild(card);
    });
  }

  editarPostagem(postId) {
    modalBackdrop.style.display = 'flex'
    const postagens = JSON.parse(localStorage.getItem('postagens'));

    if(postagens) {
      const postagem = postagens.filter(e => e.postId === postId)[0];

      const title = document.getElementById('titulo-editar');
      const image = document.getElementById('imagem-editar');
      const date = document.getElementById('data-editar');
      const content = document.getElementById('conteudo-editar');
  
      title.value = postagem.titulo;
      image.value = postagem.imagem;
      date.value = postagem.data;
      content.value = postagem.conteudo;

      document.getElementById('saveBtn').addEventListener('click', () => {
        modalBackdrop.style.display = 'none'
        
        postagens.forEach(e => {
          if(e.postId === postId) {
            e.titulo = title.value;
            e.imagem = image.value;
            e.data = date.value;
            e.conteudo = content.value;
          }
        })

        localStorage.setItem('postagens', JSON.stringify(postagens));
        this.exibirPostagem();
      });
  
      document.getElementById('cancelBtn').addEventListener('click', () => {
        document.getElementById('modalForm').reset();
        modalBackdrop.style.display = 'none';
      });
    }
  }

  removerPostagem(postId) {
    const postagens = JSON.parse(localStorage.getItem('postagens'));
    if(postagens) {
      const index = postagens.findIndex(e => e.postId === postId);
      postagens.splice(index, 1);
      localStorage.setItem('postagens', JSON.stringify(postagens)); 
      document.getElementById(`card-${postId}`).remove();
    }
    this.cleanCards();
    this.exibirPostagem();
  }
}

const postagem = new Postagem();
postagem.exibirPostagem();

document.getElementById('formulario').addEventListener('submit', (event) => {
  event.preventDefault();

  let titulo = document.getElementById('titulo').value;
  let imagem = document.getElementById('imagem').value;
  let data = document.getElementById('data').value;
  let conteudo = document.getElementById('conteudo').value;

  const novaPostagem = new Postagem(titulo, imagem, data, conteudo);
  novaPostagem.adicionarPostagem();

  document.getElementById('formulario').reset();
});

document.getElementById('buscar').addEventListener('click', () => {
  postagem.buscarPostagem();
});