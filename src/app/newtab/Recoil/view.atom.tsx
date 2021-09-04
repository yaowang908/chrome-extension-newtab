import { atom, DefaultValue, selector } from "recoil";

const viewAtom = atom<"Dashboard" | "Bookmark">({
  key: "viewAtom",
  default: "Dashboard",
});

const storeView = (state: "Dashboard" | "Bookmark") => {
  chrome.storage.local.set({ view: state }, function () {
    console.log("View is saved locally ");
  });
};

const viewSelector = selector<"Dashboard" | "Bookmark">({
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