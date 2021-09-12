import { atom, DefaultValue, selector } from "recoil";
import { nanoid } from "nanoid";

import { LinkProps } from '../tabs/link/link.interfaces';

interface GroupProps {
  id: string;
  name: string;
  order: number;
  content?: LinkProps[] | []; 
}

const storeGroup = (dataArr: (GroupProps[])) => {
  chrome.storage.sync.set({ groups: dataArr }, function () {
    // console.log('Groups are saved locally ');
  });
}

const defaultGroupArray: GroupProps[] = [
  { id: nanoid(), order: 0, name: 'Group 1', content: [] },
  { id: nanoid(), order: 1, name: 'Group 2', content: [] },
  { id: nanoid(), order: 2, name: 'Group 3', content: [] },
  { id: nanoid(), order: 3, name: 'Group 4', content: [] },
  { id: nanoid(), order: 4, name: 'Group 5', content: [] },
  { id: nanoid(), order: 5, name: 'Group 6', content: [] },
]

const groupAtom = atom<GroupProps[]>({
  key: "groupAtom",
  default: defaultGroupArray,
});

const groupSelector = selector<GroupProps[]>({
  key: "dashboardGroup",
  get: ({get}) => get(groupAtom),
  set: ({set, get}, method) => {
    if (method instanceof DefaultValue) {
      set(groupAtom, method);
    } else {
      set(groupAtom, method);
      storeGroup(method);
    }
    // console.log("Recoil atom gets: ", method);
    // console.error("Unrecognized Status");
  }
})

export { groupSelector };