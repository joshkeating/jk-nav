
class Page {

    private urlRegex: string;
    private selector: string;
    private enabled: boolean;

    constructor(urlRegex: string, selectors: string, enabled: boolean) {
        this.urlRegex = urlRegex;
        this.selector = selectors;
        this.enabled = enabled;
    }

    getUrl() {
        return this.urlRegex;
    }

    getSelectors() {
        return this.selector;
    }

    getEnabled() {
        return this.enabled;
    }

    setEnabled(isEnabled: boolean) {
        this.enabled = isEnabled;
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

chrome.runtime.onInstalled.addListener(function(obj) {
    chrome.storage.sync.set({'currentColor': '#800000'}, function() {});
});

// TODO: eventually needs to handle toggling active sites


// --- extension plan ---
// page action with checkbox that enables/disables running on that page
// page action also has link to options.html page
// event page that stores data and listens for keypresses
// content script that sends a message to event page as it traverses dom



// create array of sites
let allSites: Page[] = [];
allSites.push(new Page('https?://news\.ycombinator\.com\/.*', '.storylink', true));
allSites.push(new Page('^https?://(www\.)?google\.([a-z\.]+)\/(?!reader\/).*$', 'h3.r > a', true));
allSites.push(new Page('https?://(www\.)?reddit\.com\/.*', '#siteTable div.entry a.title', true));
allSites.push(new Page('https?://arstechnica\.com\/.*', 'h2 > a', true));

// determines if given url should be acted on
function checkSiteValid(url: string): string {
    for (let index = 0; index < allSites.length; index++) {
        const element: Page = allSites[index];
        let regex: RegExp = new RegExp(element.getUrl(), 'i');
        if (regex.test(url)) {
            return element.getSelectors();
        }
    }
    return null;
}


function getSite(url: string): number {
    for (let index = 0; index < allSites.length; index++) {
        const element: Page = allSites[index];
        let regex: RegExp = new RegExp(element.getUrl(), 'i');
        if (regex.test(url)) {
            return index;
        } 
    }
}


// Listener keeps the event page open until not needed
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    
    if (checkSiteValid(request.url)) {
        // show page icon if site is valid
        chrome.pageAction.show(sender.tab.id);

        let responseString: string = checkSiteValid(request.url);
        sendResponse({pattern: responseString});

        // // TODO: handle toggle of the site
        // send url over to popup
        // chrome.runtime.sendMessage({thisSite: allSites[getSite(request.url)]});
        // if (request.cmd == 'toggle') {
        //     allSites[getSite(request.url)].setEnabled(request.enabled);
        //     chrome.runtime.sendMessage({temp: allSites[getSite(request.url)].getEnabled()});
        //     chrome.tabs.executeScript(request.url, {code: 'location.reload()'}, function() {});
        // } else {
        //     let responseString: string = checkSiteValid(request.url);
        //     sendResponse({pattern: responseString});
        // }
        
    }
    return true;
});
