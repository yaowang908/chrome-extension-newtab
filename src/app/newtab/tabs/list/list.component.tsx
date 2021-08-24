import React from 'react';
import { nanoid } from "nanoid";
import { useDrop } from 'react-dnd';

import { ListProps } from './list.interfaces';
import { DraggableLink } from '../link/draggableLink.component';
import Link from '../link/link.component';
import { LinkProps } from '../link/link.interfaces';


const List:React.FC<ListProps> = ({contentArr, itemType}) => {

  // const [, drop] = useDrop({
  //     accept: itemType,
  //     drop: (item, monitor) => {
  //       const delta = monitor.getDifferenceFromInitialOffset() as {
  //         x: number
  //         y: number
  //       }
  //       console.log('list component clg: delta: ', delta);
  //       console.log('list component clg: item: ', item);
  //       return undefined;
  //     }
  //   })

  
  return (
    <div className={ `w-full h-full flex flex-col overflow-hidden` }>
      {
        contentArr?.length ?
        contentArr?.map((ele: LinkProps, index) => {
          const draggableLinkProps =  Object.assign({}, {...ele}, {itemType: itemType, index: index});
          return <DraggableLink key={nanoid()} {...draggableLinkProps}/>
        }) :
        "Empty!"
      }
    </div>
  )
}

export default List;