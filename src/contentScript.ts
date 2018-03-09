


function sendURL() {

    chrome.runtime.sendMessage({url: location.href}, function(response) {
        // the response that this recives should either be the data associated
        // with this site (it exists) or undefined/disabled.
        if (!response) {
            return;
        }

      });

}

sendURL();


function catchKeyPress() {
    if (window == top) {
        window.addEventListener('keydown', doKeyPress, false); //add the keyboard handler
    }
        
    let trigger_key: number = 71; // g key
    function doKeyPress(e) {
        if (e.shiftKey && e.keyCode == trigger_key){ // if e.shiftKey is not provided then script will run at all instances of typing "G"
            //alert('Hi!')
        }
    }
        
}

