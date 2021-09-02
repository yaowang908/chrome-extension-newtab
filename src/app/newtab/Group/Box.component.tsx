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

  const groupLinkClickHandler = (el: LinkProps) => {
    return (e: React.MouseEvent<HTMLImageElement>) => {
      e.preventDefault();
      chrome.tabs.create({
        active: true,
        url: el.link,
      });
      // removeCurrentLink(el.id);
      // DONT change urls in group unless edited through the edit module
    };
  };

  // Generate group component
  const createGroupList = () => {
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
                  onClick={groupLinkClickHandler(el)}
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
  const openAllClickHandler = () => {
    // DONE:
    const allLinks = data?.map(x => x.link) || [];
    if(allLinks) {
      allLinks?.map((l, index) => {
        if (!index) {
          chrome.tabs.create({
            active: true,
            url: l,
          });
        }
        chrome.tabs.create({
          active: false,
          url: l,
        });
      });
    }
    // console.log("openALL: ", allLinks);
  }
  const editClickHandler = () => {
    // TODO: open a new edit module to edit the links in this group
    
  }
  
  const saveNewGroupName = (newName: string) => {
    const newGroupData = [...groupDataArr].map((x) => {
      if (x.id === boxID) {
        return Object.assign({}, x, { name: newName.substring(0,15) });
      }
      return x;
    });
    setGroupDataArr(newGroupData);
    console.log("Save name here!");
  }
  const renameClickHandler = (el: React.MouseEvent<HTMLDivElement>) => {
    // DONE:
    el.currentTarget.contentEditable = 'true';
  };
  const renameOnBlurHandler = (el: React.FocusEvent<HTMLDivElement>) => {
    // DONE:
    let newName = el.currentTarget.innerText || 'Group';
    saveNewGroupName(newName);
  }

  const renameOnKeyDownHandler = (el: React.KeyboardEvent<HTMLDivElement>) => {
    // TODO: display a caveat when tap more than 15 characters
    if (el.keyCode === 13 || el.keyCode === 27) {
      // console.log("Enter! Or Escape!");
      el.currentTarget.blur();
    }
    // Tab will fire the onBlur handler
    // if(el.keyCode === 9) {
    //   console.log('Tab!')
    // }
    // console.log('KeyUp: ', el.keyCode);
  };

  return (
    <div
      ref={drop}
      className={`relative block h-36 md:h-56 box-border border-2 p-2 ${setting.border[colorTheme]}`}
      data-id={boxID}
    >
      <DropContainer accepts={["LINK"]} onDrop={onDropHandler}>
        <div className="absolute h-auto w-full flex flex-row justify-between">
          <div
            className="whitespace-nowrap overflow-hidden"
            onClick={renameClickHandler}
            onBlur={renameOnBlurHandler}
            onKeyDown={renameOnKeyDownHandler}
            style={{ maxWidth: "17ch", minWidth:"2ch" }}
          >
            {groupName}
          </div>
          <div className="group relative cursor-pointer">
            ...
            <div
              className={`
              group-hover:grid hidden absolute w-24 h-24 right-0 z-50 grid-cols-1 gap-1
              ${setting.bg[colorTheme]}
              `}
            >
              <button
                onClick={openAllClickHandler}
                className={`${setting.text[colorTheme]} ${setting.headBorder[colorTheme]}`}
              >
                Open all
              </button>
              <button
                onClick={editClickHandler}
                className={`${setting.text[colorTheme]} ${setting.headBorder[colorTheme]}`}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
        <div
          className={`pt-8 grid grid-cols-6 sm:grid-cols-12 md:grid-cols-5 gap-1 overflow-hidden`}
        >
          {createGroupList()}
        </div>
      </DropContainer>
    </div>
  );
};
