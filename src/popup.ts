import * as $ from 'jquery';

// this is the page action popup

  
// $(function() {

//     $('#optionsPageLink').click(() => {
//         chrome.runtime.openOptionsPage()
//     });

// });
    
function handleInput() {

    // handle checkbox click 
    let checkbox = document.querySelector('#checkboxEnabled') as HTMLInputElement; 
    if (checkbox) {
        checkbox.addEventListener('click', function() {
            if (checkbox.checked) {
                chrome.runtime.sendMessage({action: 'toggle', enabled: true})
            } else {
                chrome.runtime.sendMessage({action: 'toggle', enabled: false})
            }
            
        });
    }
    

    let optionButton = document.querySelector('#optionsPageLink');
    if (optionButton) {
        optionButton.addEventListener('click', function() {
            if (chrome.runtime.openOptionsPage) {
                // New way to open options pages, if supported (Chrome 42+).
                chrome.runtime.openOptionsPage();
            }
        });
    }
    // handle options button click 
    
      
}

handleInput();




