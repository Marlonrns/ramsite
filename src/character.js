document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const characterId = params.get('id');

    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
        .then(response => response.json())
        .then(character => {
            document.getElementById('character-name').textContent = character.name;
            document.getElementById('character-image').src = character.image;
            document.getElementById('character-status').textContent = `Status: ${character.status}`;
        })
        .catch(error => console.error('Error fetching character:', error));
});
