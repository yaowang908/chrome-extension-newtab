import { atom } from "recoil";

const errorModuleVisibility = atom<boolean>({
  key: "errorModuleVisibility",
  default: false,
});

const errorMessageAtom = atom<string>({
  key: "errorMessageAtom",
  default: 'Error Message'
});

export { errorModuleVisibility, errorMessageAtom };
