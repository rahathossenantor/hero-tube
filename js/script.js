console.clear();
// short version of document.getElementById();
const getElement = id => document.getElementById(id);

// convert seconds to hours
const secondsToHours = (seconds) => {
    const milliseconds = seconds * 1000;
    const date = new Date(milliseconds);
    const hours = date.getUTCHours();
    return hours;
}

// convert seconds to minutes
const secondsToMinutes = (seconds) => {
    const date = new Date(0);
    date.setSeconds(seconds);    
    const minutes = date.getMinutes();
    return minutes;
}

// load category buttons
const loadCategoryButtons = async () => {
    const categoryContainer = getElement("category-btn-container");
    categoryContainer.innerHTML = "";

    // load category data
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    const categories = data.data;
    
    // display category buttons
    for(let category of categories) {
        const categoryButtonDiv = document.createElement("div");
        categoryButtonDiv.innerHTML = `
            <button onclick="loadCardContents('${category.category_id}')" class="btn normal-case font-normal px-[25px] text-[17px] category-btn">${category.category}</button>
        `;
        categoryContainer.appendChild(categoryButtonDiv);
    }
}

// handle category button click
let cards = [];
const loadCardContents = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    cards = data.data;
    renderCards(cards);
}

// render cards on UI
const renderCards = (cards, isSorted = false) => {
    const videosContainer = getElement("videos-container");
    videosContainer.innerHTML = "";

    // sorting cards if sort button clicked
    if (isSorted) {
        cards = cards.sort((a, b) => parseInt(b.others.views) - parseInt(a.others.views));
    }

    if (cards.length > 0) {
        videosContainer.classList.add("grid");
        for (const card of cards) {
            // getting videos duration
            const hours = secondsToHours(parseInt(card.others.posted_date));
            const minutes = secondsToMinutes(parseInt(card.others.posted_date));

            // rendering cards
            const div = document.createElement("div");
            div.innerHTML = `
                <div class="mb-4 relative">
                    <img src="${card.thumbnail}" alt="image" class="w-full h-[220px] inline-block rounded-lg">
                    ${card.others.posted_date ? `<div class="absolute bottom-3 right-3 bg-[#171717] rounded-md px-2 py-1"><p class="text-white">${hours} hrs ${minutes} min ago</p></div>` : ``}
                </div>
                <div class="flex">
                    <div class="mr-4">
                        <img src="${card.authors[0].profile_picture}" alt="author" class="inline-block w-[50px] h-[50px] rounded-full">
                    </div>
                    <div>
                        <h4 class="text-xl font-semibold">${card.title}</h4>
                        <p class="text-[17px] my-1">${card.authors[0].profile_name} ${card.authors[0].verified ? `<img src="./images/varified.svg" alt="varified" class="inline-block">` : ``}</p>
                        <p class="text-[17px]">${card.others.views} views</p>
                    </div>
                </div>
            `;
            videosContainer.appendChild(div);
        }
    } else {
        // handling empty container (showing error message if cards.length === 0)
        videosContainer.classList.remove("grid");
        videosContainer.innerHTML = `
        <div class="flex items-center justify-center error-container">
            <div class="text-center">
                <div class="flex justify-center"><img src="./images/Icon.png" alt="icon" class="inline-block mb-5"></div>
                <h1 class="text-3xl font-semibold">Oops! Sorry!!! Content unavailable!</h1>
            </div>
        </div>
        `;
    }
}

// handle sort by views button
const sortCardsByViews = () => {
    renderCards(cards, true);
}

// initial function calls
loadCategoryButtons();
loadCardContents(1000);