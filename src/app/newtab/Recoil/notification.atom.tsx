import { atom } from "recoil";

const notificationVisibility = atom<boolean>({
  key: "notificationVisibility",
  default: false,
});

const notificationMessageAtom = atom<string>({
  key: "notificationMessageAtom",
  default: "Error Message",
});

export { notificationVisibility, notificationMessageAtom };
