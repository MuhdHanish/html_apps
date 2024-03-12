let audioUrl = ''; 
const sound = document.getElementById('sound');
const result = document.getElementById('result');
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en';
const searchButton = document.getElementById('search-button');

searchButton.addEventListener("click", () => {
    let inputWord = document.getElementById('input-box').value;
    if (!inputWord) return;
    fetch(`${url}/${inputWord}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            result.innerHTML =
                `<div class="word">
                <h3>${inputWord}</h3>
                <button type="button">
                    <i class="fas fa-volume-up" onclick="playSound()"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0]?.meanings[0]?.partOfSpeech || ''}</p>
                <p>${data[0]?.phonetic || ''}</p>
            </div>
            <p class="word-meaning">
                ${data[0]?.meanings[0]?.definitions[0]?.definition || ''}
            </p>
            <p class="word-example">
                ${data[0]?.meanings[0]?.definitions[0]?.example || ''}
            </p>`;

            if (data[0]?.phonetics && data[0]?.phonetics?.length && data[0]?.phonetics[0]?.audio) {
                audioUrl = data[0]?.phonetics[0]?.audio;
            } else {
                audioUrl = '';
            }
            sound.setAttribute("src", audioUrl);
        })
        .catch((_error) => {
            result.innerHTML = `<div class="word"><h3>Couldn't Find The Word</h3></div>`;
        });
});

function playSound() {
    if (audioUrl) {
        sound.play();
    } else {
        return;
    }
}