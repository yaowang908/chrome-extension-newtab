import React from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { useRecoilState, useRecoilValue } from "recoil";

import { DropContainer } from "../DropContainer/DropContainer.component";
import setting from "../setting/setting";
import { groupSelector } from "../Recoil/group_selector.atom";
import { LinkProps } from "../tabs/link/link.interfaces";
import { colorThemeSelector } from "../Recoil/color_theme.atom";
import { linksSelector } from "../Recoil/links_selector.atom";
interface BoxProps {
  groupName?: string;
  itemType: string;
  boxID: string;
}

export const Box: React.FC<BoxProps> = ({
  groupName = "Group Name",
  itemType,
  boxID,
}) => {
  const [groupDataArr, setGroupDataArr] = useRecoilState(groupSelector);
  const colorTheme = useRecoilValue(colorThemeSelector);
  const [dataArr, setDataArr] = useRecoilState(linksSelector);

  const onDropHandler = (el: LinkProps) => {
    console.log("dropped in box:", el);
    // add link to groups atom
    const newStateGroups = [...groupDataArr].map((x) => {
      if (x.id === boxID && x.content) {
        return Object.assign({}, x, { content: [...x.content, el] });
      }
      return x;
    });
    setGroupDataArr(newStateGroups);

    // remove link from links atom
    if (dataArr) {
      const newStateLinks = [...dataArr].filter((x) => x.id !== el.id);
      // console.log('remove links: ', newStateLinks);
      setDataArr(newStateLinks);
    }

    return {
      dropTarget: "box",
      boxID: boxID,
    };
  };

  const [{ isOver, didDrop }, drop] = useDrop({
    accept: itemType,
    collect: (monitor) => ({
      didDrop: monitor.didDrop(),
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  const createGroupList = () => {
    const data = groupDataArr.filter((x) => x.id === boxID)[0]?.content;
    // console.log('render data', data)
    const removeCurrentLink = (linkID: string) => {
      const newContentArray = data?.filter(x => x.id !== linkID);
      const newGroupData = [...groupDataArr].map(d => {
        if (d.id === boxID) {
          return Object.assign({}, d, { content: newContentArray });
        }
        return d;
      })
      setGroupDataArr(newGroupData);
    };

    const clickHandler = (el: LinkProps) => {
      return (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        chrome.tabs.create({
          active: true,
          url: el.link,
        });
        removeCurrentLink(el.id);
      };
    };

    return (
      <>
        {data
          ? data.map((el) => {
              return (
                <img
                  className="h-6 w-6 cursor-pointer"
                  key={el.id}
                  src={
                    el.imageUrl ? el.imageUrl : "https://via.placeholder.com/32"
                  }
                  onClick={clickHandler(el)}
                />
              );
            })
          : ""}
      </>
    );
  };

  // React.useEffect(() => {
  //   console.log('Box -> isOver & didDrop: ', groupName, isOver, didDrop);
  // }, [isOver, didDrop])

  return (
    <div
      ref={drop}
      className={`relative block h-36 md:h-56 box-border border-2 p-2 ${setting.border[colorTheme]}`}
      data-id={boxID}
    >
      <DropContainer accepts={["LINK"]} onDrop={onDropHandler}>
        <div className="absolute h-12">{groupName}</div>
        <div
          className={`pt-8 grid grid-cols-6 sm:grid-cols-12 md:grid-cols-5 gap-1 overflow-hidden`}
        >
          {createGroupList()}
        </div>
      </DropContainer>
    </div>
  );
};
