import { atom, DefaultValue, selector } from "recoil";

export type viewType = "Dashboard" | "Bookmark" | "QuickLinks";

const viewAtom = atom<viewType>({
  key: "viewAtom",
  default: "Dashboard",
});

const storeView = (state: viewType) => {
  chrome.storage.sync.set({ view: state }, function () {
    // console.log("View is saved locally ");
  });
};

const viewSelector = selector<viewType>({
  key: "viewSelector",
  get: ({ get }) => get(viewAtom),
  set: ({ set, get }, method) => {
    // console.log('visible: ', method)
    if (method instanceof DefaultValue) {
      set(viewAtom, method);
    } else {
      set(viewAtom, method);
      storeView(method);
    }
  },
});

export { viewSelector };