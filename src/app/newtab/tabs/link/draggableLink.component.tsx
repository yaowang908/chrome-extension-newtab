import React from 'react';
import { useDrag, DragSourceMonitor, useDrop, DropTargetMonitor } from 'react-dnd';
import { ItemTypes } from '../../dnd/ItemTypes';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useRecoilState, SetterOrUpdater } from "recoil";

import Link from './link.component';
import { LinkProps } from "./link.interfaces";
import { linksSelector } from '../../Recoil/links_selector.atom';

export interface DraggableLinkPropsInterface extends LinkProps {
  index: number;
  dataArr: LinkProps[] | undefined;
  setDataArr: SetterOrUpdater<LinkProps[] | undefined>;
}

export const DraggableLink:React.FC<DraggableLinkPropsInterface> = ( { itemType = ItemTypes.LINK, dataArr, setDataArr, ...props}:DraggableLinkPropsInterface) => {
  // const [dataArr, setDataArr] = useRecoilState(linksSelector);
  // DONE: make component accept generic type
  const ref = React.useRef<HTMLDivElement>(null);
  // const dataArrPreserve = dataArr ? [...dataArr] : [];

  interface MyDropObject extends LinkProps {
    type: string;
    index: number;
  }

  const moveLink = React.useCallback((dragIndex, hoverIndex) => {
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

  const removeLink = React.useCallback((dragIndex, silent = false) => {
    if(!dataArr) return;
    const result = [...dataArr];
    result.splice(dragIndex, 1);
    if(silent) {
      setDataArr(result);
    }
    if(window.confirm("Are you sure to remove this link?")) {
      setDataArr(result);
    } else {
      console.log('Abort link removal!')
    }
  }, [dataArr])


  const [{ handlerId, canDrop }, drop] = useDrop({
    accept: itemType,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop()
      }
    },
    hover(item:MyDropObject, monitor:DropTargetMonitor) {
      if(!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
          return;
      }

      moveLink(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
      // explanation about why it doesn't need a drop function:
      // when you hover, the preview will actually updated the array,
      // when you release, DnD simply remove the preview, then the result is ready, no extra move needed! 
    },
    drop(item, monitor) {
      return {
        dropTarget: 'link'
      }
    }
  });

  interface MyDragObject extends MyDropObject {
    originalIndex: number;
    type: string;
  }

  const [{ isDragging }, drag, preview] = useDrag({
      type: itemType,
      item: {originalIndex: props.index, type: itemType,...props},
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item:MyDragObject, monitor: DragSourceMonitor) => {
        // console.log("DRAGEND", item);
        const getDropResult= monitor.getDropResult() as {boxID?: string, dropEffect?: string; dropTarget: string};
        console.log('getDropResult: ', getDropResult);
        const dropTarget = getDropResult?.dropTarget || undefined;
        // DONE: if dropTarget is not list, ask user to confirm to remove link
        // TODO: when dropTarget is group, it's also ok to remove without ask
        const { index: index, originalIndex } = item;
        console.log('dropTarget: ', dropTarget);
        // didDrop will return false when drop outside of this component
        const didDrop = monitor.didDrop();
        if(!dropTarget) {
          //when drop outside all of the droppable area, prompt to remove link
          removeLink(originalIndex);
          // console.log('Dropped outside!')
        }
        if(dropTarget === 'box') {
          // dropped into one of the group box
          
        }
        return {
          isDragging: monitor.isDragging(),
        };
      }
    })

  React.useEffect(() => {
    preview(getEmptyImage(), {captureDraggingState: true})
  }, [])
  
  drag(drop(ref));

  // const attachRef = (el: HTMLDivElement) => {
  //   drag(el);
  //   drop(el);
  // }

  return (
    <div ref={ref} role="DraggableLink" id={props.id} className={`my-1 ${isDragging ? 'opacity-0': ''}`} data-handler-id={handlerId}>
      <Link dataArr={dataArr} setDataArr={setDataArr} {...props}></Link>
    </div>
  )
}