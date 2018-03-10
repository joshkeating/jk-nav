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



// TODO: eventually needs to handle toggling active sites


// --- extension plan ---
// page action with checkbox that enables/disables running on that page
// page action also has link to options.html page
// event page that stores data and listens for keypresses
// content script that sends a message to event page as it traverses dom



// create array of sites
let allSites: Page[] = [];
allSites.push(new Page('https?://news\.ycombinator\.com\/.*', '.storylink'));
allSites.push(new Page('^https?://(www\.)?google\.([a-z\.]+)\/(?!reader\/).*$', 'h3.r > a'));
allSites.push(new Page('https?://(www\.)?reddit\.com\/.*', '#siteTable div.entry a.title'));
allSites.push(new Page('https?://arstechnica\.com\/.*', 'h2 > a'));

// determines if given url 
function checkSiteValid(url: string): string {
    for (let index = 0; index < allSites.length; index++) {
        const element = allSites[index];
        let regex: RegExp = new RegExp(element.getUrl(), 'i');
        if (regex.test(url)) {
            return element.getSelectors();
        } 
    }
    return null;
}

let isEnabledFlag: boolean = true;

// need a listener for:
    // url that we care about [done]
    // page action
     

// Listener keeps the event page open until not needed
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (checkSiteValid(request.url) && isEnabledFlag) {
        let responseString: string = checkSiteValid(request.url);
        sendResponse({pattern: responseString});
    }
    return true;
});
