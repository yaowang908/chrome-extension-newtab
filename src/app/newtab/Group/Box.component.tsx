import React, { useRef } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { nanoid } from "nanoid";

import { DropContainer } from "../DropContainer/DropContainer.component";
import setting from "../setting/setting";
import { groupSelector } from "../Recoil/group_selector.atom";
import { LinkProps } from "../tabs/link/link.interfaces";
import { colorThemeSelector } from "../Recoil/color_theme.atom";
import { linksSelector } from "../Recoil/links_selector.atom";
import {
  groupEditorVisibleAtom,
  selectedGroupAtom,
} from "../Recoil/groupEditor.atom";
import handleDuplicates from "../Helper/duplicateLinks";
import closeChromeTabs from "../Helper/chromeCloseTabs";

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
  const setGroupEditorVisibleState = useSetRecoilState(
    groupEditorVisibleAtom
  );
  const setSelectedGroupState = useSetRecoilState(selectedGroupAtom);
  const nameContainer = useRef<HTMLDivElement>(null);

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

  const groupData = groupDataArr.filter((x) => x.id === boxID)[0];
  const data = groupData?.content;
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

  const setGroupContent = (newGroupContent: (LinkProps[] | undefined)) => {
    const newSelectedGroupState = Object.assign({}, groupData, {
      content: newGroupContent,
    });
    const newGroupArrState = groupDataArr.map((x) => {
      if (x.id === boxID) {
        return newSelectedGroupState;
      }
      return x;
    });
    setGroupDataArr(newGroupArrState);
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
    // DONE: open a new edit module to edit the links in this group
    setSelectedGroupState(boxID);
    setGroupEditorVisibleState(true);
  }
  
  const saveNewGroupName = (newName: string) => {
    const newGroupData = [...groupDataArr].map((x) => {
      if (x.id === boxID) {
        return Object.assign({}, x, { name: newName.substring(0,15) });
      }
      return x;
    });
    setGroupDataArr(newGroupData);
    // console.log("Save name here!");
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

  const renameOnFocusHandler = (el: React.FocusEvent<HTMLDivElement>) => {
    // // el.select()
    // console.log(el.target)
    // console.log(el.currentTarget)
  };

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

  const buttonRenameClickHandler = (el: React.MouseEvent<HTMLButtonElement>) => {
    // el.currentTarget.contentEditable = "true";
    if(nameContainer) {
      // console.log(el.currentTarget)
      // console.log(nameContainer.current?.contentEditable);
      if (nameContainer.current?.contentEditable) {
        nameContainer.current.contentEditable = "true";
        nameContainer.current.focus();
        // nameContainer.current.select();
      }
    }
  }

  const buttonCollectHandler = (el: React.MouseEvent<HTMLButtonElement>) => {
    // console.log('collect');
    el.stopPropagation();
    let queryOptions = {};

    const getOrder = (
      prevArr: LinkProps[] | undefined,
      currentIndex: number
    ) => {
      if (prevArr) {
        return prevArr.length + currentIndex;
      }
      return currentIndex;
    };

    chrome.tabs.query(queryOptions).then((res) => {
      // console.log(res);
      const formatData = res
        .filter((x) => x?.url && !x?.url.includes("chrome://"))
        .map((x, index) => ({
          id: index + "_" + nanoid(),
          index: getOrder(data, index),
          imageUrl: x?.favIconUrl,
          link: x?.url,
          title: x?.title,
          priority: 0,
        }));
      if (data) {
        const newState = [...data, ...formatData];
        setGroupContent(handleDuplicates(newState));
      } else {
        setGroupContent(formatData);
      }
    });

    closeChromeTabs();
  };

  // TODO: drag and drop between boxes

  // TODO: drag and drop boxes, change order

  return (
    <div
      ref={drop}
      className={`relative block h-36 md:h-64 box-border border-2 p-2 ${setting.border[colorTheme]}`}
      data-id={boxID}
    >
      <DropContainer accepts={["LINK"]} onDrop={onDropHandler}>
        <div className="absolute h-auto w-full flex flex-row justify-between">
          <div
            className="whitespace-nowrap overflow-hidden"
            ref={nameContainer}
            onClick={renameClickHandler}
            onBlur={renameOnBlurHandler}
            onFocus={renameOnFocusHandler}
            onKeyDown={renameOnKeyDownHandler}
            style={{ maxWidth: "17ch", minWidth: "2ch" }}
          >
            {groupName}
          </div>
          <div className="w-10 group relative cursor-pointer text-right">
            ...
            <div
              className={`
              group-hover:grid hidden absolute w-24 h-48 right-0 z-50 grid-cols-1 gap-1
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
                onClick={buttonCollectHandler}
                className={`${setting.text[colorTheme]} ${setting.headBorder[colorTheme]}`}
              >
                Collect
              </button>
              <button
                onClick={buttonRenameClickHandler}
                className={`${setting.text[colorTheme]} ${setting.headBorder[colorTheme]}`}
              >
                Rename
              </button>
              <button
                onClick={editClickHandler}
                className={`${setting.text[colorTheme]} ${setting.headBorder[colorTheme]}`}
              >
                Expand
              </button>
            </div>
          </div>
        </div>
        <div
          className={`pt-8 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 overflow-hidden`}
        >
          {createGroupList()}
        </div>
      </DropContainer>
    </div>
  );
};
