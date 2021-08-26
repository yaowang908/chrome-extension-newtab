import React from 'react';
import { nanoid } from "nanoid";
import { useDrop } from 'react-dnd';

import { ListProps } from './list.interfaces';
import { DraggableLink } from '../link/draggableLink.component';
import { LinkProps } from '../link/link.interfaces';


const List:React.FC<ListProps> = ({contentArr, itemType}) => {

  const [, drop] = useDrop({
      accept: itemType,
      drop: (item, monitor) => {

        console.log('drops');
        return undefined;
      }
    })

  // so nanoid cannot be used here, because the React DnD update handler-id related to react key
  // each time nanoid will generate different id, so the DnD constantly assign new handler-id 
  // thus the logic is broken.
  
  return (
    <div className={ `w-full h-full flex flex-col overflow-hidden` }>
      {
        contentArr?.length ?
        contentArr?.map((ele: LinkProps, index) => {
          const draggableLinkProps =  Object.assign({}, {...ele}, {itemType: itemType, index: index});
          return <DraggableLink key={ele.id} {...draggableLinkProps}/>
        }) :
        "Empty!"
      }
    </div>
  )
}

export default List;