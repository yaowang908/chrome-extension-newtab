import { atom, DefaultValue, selector } from "recoil";

interface SettingProps {
  clickToHide: boolean;
  bookmarkView?: 'grid' | 'list'
}

const storeSetting = (obj: SettingProps) => {
  chrome.storage.local.set({ setting: obj }, function () {
    // console.log("Settings are saved locally ");
  });
};

const defaultSetting: SettingProps = {
  clickToHide: true,
  bookmarkView: 'list'
}

const settingAtom = atom<SettingProps>({
  key: "settingAtom",
  default: defaultSetting
});

const settingSelector = selector<SettingProps>({
  key: "settingSelector",
  get: ({ get }) => get(settingAtom),
  set: ({ set, get }, method) => {
    if (method instanceof DefaultValue) {
      set(settingAtom, method);
    } else {
      set(settingAtom, method);
      storeSetting(method);
    }
    // console.log("Recoil atom gets: ", method);
    // console.error("Unrecognized Status");
  },
});

const settingDialogueVisibility = atom<boolean>({
  key: "settingDialogueVisibility",
  default: false,
});

export { settingDialogueVisibility, settingSelector };
