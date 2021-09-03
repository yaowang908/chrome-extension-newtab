import React from 'react';
import Link from './link.component';

import { DraggableLinkPropsInterface } from "./draggableLink.component";

export const LinkDragPreview: React.FC<DraggableLinkPropsInterface> = (
  props: DraggableLinkPropsInterface
) => {
  return (
    <div
      style={{ maxWidth: "23rem" }}
      className="inline-block w-full opacity-50 border-2 border-yellow-200 overflow-hidden"
    >
      <Link {...props} preview={true} />
    </div>
  );
};