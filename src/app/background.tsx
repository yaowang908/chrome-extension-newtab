// console.log("====background js====");


chrome.action.onClicked.addListener(function () {
  chrome.tabs.create({ url: chrome.runtime.getURL("new-tab.html") });
});
