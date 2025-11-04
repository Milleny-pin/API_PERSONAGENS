const toggleFavorite = function (event) {
    const coracao = event.currentTarget;
    coracao.classList.toggle('favorited');

    if (coracao.classList.contains('favorited')) {
        coracao.innerHTML = '&#9829;'; 
    } else {
        coracao.innerHTML = '&#9825;'; 
    }
};

const createCard = function (dados, index) {
    const container = document.getElementById('cardProdutos');
    if (!container || !dados.name) return;

    const divCard = document.createElement('div');
    const headerWrapper = document.createElement('div');
    const h2Titulo = document.createElement('h2');
    const Imagem = document.createElement('img');
    const h3Texto = document.createElement('h3');
    const favorite = document.createElement('span');

    divCard.className = 'caixa_produto card-hidden';
    headerWrapper.className = 'card-header-wrapper';
    Imagem.className = 'card-image';
    favorite.className = 'favorite-icon';

    h2Titulo.textContent = dados.name.toUpperCase();
    favorite.innerHTML = '&#9825;';
    favorite.dataset.id = dados.id;
    favorite.addEventListener('click', toggleFavorite);

    
    Imagem.src = dados.image;
    Imagem.alt = `Imagem do personagem ${dados.name} de Rick and Morty`;

    const details = `Espécie: ${dados.species || 'Desconhecida'} | Gênero: ${dados.gender || 'Desconhecido'}`;
    h3Texto.textContent = details;

    headerWrapper.append(h2Titulo, favorite);
    divCard.append(headerWrapper, Imagem, h3Texto);
    container.appendChild(divCard);

   
    setTimeout(() => {
        divCard.classList.remove('card-hidden');
    }, index * 100);
};

const getDadosAPI = async function () {
    try {
        const url = 'https://rickandmortyapi.com/api/character';
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erro ao buscar personagens: ${response.status}`);
        const data = await response.json();

        const personagens = data.results;

        const container = document.getElementById('cardProdutos');
        if (!container) return;

        container.innerHTML = '';
        personagens.forEach((personagem, index) => createCard(personagem, index));

    } catch (error) {
        console.error("Erro fatal na aplicação Rick and Morty:", error);
        const container = document.getElementById('cardProdutos');
        if (container) {
            container.innerHTML = `
                <p style="color: red; text-align: center;">
                    Erro ao carregar os personagens de Rick and Morty. Verifique o console.
                </p>
            `;
        }
    }
};

getDadosAPI();

