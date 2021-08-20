import { atom, DefaultValue, selector } from "recoil";

const colorThemeAtom = atom<'blueTheme' | 'blackTheme' | 'whiteTheme'>({
  key: "colorThemeAtom",
  default: 'blueTheme',
});

const colorThemeSelector = selector<'blueTheme' | 'blackTheme' | 'whiteTheme'>({
  key: "colorThemeSelector",
  get: ({get}) => get(colorThemeAtom),
  set: ({set, get}, method) => {
    switch (true) {
      case method === 'blueTheme':
        set(colorThemeAtom, 'blueTheme');
      case method === 'blackTheme':
        set(colorThemeAtom, 'blackTheme');
      case method === 'whiteTheme':
        set(colorThemeAtom, 'whiteTheme');
      if (method instanceof DefaultValue) {
        set(colorThemeAtom, method);
      }
    }
  }
})

export { colorThemeSelector };