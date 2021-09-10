import { atom, DefaultValue, selector } from "recoil";

const groupEditorVisibleAtom = atom<boolean>({
  key: "groupEditorVisibleAtom",
  default: false,
});

const selectedGroupAtom = atom<string | undefined>({
  key: "selectedGroup",
  default: undefined,
});

export { groupEditorVisibleAtom, selectedGroupAtom };
