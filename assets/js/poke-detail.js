//função para pegar o id da query string
function getPokemonIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function updatePokemonDetails(pokemon) {
    const pokemonDetailHtml = `
        <div class="pokemon-detail-card ${pokemon.type}">
            <span>#${pokemon.number}</span>
            <span>${pokemon.name}</span>
            <div class="circle-container">
                <img src="${pokemon.photo}" alt="${pokemon.name}" class="pokemon-image">
            </div>
        </div>
        <div class="pokemon-info">
            <div class="pokemon-info-types">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </div>
            <div class="divider"></div>
            <ol class="stats-info">
                <h1>Basic information</h1>
                <div class=basic-info>
                    <span>Height: ${pokemon.height}</span>
                    <span class="right">Weight: ${pokemon.weight}</span>
                </div>
                <h1>Base Stats</h1>
                <div class="stats">
                    <hr>
                    ${pokemon.statNames.map((statName) => `
                        <div class="stats-row">
                            <li>${statName}: </li>
                            <span class="value">${pokemon[statName]}</span>
                        </div>
                    `).join('')}
                </div>
            </ol>
        </div>
        <div class="back">
            <button class="back-button ${pokemon.type}" type="button" onclick="redirectToIndex()">Go to Index</button>
        </div>
    `;

    const pokemonDetailPlaceholder = document.getElementById('pokemonDetail');
    pokemonDetailPlaceholder.innerHTML = pokemonDetailHtml;
}

function initializePokemonDetailPage(pokemonId) {
    pokeApi.getPokemonDetail({ url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}/` })
        .then(pokemon => {
            updatePokemonDetails(pokemon);
        })
        .catch(error => console.error('Error fetching Pokemon details:', error));
}

const pokemonId = getPokemonIdFromUrl();

initializePokemonDetailPage(pokemonId);

function redirectToIndex(){
    window.location.href = "/index.html";
}
