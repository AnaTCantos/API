const apiURL = "https://finalspaceapi.com/api/v0/character";
let allCharacters = [];

async function fetchAllCharacters() {
    try {
        const response = await fetch(apiURL);

        if (response.ok) {
            allCharacters = await response.json();
            displayCharacters(allCharacters);
        } else {
            console.error(`Error: ${response.status}`);
            document.getElementById("character-list").innerText = "Error al cargar los personajes";
        }
    } catch (error) {
        console.error("Error al hacer la solicitud:", error);
        document.getElementById("character-list").innerText = "Error de conexión";
    }
}

function filterCharacters(nameQuery = "", statusQuery = "") {
    let filteredCharacters = allCharacters;

    if (nameQuery) {
        filteredCharacters = filteredCharacters.filter((character) =>
            character.name.toLowerCase().includes(nameQuery.toLowerCase())
        );
    }

    if (statusQuery) {
        filteredCharacters = filteredCharacters.filter(
            (character) => character.status.toLowerCase() === statusQuery.toLowerCase()
        );
    }

    displayCharacters(filteredCharacters);
}

function displayCharacters(characters) {
    const characterList = document.getElementById("character-list");
    characterList.innerHTML = "";

    characters.forEach((character) => {
        const characterDiv = document.createElement("div");
        characterDiv.classList.add("character");

        characterDiv.innerHTML = `
            <img src="${character.img_url}" alt="${character.name}">
            <div class="character-content">
                <h2>${capitalizeWords(character.name)}</h2>
                <p><strong>Especie:</strong> ${character.species}</p>
                <p><strong>Estado:</strong> ${capitalizeWords(character.status)}</p>
            </div>
        `;

        characterList.appendChild(characterDiv);
    });
}

function capitalizeWords(text) {
    return text
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

const loadButton = document.getElementById("load-button");
const nameFilterEl = document.getElementById("name-filter");
const statusFilterEl = document.getElementById("status-filter");
const searchButton = document.getElementById("search-button");

loadButton.addEventListener("click", () => {
    fetchAllCharacters();
    document.getElementById("filters").style.display = "block";
    loadButton.style.display = "none";
});

searchButton.addEventListener("click", () => {
    filterCharacters(nameFilterEl.value, statusFilterEl.value);
});

statusFilterEl.addEventListener("change", () => {
    filterCharacters(nameFilterEl.value, statusFilterEl.value);
});
