import { atom, DefaultValue, selector } from "recoil";

export interface BookmarkElement {
  dateAdded: number;
  dateGroupModified?: number;
  id: string;
  index: number;
  parentId: string;
  title: string;
  url: string;
}

export interface BookmarkFolder {
  children: BookmarkElement[];
  dateAdded: number;
  dateGroupModified?: number;
  id: string;
  index: number;
  parentId: string;
  title: string;
}

interface UpdateBookmarkProps {
  id: string;
  changes: {
    title?: string;
    url?: string;
  };
}

export interface BookmarkAtom {
  BookmarksBar?: BookmarkFolder | BookmarkElement;
  OtherBookmarks?: BookmarkFolder | BookmarkElement;
}

const updateBookmark = ({id, changes}: UpdateBookmarkProps) => {
  console.log('Update Bookmark here: id->', id, ', changes: ', changes )
  // chrome.bookmarks.update(id, changes, () => {
  //   console.log('Update bookmark ', changes)
  // })
};

const bookmarksAtom = atom<BookmarkAtom>({
  key: "bookmarksAtom",
  default: {},
});

const bookmarkSelector = selector<BookmarkAtom>({
  key: "bookmarkSelector",
  get: ({ get }) => get(bookmarksAtom),
  set: ({ set, get }, method) => {
    if (method instanceof DefaultValue) {
      set(bookmarksAtom, method);
    } else {
      // console.log('New bookmarks: ', method);
      set(bookmarksAtom, method);
      // updateBookmark(method);
    }
  },
});

const selectedFolderAtom = atom<BookmarkFolder | BookmarkElement | undefined>({
  key: "selectedFolderAtom",
  default: undefined,
});

const saveSelectedFolder = (
  data: BookmarkFolder | BookmarkElement | undefined
) => {
  // chrome.bookmarks.update(id, changes, () => {
  //   console.log('Update bookmark ', changes)
  // })
  chrome.storage.local.set({ selectedFolder: data }, function () {
    // console.log("SelectedFolder are saved locally ");
  });
};

const selectedFolderSelector = selector<
  BookmarkFolder | BookmarkElement | undefined
>({
  key: "selectedFolderSelector",
  get: ({ get }) => get(selectedFolderAtom),
  set: ({ set, get }, method) => {
    if (method instanceof DefaultValue) {
      set(selectedFolderAtom, method);
    } else {
      set(selectedFolderAtom, method);
      saveSelectedFolder(method);
    }
  },
});

const listViewLeftPanelVisibilityAtom = atom<boolean>({
  key: "listViewLeftPanelVisibilityAtom",
  default: true,
});

const saveListViewLeftPanelVisibility = (visibility: boolean) => {
  chrome.storage.local.set({ LVLPVisibility: visibility }, function () {
    // console.log("LVLPVisibility are saved locally ");
  });
}

const listViewLeftPanelVisibilitySelector = selector<boolean>({
  key: "listViewLeftPanelVisibilitySelector",
  get: ({ get }) => get(listViewLeftPanelVisibilityAtom),
  set: ({ set, get }, method) => {
    if (method instanceof DefaultValue) {
      set(listViewLeftPanelVisibilityAtom, method);
    } else {
      set(listViewLeftPanelVisibilityAtom, method);
      saveListViewLeftPanelVisibility(method);
    }
  },
});

export {
  bookmarkSelector,
  selectedFolderSelector,
  listViewLeftPanelVisibilitySelector,
};
