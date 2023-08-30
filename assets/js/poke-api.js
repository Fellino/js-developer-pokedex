const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot)=> typeSlot.type.name);
    const [type] = types;

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other["official-artwork"].front_default

    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    
    const statNames = pokeDetail.stats.map((statSlot) => statSlot.stat.name);
    pokemon.statNames = statNames;

    statNames.forEach((statName) => {
        const statSlot = pokeDetail.stats.find((statSlot) => statSlot.stat.name === statName);
        if (statSlot) {
            pokemon[statName] = statSlot.base_stat;
        } else {
            pokemon[statName] = "not found";
        }
    });

    console.log("Pokemon object:", pokemon);

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((getPokemon) => getPokemon.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonDetails) => pokemonDetails)
}