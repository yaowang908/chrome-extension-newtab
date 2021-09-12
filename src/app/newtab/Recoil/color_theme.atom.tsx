import { atom, DefaultValue, selector } from "recoil";

export type colorThemeProp = "blueTheme" | "blackTheme" | "whiteTheme" | "bgImage" ;

const defaultTheme = "bgImage";

const colorThemeAtom = atom<colorThemeProp>({
  key: "colorThemeAtom",
  default: defaultTheme,
});


const saveColorTheme = (
  data: {colorTheme: colorThemeProp; colorThemeChanged: boolean}
) => {
  chrome.storage.sync.set({ colorTheme: data }, function () {
    // console.log("SelectedFolder are saved locally ");
  });
};

const colorThemeSelector = selector<colorThemeProp>({
  key: "colorThemeSelector",
  get: ({ get }) => get(colorThemeAtom),
  set: ({ set, get }, method) => {
    // console.log(method)
    if (method instanceof DefaultValue) {
      set(colorThemeAtom, method);
    } else {
      set(colorThemeAtom, method);
      saveColorTheme({colorTheme: method, colorThemeChanged: get(colorThemeChangedAtom)});
    }
  },
});

const colorThemeChangedAtom = atom<boolean>({
  key: 'colorThemeChangedAtom',
  default: false
}) 

const colorThemeChangedSelector = selector<boolean>({
  key: "colorThemeCHangedSelector",
  get: ({get}) => get(colorThemeChangedAtom),
  set: ({set, get}, method) => {
    if (method instanceof DefaultValue) {
      set(colorThemeChangedAtom, method);
    } else {
      set(colorThemeChangedAtom, method);
      saveColorTheme({
        colorTheme: get(colorThemeAtom),
        colorThemeChanged: method,
      });
    }
  }
});

export { colorThemeSelector, colorThemeChangedSelector };