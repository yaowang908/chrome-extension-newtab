import React from 'react'
import { useDrop } from 'react-dnd'

import { DropContainerProps } from './DropContainer.interfaces'

export const DropContainer:React.FC<DropContainerProps> = (
  {
    lastDroppedItem,
    accepts: accept,
    onDrop,
    children
  }
) => {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      drop: (item: unknown) => onDrop(item)      
    }),
    [accept],
  );

  const isActive = isOver && canDrop;
  let bgClass = 'bg-transparent';
  if (isActive) {
    // bgClass = 'bg-green-300'
  } else if (canDrop) {
    bgClass = 'bg-green-300';
  }

  return (
    <div ref={drop} className={`w-full h-full relative ${bgClass}`}>
      {children}
    </div>
  )
}
