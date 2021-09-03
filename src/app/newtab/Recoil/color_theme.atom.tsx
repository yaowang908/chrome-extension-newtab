import { atom, DefaultValue, selector } from "recoil";

const colorThemeAtom = atom<'blueTheme' | 'blackTheme' | 'whiteTheme'>({
  key: "colorThemeAtom",
  default: 'blueTheme',
});

const colorThemeSelector = selector<'blueTheme' | 'blackTheme' | 'whiteTheme'>({
  key: "colorThemeSelector",
  get: ({get}) => get(colorThemeAtom),
  set: ({set, get}, method) => {
    // console.log(method)
    if (method instanceof DefaultValue) {
      set(colorThemeAtom, method);
    } else {
      set(colorThemeAtom, method);
    }
  }
})

export { colorThemeSelector };