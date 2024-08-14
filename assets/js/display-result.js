const resultText= document.getElementById('result-text');
const resultcontent= document.getElementById('result-content');
const seachForm= document.getElementById('search-form');

function getParameters() {
    const searchP= document.location.search/split("&");

    const query= searchP[0].split('=').pop();
    const format= searchP[1].split('=').pop();

    searchApi(query, format);
}

function displayResults(res){
    console.log(res);

    const resCard= document.createElement('div');
    resBody.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

    const resBody= document.createElement('div');
    resBody.classList.add('card-body');
    resCard.append(resBody);

    const titleEl= document.createElement('h3');
    titleEl.textContent= res.title;

    const bodyContentEl= document.createElement('p');
    bodyContentEl.innerHTML=
    `<strong>Date:`
}