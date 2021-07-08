let url = `https://pokeapi.co/api/v2/pokemon`;

document.querySelector("#random-button").addEventListener("click", () => {

    fetch(`${url}/${randomPokemonNumber()}`)
    .then((response) => response.json())
    .then((json) => {
      typeColor(json);
      return displayInfo(json);
    })
    .then((speciesInfo) => {
      fetch(speciesInfo)
        .then((response) => response.json())
        .then((speciesData) => displaySpecies(speciesData));
    });
})

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let pokemon = document.querySelector("input").value;
  fetch(`${url}/${pokemon.toLowerCase()}`)
    .then((response) => response.json())
    .then((json) => {
      typeColor(json);
      return displayInfo(json);
    })
    .then((speciesInfo) => {
      fetch(speciesInfo)
        .then((response) => response.json())
        .then((speciesData) => displaySpecies(speciesData));
    });
    document.querySelector("input").value = "";
});

let displayInfo = (pokeData) => {
  //Name
  document.querySelector("#pokeName").innerText = `${pokeData.name
    .slice(0, 1)
    .toUpperCase()}${pokeData.name.slice(1, pokeData.name.length)}`;

  //Height
  let height = Math.round(10 * pokeData.height * 0.334) / 10;
  document.querySelector("#height").innerHTML = `<b>Height:</b> ${height} ft`;

  //weight
  let weight = Math.round((10 * pokeData.weight) / 4.536) / 10;
  document.querySelector("#weight").innerHTML = `<b>Weight: </b> ${weight} lbs`;

  //Get and set the type

  //Image
  let pokePic = pokeData.sprites.other.dream_world.front_default;
  let officialArtPic = pokeData.sprites.other["official-artwork"].front_default

  if (pokePic) {
    document.querySelector("img").setAttribute("src", pokePic);
  } else {
    document
      .querySelector("img")
      .setAttribute(
        "src",
        officialArtPic
      );
  }

  let speciesInfo = pokeData.species.url;
  return speciesInfo;
};

let displaySpecies = (speciesData) => {
  let genus = speciesData.genera[7].genus;
  let japName = speciesData.names[0].name;
  let pokeNumber = speciesData.pokedex_numbers[0].entry_number;

  document.querySelector("#pokeNumber").innerText = `no. ${pokeNumber}`;
  document.querySelector("#japName").innerText = `${japName} ..... ${genus}`;
};

let typeColor = (colorData) => {
  let typeP = document.querySelector("#type");
  let type1 = colorData.types[0].type.name;

  if (colorData.types.length == 2) {
    typeP.innerHTML = `<b>Type:</b> ${type1} ${colorData.types[1].type.name}`;
  } else {
    typeP.innerHTML = `<b>Type:</b> ${type1}`;
  }

  //Set Colors
  let htmlColor = document.querySelector("html");
  let textColor = document.querySelector("section");

  if (type1 == "normal") {
    htmlColor.style.backgroundColor = "#C6C6A7";
    textColor.style.color = "#6D6D4E";
  } else if (type1 == "psychic") {
    htmlColor.style.backgroundColor = "#FA92B2";
    textColor.style.color = "#A13959";
  } else if (type1 == "grass") {
    htmlColor.style.backgroundColor = "#A7DB8D";
    textColor.style.color = "#4E8234";
  } else if (type1 == "fire") {
    htmlColor.style.backgroundColor = "#f0803094";
    textColor.style.color = "#9C531F";
  } else if (type1 == "water") {
    htmlColor.style.backgroundColor = "#6890f0b8";
    textColor.style.color = "#445E9C";
  } else if (type1 == "electric") {
    htmlColor.style.backgroundColor = "#f8d030b0";
    textColor.style.color = "#A1871F";
  } else if (type1 == "flying") {
    htmlColor.style.backgroundColor = "#a890f09c";
    textColor.style.color = "#6D5E9C";
  } else if (type1 == "bug") {
    htmlColor.style.backgroundColor = "#a8b8209e";
    textColor.style.color = "#6D7815";
  } else if (type1 == "rock") {
    htmlColor.style.backgroundColor = "#b8a038a8";
    textColor.style.color = "#786824";
  } else if (type1 == "ground") {
    htmlColor.style.backgroundColor = "#e0c068bd";
    textColor.style.color = "#927D44";
  } else if (type1 == "poison") {
    htmlColor.style.backgroundColor = "#a040a0a6";
    textColor.style.color = "#682A68";
  } else if (type1 == "ghost") {
    htmlColor.style.backgroundColor = "#705898c7";
    textColor.style.color = "#493963";
  } else if (type1 == "dark") {
    htmlColor.style.backgroundColor = "#705848ba";
    textColor.style.color = "#49392F";
  } else if (type1 == "ice") {
    htmlColor.style.backgroundColor = "#98d8d8ad";
    textColor.style.color = "#638D8D";
  } else if (type1 == "fighting") {
    htmlColor.style.backgroundColor = "#c0302899";
    textColor.style.color = "#7D1F1A";
  } else if (type1 == "steel") {
    htmlColor.style.backgroundColor = "#b8b8d0a1";
    textColor.style.color = "#787887";
  } else if (type1 == "dragon") {
    htmlColor.style.backgroundColor = "#7038f887";
    textColor.style.color = "#4924A1";
  } else {
    htmlColor.style.backgroundColor = "#ee99aca1";
    textColor.style.color = "#9B6470";
  }
};

let randomPokemonNumber = () => {
  let randomNumber = Math.floor(Math.random() * 898) + 1
  return randomNumber
}