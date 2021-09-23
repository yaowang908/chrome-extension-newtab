import React from 'react'
import { useRecoilValue } from 'recoil';

import QuickLinkBox from './QuickLinkBox.component';
import AddQuickLink from './AddQuickLink.component';
import { QuickLinksSelector } from "../Recoil/quicklinks.atom";

const QuickLinks:React.FC = () => {
  const quickLinks = useRecoilValue(QuickLinksSelector);

  return (
    <div className="relative w-full h-auto text-white grid grid-cols-3 grid-flow-row sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 mx-auto">
      {
        Array.isArray(quickLinks) && quickLinks.length > 0
        ? quickLinks.map((_) => {
          return <QuickLinkBox/>;
        })
        : ''
      }
      <AddQuickLink />
    </div>
  );
}

export default QuickLinks
