import React from 'react'
import { useDrop, DropTargetMonitor } from 'react-dnd'
import { useRecoilState, useRecoilValue } from 'recoil'

import { DropContainer } from '../DropContainer/DropContainer.component'
import setting from '../setting/setting'
import { groupSelector } from '../Recoil/group_selector.atom'
import { LinkProps } from '../tabs/link/link.interfaces'
import { colorThemeSelector } from '../Recoil/color_theme.atom'
import { linksSelector } from '../Recoil/links_selector.atom'
interface BoxProps {
  groupName?: string; 
  itemType: string;
  id: string;
}

export const Box: React.FC<BoxProps> = ({groupName = 'Group Name', itemType, id}) => {
  const [groupDataArr, setGroupDataArr] = useRecoilState(groupSelector);
  const colorTheme = useRecoilValue(colorThemeSelector);
  const [dataArr, setDataArr] = useRecoilState(linksSelector);

  const onDropHandler = (el:LinkProps) => {
    console.log('dropped in box:', el)
    // add link to groups atom
    const newStateGroups = [...groupDataArr].map(x => {
      if(x.id === id && x.content) {
        return Object.assign({}, x, {content: [...x.content, el]});
      }
      return x;
    });
    setGroupDataArr(newStateGroups);

    // remove link from links atom
    if(dataArr) {
      const newStateLinks = [...dataArr].filter(x => x.id!==el.id);
      // console.log('remove links: ', newStateLinks);
      setDataArr(newStateLinks);
    }
    
    return {
      dropTarget: 'box',
      boxID: id 
    }
  }

  const [{didDrop}, drop] = useDrop({
      accept: itemType,
      drop: (item, monitor) => {
        return {
          didDrop: monitor.didDrop(),
        }
      }
    })

  const createGroupList = () => {
    const data = groupDataArr.filter(x => x.id === id)[0].content;
    // console.log('render data', data)

    return (
      <>
      {
        data?
        data.map(el => {
          return (
            <img key={el.id} src={el.imageUrl ? el.imageUrl : 'https://via.placeholder.com/32'}/>
          )
        }) :
        ''
      }
      </>
    )
  }


  return (
    <div className={`relative block h-36 md:h-56 box-border border-2 p-2 ${setting.border[colorTheme]}`} data-id={id}>
      <div className="absolute h-12">{groupName}</div>
      <DropContainer accepts={['LINK']} onDrop={onDropHandler}>
        <div className={`${didDrop ? 'mt-12' : 'mt-0'} grid grid-cols-5`}>
          {
            createGroupList()
          }
        </div>
      </DropContainer>
    </div>
  )
}
