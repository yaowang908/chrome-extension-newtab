export const bookmarkClickHandler = (newUrl: string) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.update(tab.id, { url: newUrl });
      }
    });
  };