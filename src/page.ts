
export class Page {

    private urlRegex: string;
    private selectors: string;

    constructor(urlRegex: string, selectors: string) {
        this.urlRegex = urlRegex;
        this.selectors = selectors;
    }

    getUrl() {
        return this.urlRegex;
    }

    getSelectors() {
        return this.selectors;
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