import { atom, DefaultValue, selector } from "recoil";


const visibleAtom = atom<boolean>({
  key: "visibleAtom",
  default: false,
});


const storeVisible = (state: boolean) => {
  chrome.storage.local.set({ visible: state }, function () {
    console.log("Visible is saved locally ");
  });
};

const visibleSelector = selector<boolean>({
  key: "visibleSelector",
  get: ({ get }) => get(visibleAtom),
  set: ({ set, get }, method) => {
    // console.log(method)
    if (method instanceof DefaultValue) {
      set(visibleAtom, method);
    } else {
      set(visibleAtom, method);
      storeVisible(method);
    }
  },
});

export { visibleSelector };
