import React from 'react';
import Link from './link.component';

import { LinkProps } from './link.interfaces';

export const LinkDragPreview:React.FC<LinkProps> = (props:LinkProps) => {

  return (
    <div style={{'maxWidth':'30%'}}  className="inline-block w-full opacity-50 border-2 border-yellow-200 overflow-hidden">
      <Link {...props} preview={true}/>
    </div>
  )
}