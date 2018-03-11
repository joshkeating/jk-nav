import * as $ from "jquery";

// chrome.runtime.onInstalled.addListener(function() {
//     chrome.storage.sync.set({'currentColor': '#c6dafb'}, function() {});
// });

// function init() {
//     chrome.storage.sync.set({'currentColor': '#c6dafb'}, function() {});
// }

// init();
// chrome.storage.sync.set({'currentColor': '#c6dafb'}, function() {});

// function fuck() {
//     chrome.storage.sync.set({'currentColor': '#c6dafb'}, function() {
//         console.log("fuck this");
//     });

// }
// fuck();

    let color: string;

    chrome.storage.sync.get("currentColor", function (obj) {
        color = obj.currentColor;
        console.log(color);
    });
    


    


function sendURL() {

    let pattern: string;
    chrome.runtime.sendMessage({url: location.href}, function(response) {
        // the response that this recives should either be the data associated
        // with this site (it exists) or undefined/disabled.
        if (!response) {
            return;
        }
        
        // wait till DOM is fully loaded to execute
        $(document).ready(function() { 
            pattern = response.pattern;
            let currentIndex: number = 0;
    
            let currentNode: HTMLElement;
    
            let allLinks = document.querySelectorAll(pattern) as NodeListOf<HTMLElement>;
            currentNode = allLinks[currentIndex];
            currentNode.style.backgroundColor = color;  //TODO: make changable
            currentNode.focus();
    
            document.addEventListener("keypress", function onEvent(event) {
                let previousIndex: number = currentIndex;
                if (event.key === "j" && currentIndex < allLinks.length - 1) {
                
                    currentNode = allLinks[currentIndex+=1];
                    allLinks[previousIndex].style.backgroundColor = "inherit";
                    currentNode.style.backgroundColor = color;  //TODO: make changable
                    currentNode.focus();
                }
                else if (event.key === "k" && currentIndex > 0) {
                    currentNode = allLinks[currentIndex-=1];
                    allLinks[previousIndex].style.backgroundColor = "inherit";
                    currentNode.style.backgroundColor = color;  //TODO: make changable
                    currentNode.focus();
                    
                }
            });

         });

      });
}

sendURL();