// import { Page } from './page';

class Page {

    private urlRegex: string;
    private selector: string;

    constructor(urlRegex: string, selectors: string) {
        this.urlRegex = urlRegex;
        this.selector = selectors;
    }

    getUrl() {
        return this.urlRegex;
    }

    getSelectors() {
        return this.selector;
    }

    setSelectors() {

    }

    matchSite(url: string, allPages: Page[]): boolean {
        allPages.forEach(element => {
            let regex: RegExp = new RegExp(this.urlRegex, 'i');
            return regex.test(url);
        });
        return false;

    }
}

// Alright I think this is actually how it needs to work
// ====================================================
// content script needs to send message to the event page
// event page then decides what to do with that page depending on the page
// ====================================================


// this is going to be the event page

// should stay open until not needed

// TODO: eventually needs to handle toggling active sites

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

// chrome.storage.sync.set({ sites }, function(){
//     console.log('Settings saved');
// });

let tmpPage: Page = new Page('https?://news\.ycombinator\.com\/.*', '.storylink');

// create array of sites
let allSites: Page[] = [];
allSites.push(new Page('https?://news\.ycombinator\.com\/.*', '.storylink'));
allSites.push(new Page('^https?://(www\.)?google\.([a-z\.]+)\/(?!reader\/).*$', 'h3.r > a'));
allSites.push(new Page('https?://(www\.)?reddit\.com\/.*', '#siteTable div.entry a.title'));


function checkSiteValid(url: string): string {

    for (let index = 0; index < allSites.length; index++) {
        const element = allSites[index];
        let regex: RegExp = new RegExp(element.getUrl(), 'i');

        if (regex.test(url)) {
            // console.log("great success");
            return element.getSelectors();
        } 
        
    }
    return null;
        
}

let isEnabledFlag: boolean = true;

// need a listener for:
    // url that we care about [done]
    // page action
     

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (checkSiteValid(request.url) && isEnabledFlag) {
        let responseString: string = checkSiteValid(request.url);
        console.log(responseString);
        sendResponse({pattern: responseString});
    }
    //FIXME: not sure if we want to do async here
    return true;
});
