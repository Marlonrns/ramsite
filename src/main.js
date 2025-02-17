const list = document.getElementById("character-list");

async function fetchAllCharacters() {
    let allCharacters = [];
    let page = 1;
    let nextPage = `https://rickandmortyapi.com/api/character?page=${page}`;

    while (nextPage) {
        const response = await fetch(nextPage);
        const data = await response.json();
        allCharacters = allCharacters.concat(data.results);
        nextPage = data.info.next;
    }

    return allCharacters;
}

fetchAllCharacters().then((characters) => {
    characters.forEach((character) => {
        if (character.name) {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = `./${character.id}_${character.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.html`;
            link.textContent = character.name;
            listItem.appendChild(link);
            list.appendChild(listItem);
        }
    });
});
