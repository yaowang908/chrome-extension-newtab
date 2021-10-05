import { nanoid } from "nanoid";
import handleDuplicates from "./newtab/Helper/duplicateLinks";
import { LinkProps } from "./newtab/tabs/link/link.interfaces";
import { getOrder } from "./newtab/header/DashboardButtons";


chrome.action.onClicked.addListener(function () {
  chrome.tabs.create({ url: chrome.runtime.getURL("new-tab.html") });
});

chrome.runtime.onInstalled.addListener(function (object) {
  chrome.storage.sync.remove(["setting"], function () {
    let error = chrome.runtime.lastError;
    if (error) {
      console.error(error);
    }
  });
  chrome.tabs.create({url: chrome.runtime.getURL("help.html")});
  
  //context menus
  const SINGLE_COLLECT_MENU_ID = "Single_Collect";
  chrome.contextMenus.create({
    contexts: ["page"],
    title: "Single: collect & close this tab only",
    id: SINGLE_COLLECT_MENU_ID,
  });
  
  
  //handle context menu clicks
  const handleChromeMessage = (payload: {
    info: chrome.contextMenus.OnClickData;
    tab: chrome.tabs.Tab | undefined;
  }) => {
    // console.log(payload);
    let dataArr: LinkProps[] = [];
  
    chrome.storage.sync.get(["tabs"], function (result) {
      // console.log('get tabs from sync storage',result);
      if ("tabs" in result) {
        dataArr = result.tabs;

        if (dataArr.length > 0) {
          const index = dataArr.length - 1;
          const newTab = {
            id: index - 1 + "_" + nanoid(),
            index: getOrder(dataArr, index),
            imageUrl: payload.tab?.favIconUrl,
            link: payload.tab?.url,
            title: payload.tab?.title,
            priority: 0,
          };
          const newState = [...dataArr, newTab];
          dataArr = handleDuplicates(newState);
        } else {
          const index = 0;
          const newTab = {
            id: index - 1 + "_" + nanoid(),
            index: getOrder(dataArr, index),
            imageUrl: payload.tab?.favIconUrl,
            link: payload.tab?.url,
            title: payload.tab?.title,
            priority: 0,
          };
          // console.log("replace, ", newTab);
          dataArr = [newTab];
        }

        const tabId = payload.tab?.id ?? false;
        if (tabId) {
          chrome.tabs.remove([tabId]).then((res) => {
            // console.log("Closed tabs");
          });
        }

        chrome.storage.sync.set({ tabs: dataArr }, function () {
          // console.log('Tabs are saved locally ');
        });
      }
    });

    
    // console.log(dataArr);
  };

  const getInfo = (info: chrome.contextMenus.OnClickData, tab:(chrome.tabs.Tab | undefined)) => {
    if(info.menuItemId === SINGLE_COLLECT_MENU_ID) {
      console.log('Collect and close single tab');
      // console.log('info', info);
      // console.log('tab', tab);
      // sendPayloadToNewTab({info: info, tab: tab});      
      handleChromeMessage({ info: info, tab: tab });
    } 
  }
  
  chrome.contextMenus.onClicked.addListener(getInfo);
});