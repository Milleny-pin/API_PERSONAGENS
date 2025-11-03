const favotito = function (event){
    const coracao = event.currentTarget;

    coracao.classList.toggle('favorited');

    if (coracao.classList.contains('favorited')){
        coracao.innerHTML = '&#9829;';
    }
    else{
        icon.innerHTML = '&#9825;';
    }
};

