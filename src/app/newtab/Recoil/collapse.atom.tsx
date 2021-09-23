import { atom } from "recoil";

const collapseAtom = atom<boolean>({
  key: "collapseAtom",
  default: false,
});

export { collapseAtom };
