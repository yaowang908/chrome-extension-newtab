import React from 'react'
import { useDrop } from 'react-dnd'

import { DropContainer } from '../DropContainer/DropContainer.component'

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
    <div className='block bg-red-600 h-36 md:h-56'>
      <DropContainer accepts={['LINK']} onDrop={onDropHandler}/>
    </div>
  )
}
