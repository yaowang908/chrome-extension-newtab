import { atom } from "recoil";

const importModuleVisibility = atom<boolean>({
  key: "importModuleVisibility",
  default: false,
});

export { importModuleVisibility };
