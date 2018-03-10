import * as $ from 'jquery';

// this is the page action popup
    
function handleInput() {
    
    let checkbox = document.querySelector('#checkboxEnabled') as HTMLInputElement; 

    // FIXME: failed enable/disable code
    // chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    //     if (request.thisSite.getEnabled() === true) {
    //         checkbox.checked = true;
    //     } else {
    //         checkbox.checked = false;
    //     }
    //     chrome.tabs.executeScript(request.url, {code: 'location.reload()'}, function() {});
    // });

    // handle checkbox click 
    if (checkbox) {
        checkbox.addEventListener('click', function() {
            if (checkbox.checked) {
                chrome.runtime.sendMessage({cmd: 'toggle', enabled: true});
            } else {
                chrome.runtime.sendMessage({cmd: 'toggle', enabled: false});
            }
            
        });
    }
    
    // handle options button click 
    let optionButton = document.querySelector('#optionsPageLink');
    if (optionButton) {
        optionButton.addEventListener('click', function() {
            if (chrome.runtime.openOptionsPage) {
                // New way to open options pages, if supported (Chrome 42+).
                chrome.runtime.openOptionsPage();
            }
        });
    }
      
}

handleInput();




