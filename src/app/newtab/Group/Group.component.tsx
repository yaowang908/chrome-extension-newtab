import React from 'react'
import { nanoid } from 'nanoid'
import { useRecoilState } from 'recoil'

import { groupSelector } from '../Recoil/group_selector.atom'
import Section from '../section/section.component'
import { Box } from './Box.component'
import { ItemTypes } from '../dnd/ItemTypes'

export const Group:React.FC = () => {
  const [groupsArr, setGroupsArr] = useRecoilState(groupSelector);

  React.useEffect(() => {
    chrome.storage.local.get(['groups'], function(result) {
      if(result.groups) {
        setGroupsArr(result.groups);
        // console.log('get groups from local storage: ', result.groups);
      }
    });
  }, []);
  // only use nanoid when create new box

  //  stored boxes will use their own ID

  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {
          groupsArr.map(x => <Box key={x.id} itemType={ItemTypes.LINK} boxID={x.id} groupName={x.name}/>)
        }
        {/* <Box itemType={ItemTypes.LINK} id='placeholder'/>         */}
      </div>
    </Section>
  )
}
