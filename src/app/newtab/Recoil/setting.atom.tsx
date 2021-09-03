import { atom, DefaultValue, selector } from "recoil";

interface SettingProps {
  theme: 'blueTheme' | 'blackTheme' | 'whiteTheme' | 'bgImage';
  clickToHide: boolean;
}

const storeSetting = (obj: SettingProps) => {
  chrome.storage.local.set({ setting: obj }, function () {
    console.log("Settings are saved locally ");
  });
};

const settingDialogueVisibility = atom<boolean>({
  key: "settingDialogueVisibility",
  default: false
});

const defaultSetting: SettingProps = {
  theme: 'blueTheme',
  clickToHide: true,
}

const settingAtom = atom<SettingProps>({
  key: "settingAtom",
  default: defaultSetting
});

const settingSelector = selector<SettingProps>({
  key: "dashboardGroup",
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

export { settingDialogueVisibility, settingSelector };
