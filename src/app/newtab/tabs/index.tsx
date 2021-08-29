import React from 'react';
import { useRecoilValue } from 'recoil';

import { linksSelector } from '../Recoil/links_selector.atom';
import Section from '../section/section.component';
import List from "./list/list.component";
import { CustomDragLayer } from '../dnd/CustomDragLayer';
import { ItemTypes } from '../dnd/ItemTypes';
import { useDrop } from 'react-dnd';
import { DropContainer } from './DropContainer/DropContainer.component';

const TabsSection: React.FC = () => {
  const dataArr = useRecoilValue(linksSelector);

  const [{ canDrop }, drop] = useDrop({
    accept: ItemTypes.LINK,
    collect(monitor) {
      return {
        canDrop: monitor.canDrop()
      }
    },
    drop: (item, monitor) => {
      return {
        dropTarget: 'section'
      }
    }
  })

  const containerOnDrop = (item:unknown) => {
    console.log('Dropped on container',item);
  }
  
  return (
    <Section>
      <DropContainer accepts={[ItemTypes.LINK]} onDrop={containerOnDrop}>
        {
          dataArr ? 
          <List contentArr={dataArr} itemType={ItemTypes.LINK}/> :
          ''
        }      
      </DropContainer>
      <CustomDragLayer />
    </Section>
  )
}

export default TabsSection;