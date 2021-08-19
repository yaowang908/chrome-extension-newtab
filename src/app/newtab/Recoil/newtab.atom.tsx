import { atom, DefaultValue, selector } from "recoil";
import { LinkProps } from '../tabs/link/link.interfaces';

const linksAtom = atom<LinkProps[] | undefined>({
  key: "linksAtom",
  default: undefined,
});

const links = selector<LinkProps[] | undefined>({
  key: "targetMonth",
  get: ({get}) => get(linksAtom),
  set: ({set, get}, method) => {
    if (method instanceof DefaultValue) {
      set(linksAtom, method);
    }
    console.log("Recoil atom gets: ", method);
    set(linksAtom, method);
    // console.error("Unrecognized Status");
  }
})

export { links };