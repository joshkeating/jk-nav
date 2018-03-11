// import * as $ from 'jquery';

let colorSelector = (document.getElementById('color') as HTMLInputElement).value;
// Saves options to chrome.storage.sync.
function save_options() {

    chrome.storage.sync.set({
      currentColor: colorSelector
    }, function() {
      // Update status to let user know options were saved.
      let status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        currentColor: '#c6dafb'
    }, function(items) {
        colorSelector = items.favoriteColor;
    });
  }

  document.addEventListener('DOMContentLoaded', restore_options);

  document.getElementById('save').addEventListener('click', save_options);