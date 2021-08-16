import React from 'react';

import { RowProps } from './row.interfaces';
import Link from '../link/link.component';
import { LinkProps } from '../link/link.interfaces';

const Row: React.FC<RowProps> = ({contentArr}: RowProps) => {

  return (
    <div className={
        `w-full grid 
        grid-cols-${contentArr?.length ? contentArr?.length : 1} 
        gap-2 overflow-hidden lg:h-36`
      }>
      {
        contentArr?.length ?
        contentArr?.map((ele: LinkProps) => {
          return <Link key={ele?.title} link={ele?.link} imageUrl={ele?.imageUrl} title={ele?.title}/>
        }) :
        "Empty!"
      }
    </div>
  )
}

export default Row;