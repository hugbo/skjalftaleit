'use strict'


function getData() {
  $.ajax({
    url: 'https://apis.is/earthquake/is',
    success: function(data) {
      currentData = data;
      updateTable();
    }
  });
}
