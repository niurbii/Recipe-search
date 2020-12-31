const form = document.querySelector('form');
const res = document.querySelector('.search-result');
const container = document.querySelector('.container');
const App_ID = 'c7dcef81';
const APP_Key = '06dc5346fb0cadeafa8c60a675ffd7cb';
let searchQuery = '';

form.addEventListener('submit', (s) => {
    s.preventDefault();
    searchQuery = s.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI () {
    const URL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${App_ID}&app_key=${APP_Key}&to=20`;
    const response = await fetch(URL);
    const data = await response.json();
    genHTML(data.hits);
    console.log(data);
}

function genHTML(results) {
    let HTMLgenerated = '';
    results.map(result => {
        HTMLgenerated +=
        `
        <div class="item">
            <img src="${result.recipe.image}" alt="">
            <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a class="view-btn" href="${result.recipe.url}" target="_blank">View Recipe</a>
            </div>
            <p class="item-data">Total Time: ${result.recipe.totalTime} minutes</p>
        </div>
        `
    })
    res.innerHTML = HTMLgenerated;
}