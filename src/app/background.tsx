// console.log("====background js====");


chrome.action.onClicked.addListener(function () {
  chrome.tabs.create({ url: chrome.runtime.getURL("new-tab.html") });
});

chrome.runtime.onInstalled.addListener(function (object) {
  chrome.tabs.create({url: chrome.runtime.getURL("options.html")});
})