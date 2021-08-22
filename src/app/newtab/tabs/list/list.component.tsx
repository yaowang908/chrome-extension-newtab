import React from 'react';
import { nanoid } from "nanoid";
import { useDrop } from 'react-dnd';

import { ListProps } from './list.interfaces';
import { DraggableLink } from '../link/draggableLink.component';
import Link from '../link/link.component';
import { LinkProps } from '../link/link.interfaces';


const List:React.FC<ListProps> = ({contentArr, itemType}) => {

  const [, drop] = useDrop(
    () => ({
      accept: itemType,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as {
          x: number
          y: number
        }
        console.log(delta, item);
        return undefined;
      }
    })
  )

  return (
    <div ref={drop} className={ `w-full h-full flex flex-col overflow-hidden` }>
      {
        contentArr?.length ?
        contentArr?.map((ele: LinkProps) => {
          return <DraggableLink key={nanoid()} {...ele} itemType={itemType}/>
        }) :
        "Empty!"
      }
    </div>
  )
}

export default List;