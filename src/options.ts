import * as $ from 'jquery';

// TODO: let user input a hex value for background highlight
// TODO: allow user to input site and rules

// Saves options to chrome.storage.sync.
function save_options() {
    let color = $('#color').val();
    chrome.storage.sync.set({
        currentColor: color
    }, function () {
        // Update status to let user know options were saved.
        let status = $('#status');
        status.text('Options saved.');
        setTimeout(function () {
            status.text('');
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        currentColor: '#c6dafb'
    }, function (items: { currentColor }) {
        $('#color').val(items.currentColor);
    });
}

$('#save').click(save_options);
//   $('#restore').click(restore_options); 