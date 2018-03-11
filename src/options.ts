import * as $ from 'jquery';

// let colorSelector = (document.getElementById('color') as HTMLInputElement).value;
// // Saves options to chrome.storage.sync.
// function save_options() {
//     console.log(colorSelector);
//     chrome.storage.sync.set({
//       currentColor: colorSelector
//     }, function() {
//       // Update status to let user know options were saved.
//       let status = document.getElementById('status');
//       status.textContent = 'Options saved.';
//       setTimeout(function() {
//         status.textContent = '';
//       }, 750);
//     });
//   }
  
//   // Restores select box and checkbox state using the preferences
//   // stored in chrome.storage.
//   function restore_options() {
//     // Use default value color = 'red' and likesColor = true.
//     chrome.storage.sync.get({
//         currentColor: '#c6dafb'
//     }, function(items) {
//         colorSelector = items.currentColor;
//     });
//   }

//   document.addEventListener('DOMContentLoaded', restore_options);

//   document.getElementById('save').addEventListener('click', save_options);

  // Saves options to chrome.storage.sync.
function save_options() {
    let color = $('#color').val();
    chrome.storage.sync.set({
      currentColor: color
    }, function() {
      // Update status to let user know options were saved.
      let status = $('#status');
      status.text('Options saved.');
      setTimeout(function() {
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
    }, function(items: {currentColor, likesColor}) {
      $('#color').val(items.currentColor);
    });
  }
  
  $('#save').click(save_options);
  $(restore_options); // document.addEventListener('DOMContentLoaded', restore_options);