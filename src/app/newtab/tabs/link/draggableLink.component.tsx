import React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { ItemTypes } from '../../dnd/ItemTypes';
import { getEmptyImage } from 'react-dnd-html5-backend';

import Link from './link.component';
import { LinkProps } from "./link.interfaces";

export const DraggableLink:React.FC<LinkProps> = (props:LinkProps) => {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.LINK,
      item: {...props},
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      })
    })
  )

  React.useEffect(() => {
    preview(getEmptyImage(), {captureDraggingState: true})
  }, [])

  return (
    <div ref={drag} role="DraggableLink" className="my-1">
      <Link {...props}></Link>
    </div>
  )
}