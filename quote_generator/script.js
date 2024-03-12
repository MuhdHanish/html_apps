const quote = document.getElementById("quote");
const author = document.getElementById("author");
const generateButton = document.getElementById("generate-button");

const url = "https://api.quotable.io/quotes/random";

window.onload = getQuote;
function getQuote() { 
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Reponse was not ok`);
            }
            return response.json();
        })
        .then((data) => {
            quote.textContent = data[0].content;
            author.textContent = data[0].author;
        })
        .catch(error => console.error(error));
};