const closeChromeTabs = () => {
  let queryOptions = {};
  chrome.tabs.query(queryOptions).then((res) => {
    const tabIdArr: number[] =
      res
        ?.filter((r) => r)
        ?.filter((x) => !x.active)
        ?.map((i) => (i.id ? i.id : 0)) || [];
    // console.log(tabIdArr);
    if (tabIdArr) {
      chrome.tabs.remove(tabIdArr.filter((x) => x)).then((res) => {
        console.log("Closed tabs");
      });
    }
  });
};

export default closeChromeTabs;