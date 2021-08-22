import React from 'react';
import { nanoid } from "nanoid";

import { RowProps } from './list.interfaces';
import Link from '../link/link.component';
import { LinkProps } from '../link/link.interfaces';

const List: React.FC<RowProps> = ({contentArr}: RowProps) => {

  return (
    <div className={
        `w-full grid 
        grid-rows-auto
        gap-2 overflow-hidden`
      }>
      {
        contentArr?.length ?
        contentArr?.map((ele: LinkProps) => {
          return <Link key={nanoid()} {...ele}/>
        }) :
        "Empty!"
      }
    </div>
  )
}

export default List;