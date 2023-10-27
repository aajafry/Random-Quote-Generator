// DOM selection.
const inputQuoteTopic = document.querySelector("#QuoteCategory");
const inputQuoteNumber = document.querySelector("#QuoteLmit");
const submitBtn = document.querySelector("#quoteBtn");

const quoteContainer = document.querySelector(".quoteItems");

// quote topic specification and assign them to a array.
const quoteTopics = [
    "age",
"alone",
"amazing",
"anger",
"architecture",
"art",
"attitude",
"beauty",
"best",
"birthday",
"business",
"car",
"change",
"communications",
"computers",
"cool",
"courage",
"dad",
"dating",
"death",
"design",
"dreams",
"education",
"environmental",
"equality",
"experience",
"failure",
"faith",
"family",
"famous",
"fear",
"fitness",
"food",
"forgiveness",
"freedom",
"friendship",
"funny",
"future",
"god",
"good",
"government",
"graduation",
"great",
"happiness",
"health",
"history",
"home",
"hope",
"humor",
"imagination",
"inspirational",
"intelligence",
"jealousy",
"knowledge",
"leadership",
"learning",
"legal",
"life",
"love",
"marriage",
"medical",
"men",
"mom",
"money",
"morning",
"movies",
"success"
]

// API information.
const API_URL = "https://api.api-ninjas.com/v1/quotes";
const API_KEY = "3oh8EUHTE2iCSJdKQ/nT7w==F39pSlLxyt8U2qbn";

// insert the quote topic to select option.
inputQuoteTopic.innerHTML = quoteTopics.map(quoteTopic => {
    return `<option value="${quoteTopic}">${quoteTopic}</option>`
})

// create HTML template for qoute.
const createQuote = (text, author) => {
    return `
    <div class="quoteItem">
        <p class="quoteText">${text}</p>
        <h2 class="quoteAuthor">- ${author}</h2>
    </div>`
}
// fatch the random qoute generator API.
const fetchData = async (category, limit) =>{
    const requestOption = {
        method: 'GET',
        contentType: 'application/json',
        headers: { 'X-Api-Key': API_KEY},
    }
    const catCondition = category ? `?category=${category}` : ``;
    const limitCondition = limit ? `&limit=${limit}` : ``;
    const data = await ((await fetch(`${API_URL}${catCondition}${limitCondition}`, requestOption))).json();
    return data;
}

const generateQuote = async (event) => {
    event.preventDefault();
    // get the input value.
    const categoryValue = inputQuoteTopic.value;
    const limitValue = parseInt(inputQuoteNumber.value);
    // reset the DOM.
    quoteContainer.innerHTML = "";
    // call API for qoute.
    const getQuote =  await fetchData(categoryValue, limitValue);
    // display the qoute.
    quoteContainer.innerHTML += getQuote.map(Quote => {
        return createQuote(Quote.quote, Quote.author);
    }).join(" ");
    
    // reset the form input.
    inputQuoteNumber.value = "";
}

// event listener for changing the selected value.
inputQuoteTopic.onchange = (thisElement) => {
    return  thisElement.value;
}
// event listener for generate the qoute.
submitBtn.addEventListener("click", generateQuote);