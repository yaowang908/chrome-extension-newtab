import { atom, selector, DefaultValue } from "recoil";

interface quickLinkInterface {
  title: string;
  url: string;
  icon?: string;
}

const defaultQuickLinks: quickLinkInterface[] = [];

const QuickLinksAtom = atom<quickLinkInterface[]>({
  key: "QuickLinksAtom",
  default: defaultQuickLinks,
});


const storeQuickLinks = (newArr: quickLinkInterface[] | undefined) => {
  chrome.storage.sync.set({ quickLinks: newArr }, function () {
    console.log('QuickLinks are saved locally ');
  });
};

const QuickLinksSelector = selector<quickLinkInterface[] | DefaultValue>({
  key: "QuickLinksSelector",
  get: ({ get }) => get(QuickLinksAtom),
  set: ({ set, get }, method) => {
    if (method instanceof DefaultValue) {
      set(QuickLinksAtom, method);
    } else {
      set(QuickLinksAtom, method);
      storeQuickLinks(method);
    }
  },
});

const QuickLinkEditorVisibility = atom<boolean>({
  key: "QuickLinkEditorVisibility",
  default: false,
});

const QuickLinkEditorMode = atom<'new' | 'edit'>({
  key: "QuickLinkEditorMode",
  default: 'new'
});

export { QuickLinksSelector, QuickLinkEditorVisibility, QuickLinkEditorMode };