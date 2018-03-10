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

    checkbox.addEventListener('click', function() {
        if (checkbox.checked) {
            chrome.runtime.sendMessage({action: 'toggle', enabled: true})
        } else {
            chrome.runtime.sendMessage({action: 'toggle', enabled: false})
        }
        
    });


    // handle options button click 
    document.querySelector('#optionsPageLink').addEventListener('click', function() {
        if (chrome.runtime.openOptionsPage) {
            // New way to open options pages, if supported (Chrome 42+).
            chrome.runtime.openOptionsPage();
        }
    });
      
}

handleInput();




