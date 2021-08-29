import React from 'react'
import { useDrop } from 'react-dnd'

import { DropContainer } from '../DropContainer/DropContainer.component'
import setting from '../setting/setting'

interface BoxProps {
  itemType: string;
}

export const Box: React.FC<BoxProps> = ({itemType}) => {

  const onDropHandler = (el:unknown) => {
    console.log('dropped in box:', el)

    return {
      dropTarget: 'box'
    }
  }


  return (
    <div className={`relative block h-36 md:h-56 box-border border-2 p-2 ${setting.border}`}>
      <div className="absolute h-12">Box Name</div>
      <DropContainer accepts={['LINK']} onDrop={onDropHandler}>
        
      </DropContainer>
    </div>
  )
}
