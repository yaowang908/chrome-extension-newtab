import React from 'react'
import { useRecoilState, useRecoilValue, SetterOrUpdater } from "recoil";

import {
  groupEditorVisibleAtom,
  selectedGroupAtom,
} from "../Recoil/groupEditor.atom";
import Popup from '../Popup/Popup.component'
import { groupSelector } from '../Recoil/group_selector.atom';
import { LinkProps } from '../tabs/link/link.interfaces';
import { DraggableLink } from '../tabs/link/draggableLink.component';
import { colorThemeSelector } from '../Recoil/color_theme.atom';
import setting from '../setting/setting';
import { CustomDragLayer } from '../dnd/CustomDragLayer';
import { ItemTypes } from '../dnd/ItemTypes';

const EditGroup: React.FC = () => {
  const [groupEditorVisibleState, setGroupEditorVisibleState] = useRecoilState(groupEditorVisibleAtom);
  const selectedGroupState = useRecoilValue(selectedGroupAtom) ?? 'Group: Empty Selection';
  const [groupDataArr, setGroupDataArr] = useRecoilState(groupSelector);
  const colorThemeState = useRecoilValue(colorThemeSelector);

  const closeClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setGroupEditorVisibleState(false);
  }

  const selectedGroupData = groupDataArr.filter(
    (x) => x.id === selectedGroupState
  )[0];

  const data = selectedGroupData?.content;
  const name = selectedGroupData?.name;

  const updateGroupDataContent:SetterOrUpdater<LinkProps[] | undefined> = (newContent) => {
    const newSelectedGroupState = Object.assign({}, selectedGroupData, {
      content: newContent,
    });
    const newGroupArrState = groupDataArr.map((x) => {
      if (x.id === selectedGroupState) {
        return newSelectedGroupState;
      }
      return x;
    });
    setGroupDataArr(newGroupArrState);
  };

  return groupEditorVisibleState ? (
    <Popup outClick={closeClickHandler}>
      <div
        className={`w-full h-full p-5 relative box-border flex flex-col ${setting.text[colorThemeState]} ${setting.headBorder[colorThemeState]} ${setting.bg[colorThemeState]}`}
      >
        <h1 className="text-3xl font-bold border-b-2 pb-2 mb-2">
          {name ? name : selectedGroupState}
        </h1>
        <div className="px-3 py-5 overflow-y-scroll overflow-x-hidden ">
          {data?.length
            ? data?.map((ele: LinkProps, index) => {
                const draggableLinkProps = Object.assign(
                  {},
                  { ...ele },
                  {
                    itemType: ItemTypes.LINK,
                    index: index,
                    dataArr: data,
                    setDataArr: updateGroupDataContent,
                  }
                );
                return <DraggableLink key={ele.id} {...draggableLinkProps} />;
              })
            : "Empty!"}
        </div>
      </div>
      <CustomDragLayer />
    </Popup>
  ) : (
    <></>
  );
}

export default EditGroup
