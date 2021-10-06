import { atom, selector, DefaultValue } from "recoil";

const collapseAtom = atom<boolean>({
  key: "collapseAtom",
  default: false,
});


const saveCollapseState = (state: boolean) => {
  chrome.storage.sync.set({ collapse: state }, function () {
    console.log("collapse are saved");
  });
};

const collapseSelector = selector<boolean>({
  key: "collapseSelector",
  get: ({ get }) => get(collapseAtom),
  set: ({ set, get }, method) => {
    // console.log(method)
    if (method instanceof DefaultValue) {
      set(collapseAtom, method);
    } else {
      set(collapseAtom, method);
      saveCollapseState(method);
    }
  },
});

export { collapseSelector };
