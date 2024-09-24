const accessKey = "G9MhBcHw5tGQtFoXKrB7BWx41wji9yhvYdDbSQzJHC0";

const inputEl = document.getElementById('search-input');
const searchResults = document.querySelector('.search-results');
const formEl = document.querySelector('form');
const showMore = document.getElementById('show-more');

let inputData = "";
let page = "";

async function searchImage(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    let response = await fetch(url);
    let data = await response.json();
    let results = data.results;

    if(page === 1){
        searchResults.innerHTML = "";
    }

    results.map(function (results){
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('shadow-lg', 'rounded-b-lg', 'pb-2');

        const images = document.createElement('img');
        images.classList.add('w-full', 'md:h-5/6', 'lg:w-64', 'lg:h-96', 'rounded-t-md');
        images.src = results.urls.small;
        images.alt = results.alt_description;

        const imgLink = document.createElement('a');
        imgLink.classList.add('block', 'p-3', 'lg:w-56', 'capitalize', 'text-xs', 'lg:text-sm', 'font-semibold');
        imgLink.href = results.links.html;
        imgLink.target = "_blank";
        imgLink.textContent = results.alt_description;

        imageWrapper.appendChild(images);
        imageWrapper.appendChild(imgLink);
        searchResults.appendChild(imageWrapper);
    })
    page++
    if(page > 1){
        showMore.style.display = "block";
    }
}
formEl.addEventListener('submit', function(e){
    e.preventDefault();
    page = 1;
    searchImage();
})
showMore.addEventListener('click',function(){
    searchImage();
})