// chrome.storage.local.get(["badgeText"], ({ badgeText }) => {
//   chrome.action.setBadgeText({ text: badgeText }, () => {});

//   // Listener is registered asynchronously
//   chrome.action.onClicked.addListener(handleActionClick);
// });

// const handleActionClick = () => console.log("background js");

console.log("====background js====");

let queryOptions = {};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("get request for allTabs")
    if (request.method === "allTabs") {
      // chrome.tabs.query(queryOptions).then((res) => {
      //   // console.log(res);
      //   sendResponse(JSON.stringify(res));
      // });
    } else {
      console.log("Unknown method!", request.method);
    }
  }
);