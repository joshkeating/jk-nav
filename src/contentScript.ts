


function sendURL(): string {

    let pattern: string;
    chrome.runtime.sendMessage({url: location.href}, function(response) {
        // the response that this recives should either be the data associated
        // with this site (it exists) or undefined/disabled.
        if (!response) {
            return;
        }
        pattern = response.pattern;
        let currentIndex: number = 0;

        console.log(response.pattern);

        pattern = setLinkIndex(currentIndex, pattern);
        // selectLink(currentIndex, pattern);
        console.log(response.pattern);


        let link: JQuery<HTMLElement> = $(setLinkIndex(currentIndex, pattern));
        console.log(link);
        link.css('background-color', '#4286f4');
        link.focus();

      });
      return pattern;
}

function run() {

    let selector: string;
    let currentIndex: number = 0;

    if (!sendURL()) {
        return;
    } else {
        selector = sendURL();
    }


    selectLink(currentIndex, selector);


}
// replace(/}{/g, "}|{");
function setLinkIndex(index: number, selector: string) {
    return selector.replace('(*)', ':nth(' + index + ')');
}

function selectLink(index: number, selector: string): JQuery<HTMLElement> {
    let previous = null;

    let link: JQuery<HTMLElement> = $(setLinkIndex(index, selector));
        if (previous) {
            if (link.get()[0] == previous) {
                return link;
            }
            $(previous).css('background-color', 'inherit');
        }
        link.css('background-color', '#4286f4');
        if (focus) { link.focus(); }
        previous = link.get()[0];
        return link;
}



sendURL();
// run();




function catchKeyPress() {
    if (window == top) {
        // add the keyboard handler
        window.addEventListener('keydown', doKeyPress, false);
    }
        
    let jKeyTrigger: number = 74;
    let kKeyTrigger: number = 75;

    function doKeyPress(e) {
        // if e.shiftKey is not provided then script will run at all instances of typing "G"
        if (e.shiftKey && e.keyCode == jKeyTrigger){ 
            // move the focus down
        }

        if (e.shiftKey && e.keyCode == kKeyTrigger){ 
            // move the focus up
        }

    }
        
}

