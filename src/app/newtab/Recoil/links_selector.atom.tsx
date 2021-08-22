import { atom, DefaultValue, selector } from "recoil";
import { LinkProps } from '../tabs/link/link.interfaces';

// export const getTabsOnInit = async () => {
//   let result = undefined;
//   await chrome.storage.local.get(['tabs'], function(res) {
//     console.log(res)
//     if(res.tabs) {
//       result = res.tabs;
//     }
//   });
//   // console.log(chrome?.storage)
//   console.log('retrieve from chrome storage', result)
//   return result;
// }

const storeTabsOnChange = (dataArr: (LinkProps[] | undefined)) => {
  chrome.storage.local.set({tabs: dataArr}, function() {
    console.log('Tabs are saved locally ');
  });
}

const linksAtom = atom<LinkProps[] | undefined>({
  key: "linksAtom",
  default: undefined,
});

const linksSelector = selector<LinkProps[] | undefined>({
  key: "targetMonth",
  get: ({get}) => get(linksAtom),
  set: ({set, get}, method) => {
    if (method instanceof DefaultValue) {
      set(linksAtom, method);
    } else {
      set(linksAtom, method);
      storeTabsOnChange(method)
    }
    // console.log("Recoil atom gets: ", method);
    // console.error("Unrecognized Status");
  }
})

export { linksSelector };