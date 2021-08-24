import React from 'react';
import { useDrag, DragSourceMonitor, useDrop, DropTargetMonitor } from 'react-dnd';
import { ItemTypes } from '../../dnd/ItemTypes';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useRecoilState } from 'recoil';

import Link from './link.component';
import { LinkProps } from "./link.interfaces";
import { linksSelector } from '../../Recoil/links_selector.atom';

interface DraggableLinkPropsInterface extends LinkProps {
    index: number;
  }

export const DraggableLink:React.FC<DraggableLinkPropsInterface> = ( { itemType = ItemTypes.LINK, ...props}:DraggableLinkPropsInterface) => {
  const [dataArr, setDataArr] = useRecoilState(linksSelector);
  const ref = React.useRef<HTMLDivElement>(null);
  // const dataArrPreserve = dataArr ? [...dataArr] : [];

  interface DropObject extends LinkProps {
    type: string;
    index: number;
  }

  const moveLinkPreview = React.useCallback((dragIndex, hoverIndex) => {
    if(!dataArr) return;
    // console.log('dragIndex, hoverIndex: ', dragIndex, hoverIndex);
    const draggedItem = dataArr[dragIndex];
    // console.log('before splice: ', dataArr);
    const result = [...dataArr];
    result.splice(dragIndex, 1);
    // console.log('before insert: ', result);
    result.splice(hoverIndex, 0, draggedItem);
    // console.log('dragIndex', dragIndex);
    // console.log('hoverIndex', hoverIndex);
    setDataArr(result);
  }, [dataArr])


  const [{ handlerId }, drop] = useDrop({
    accept: itemType,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item:DropObject, monitor:DropTargetMonitor) {
      if(!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
          return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = (clientOffset?.y? clientOffset.y : 0) - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
      }
      // Time to actually perform the action
      moveLinkPreview(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
      // explanation about why it doesn't need a drop function:
      // when you hover, the preview will actually updated the array,
      // when you release, DnD simply remove the preview, then the result is ready, no extra move needed! 
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
      type: itemType,
      item: () => ({...props}),
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
        delta: monitor.getDifferenceFromInitialOffset(),
      }),
      end: (item, monitor: DragSourceMonitor) => {
        // const delta = monitor.getDropResult();
        // console.log("DRAGEND", item, delta);
        // console.log(delta);
        return undefined;
      }
    })

  React.useEffect(() => {
    preview(getEmptyImage(), {captureDraggingState: true})
  }, [])
  
  drag(drop(ref));

  console.log(isDragging);

  return (
    <div ref={ref} role="DraggableLink" className={`my-1 ${isDragging ? 'opacity-0': ''}`} data-handler-id={handlerId}>
      <Link {...props}></Link>
    </div>
  )
}