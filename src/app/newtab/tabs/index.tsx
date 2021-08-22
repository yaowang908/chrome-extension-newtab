import React from 'react';
import { useRecoilValue } from 'recoil';

import { LinkProps } from '../tabs/link/link.interfaces';
import { linksSelector } from '../Recoil/links_selector.atom';
import Section from '../section/section.component';
import List from "./list/list.component";

const TabsSection: React.FC = () => {
  const dataArr = useRecoilValue(linksSelector);

  return (
    <Section>      
      <List contentArr={dataArr}/>
    </Section>
  )
}

export default TabsSection;