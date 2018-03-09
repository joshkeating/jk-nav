


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

        let currentNode: HTMLElement;

        let allLinks = document.querySelectorAll(pattern) as NodeListOf<HTMLElement>;
        currentNode = allLinks[currentIndex];
        currentNode.style.backgroundColor = "#c6dafb";  //TODO: make changable
        currentNode.focus();

        document.addEventListener("keypress", function onEvent(event) {
            let previousIndex: number = currentIndex;
            if (event.key === "j" && currentIndex < allLinks.length - 1) {
            
                currentNode = allLinks[currentIndex+=1];
                allLinks[previousIndex].style.backgroundColor = "inherit";
                currentNode.style.backgroundColor = "#c6dafb";  //TODO: make changable
                currentNode.focus();
            }
            else if (event.key === "k" && currentIndex > 0) {
                currentNode = allLinks[currentIndex-=1];
                allLinks[previousIndex].style.backgroundColor = "inherit";
                currentNode.style.backgroundColor = "#c6dafb";  //TODO: make changable
                currentNode.focus();
                
            }
        });
        
        function selectLink() {
            let convetedlink = allLinks[currentIndex] as HTMLElement;

        }


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




}



sendURL();
// run();
