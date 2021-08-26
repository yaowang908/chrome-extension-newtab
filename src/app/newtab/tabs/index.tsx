import React from 'react';
import { useRecoilValue } from 'recoil';

import { LinkProps } from '../tabs/link/link.interfaces';
import { linksSelector } from '../Recoil/links_selector.atom';
import Section from '../section/section.component';
import List from "./list/list.component";
import { CustomDragLayer } from '../dnd/CustomDragLayer';
import { ItemTypes } from '../dnd/ItemTypes';

const TabsSection: React.FC = () => {
  const dataArr = useRecoilValue(linksSelector);

  return (
    <Section>
      {
        dataArr ? 
        <List contentArr={dataArr} itemType={ItemTypes.LINK}/> :
        ''
      }      
      <CustomDragLayer />
    </Section>
  )
}

export default TabsSection;