import fs from "fs-extra";
import axios from "axios";

async function fetchCharacters() {
  let allCharacters = [];
  let page = 1;
  let nextPage = `https://rickandmortyapi.com/api/character?page=${page}`;

  while (nextPage) {
    const response = await axios.get(nextPage);
    allCharacters = allCharacters.concat(response.data.results);
    nextPage = response.data.info.next;
  }

  return allCharacters;
}

async function generateFiles() {
  const characters = await fetchCharacters();
  await fs.outputJson("./src/data/characters.json", characters, { spaces: 2 });
}

generateFiles().then(() => console.log("Character data generated!"));
