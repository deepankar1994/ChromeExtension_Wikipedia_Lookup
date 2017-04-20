// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var context = "selection";
  var title = "Quick Wikipedia Info";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});  
});

// add click event

chrome.contextMenus.onClicked.addListener(onClickHandler);
// The onClicked callback function.
function onClickHandler(info, tab) {
  var sText = info.selectionText;
  //chrome.tabs.executeScript(tab.id, {file: 'clickScript.js'});



  chrome.tabs.executeScript(tab.id, {
    code: 'var selectedText = "'+sText+'";' 
}, function() {
    chrome.tabs.executeScript(tab.id, {file: 'clickScript.js'});
});



};