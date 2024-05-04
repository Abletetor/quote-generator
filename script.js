const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show loading 
function showLoading () {
     loader.hidden = false;
     quoteContainer.hidden = true;
}

// hide loading after API quotes fetched
function hideLoading () {
     quoteContainer.hidden = false;
     loader.hidden = true;
}
// show new quotes
function newQuote () {
     showLoading();
     // pick a randomquote from apiQuotes array
     const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
     // check if Author field is blank and replace it with "Unknown"
     if (!quote.author) {
          authorText.textContent = "Unknown";
     } else {
          authorText.textContent = quote.author;
     }

     // check Quote length to determine styling
     if (quote.text > 120) {
          quoteText.classList.add("long-quote");
     } else {
          quoteText.classList.remove("long-quote");
     }

     //set Quote , hide loader
     quoteText.textContent = quote.text;
     hideLoading();
}

//  Get Quote from API
async function getQuotes () {
     showLoading();
     const apiURL = 'https://type.fit/api/quotes';
     try {
          const response = await fetch(apiURL);
          console.log(response);
          apiQuotes = await response.json();
          newQuote();
     } catch (error) {
          alert(error.message);
     }
}

//Function to tweet a Quote
function tweetQuote () {
     const twitterURL = ` https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
     window.open(twitterURL, '_blank');
}

// buttons event handlers
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuotes();


// For local Quotes request
/*function newQuote () {
     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
     console.log(quote);
}
newQuote();*/

// footer year
