const joke = document.getElementById("joke");
const generateButton = document.getElementById("generate-button");
const url = "https://v2.jokeapi.dev/joke/Programming?type=single";

window.onload = getJoke;

function getJoke () {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Response was not ok`);
            }
            return response.json();
        })
        .then((data) => {
            joke.textContent = data.joke;
        })
        .catch(error => console.error(error));
};

