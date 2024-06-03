const listaPokemon = document.querySelector("#listaPokemon")
const buttonsHeader = document.querySelectorAll(".btn-header")
const URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then(response => response.json())
        .then(data => mostrarPokemon(data));
}

function mostrarPokemon(data) {

    let types = data.types.map(type => `<p class="${type.type.name} tipo">${type.type.name}</p>`)
    alltypes = types.join("");
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////*/
    let pokeID = data.id.toString()
    if (pokeID.length === 1) {
        pokeID = "00" + pokeID;
    } else if (pokeID.length === 2) {
        pokeID = "0" + pokeID;
    }
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////*/
    const div = document.createElement("div")
    div.classList.add("pokemon")
    div.innerHTML =
        `<p class="pokemon-id-back">${pokeID}</p>
        <div class="pokemon-imagen">
        <img
            src="${data.sprites.other["official-artwork"].front_default}"
            alt="${data.name}"
        />
        </div>
        <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">${pokeID}</p>
            <h2 class="pokemon-nombre">${data.name}</h2>
        </div>
        <div class="pokemon-tipos">
            ${alltypes}
        </div>
        <div class="pokemon-stats">
            <p class="stat altura">${data.height} FT</p>
            <p class="stat peso">${data.weight} LB</p>
        </div>`;

    listaPokemon.append(div)
}

buttonsHeader.forEach(buton => buton.addEventListener("click", (event) => {
    const buttonID = event.currentTarget.id;
    listaPokemon.innerHTML = ""

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then(response => response.json())
            .then(data => {

                if (buttonID === "ver-todos") {
                    mostrarPokemon(data)
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(buttonID))) {
                        mostrarPokemon(data);
                    }
                }
            });
    }
}));