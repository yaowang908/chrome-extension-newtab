import React from 'react';
import { XYCoord, useDragLayer } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { LinkDragPreview } from '../tabs/link/linkDragPreview.component';

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    }
  }

  let { x, y } = currentOffset

  // if (isSnapToGrid) {
  //   x -= initialOffset.x
  //   y -= initialOffset.y
  //   ;[x, y] = snapToGrid(x, y)
  //   x += initialOffset.x
  //   y += initialOffset.y
  // }

  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform,
  }
}


export const CustomDragLayer: React.FC = () => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }))

  function renderItem() {
    // console.log('Preview fired! item: ', item)
    // add new case if other column need to be draggable
    switch (itemType) {
      case ItemTypes.LINK:
        return <LinkDragPreview {...item} />
      default:
        return null
    }
  }

  return (
    <div className={`fixed pointer-events-none z-50 left-0 top-0 w-full h-full`}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </div>
  )
}