import { Page } from './page'

// this is going to be the event page

// background goes here
// use this to To handle key chords 
// on j or k press, move to next element in the page link list
// var elems = document.getElementsByTagName("iframe");

// --- extension plan ---




// use page actions on the select list of sites
// page actions should have popup that allows disabling and a link to the options page
// options page, should allow the change of selectors (maybe add your own?)

// === plan v2 ===
// page action with checkbox that enables/disables running on that page
// page action also has link to options.html page
// event page that stores data and listens for keypresses
// content script that sends a message to event page as it traverses dom



// get current tab
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
});
