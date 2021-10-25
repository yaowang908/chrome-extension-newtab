import { atom } from "recoil";

const loadingModuleVisibility = atom<boolean>({
  key: "loadingModuleVisibility",
  default: false,
});

export { loadingModuleVisibility };
