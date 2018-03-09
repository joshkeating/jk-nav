

// chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
//     if (msg.color) {
//         console.log('Receive color = ' + msg.color);
//         document.body.style.backgroundColor = msg.color;
//         sendResponse('Change color to ' + msg.color);
//     } else {
//         sendResponse('Color message is none.');
//     }
// });

// chrome.browserAction.onClicked.addListener(function(tab) {
//     chrome.tabs.executeScript({
//       code: 'document.body.style.backgroundColor="red"'
//     });
//   });




function catchKeyPress() {
    if (window == top) {
        window.addEventListener('keyup', doKeyPress, false); //add the keyboard handler
    }
        
    let trigger_key: number = 71; // g key
    function doKeyPress(e) {
        if (e.shiftKey && e.keyCode == trigger_key){ // if e.shiftKey is not provided then script will run at all instances of typing "G"
            //alert('Hi!')
        }
    }
        
}

