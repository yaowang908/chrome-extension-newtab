import React from 'react'

import Section from '../section/section.component'
import { Box } from './Box.component'
import { ItemTypes } from '../dnd/ItemTypes'

export const Group:React.FC = () => {
  


  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {
          [1,2,3].map(x => <Box key={x} itemType={ItemTypes.LINK}/>)
        }        
      </div>
    </Section>
  )
}
