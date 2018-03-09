import { Page } from './page'

// this is going to be the event page

// should stay open until not needed

// background goes here
// use this to To handle key chords 
// on j or k press, move to next element in the page link list
// var elems = document.getElementsByTagName("iframe");

// --- extension plan ---
// page action with checkbox that enables/disables running on that page
// page action also has link to options.html page
// event page that stores data and listens for keypresses
// content script that sends a message to event page as it traverses dom

// let sites = {
//     'google': {
//       regex:'^https?://(www\.)?google\.([a-z\.]+)\/(?!reader\/).*$',
//       selector: 'h3.r>a:nth(*)'
//     },
//     'news.ycombinator': {
//         regex: 'https?://news\.ycombinator\.com\/.*',
//         selector: '.storylink:nth(*)'
//     },
//     'reddit': {
//       regex: 'https?://(www\.)?reddit\.com\/.*',
//       selector: '#siteTable div.entry:nth(*) a.title'
//     }
// }

// create array of sites
let allSites: Page[];
allSites.push(new Page('https?://news\.ycombinator\.com\/.*', '.storylink:nth(*)'));
allSites.push(new Page('^https?://(www\.)?google\.([a-z\.]+)\/(?!reader\/).*$', 'h3.r>a:nth(*)'));
allSites.push(new Page('https?://(www\.)?reddit\.com\/.*', '#siteTable div.entry:nth(*) a.title'));




// get current tab
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
});
