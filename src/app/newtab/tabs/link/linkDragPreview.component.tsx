import React from 'react';
import Link from './link.component';

import { LinkProps } from './link.interfaces';

export const LinkDragPreview:React.FC<LinkProps> = (props:LinkProps) => {

  return (
    <div className="inline-block w-24 overflow-hidden">
      <Link {...props} preview={true}/>
    </div>
  )
}