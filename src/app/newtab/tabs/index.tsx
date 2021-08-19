import React from 'react';
import { useRecoilValue } from 'recoil';

import { LinkProps } from '../tabs/link/link.interfaces';
import { links } from '../Recoil/newtab.atom';
import Section from '../section/section.component';
import Row from "./row/row.component";

const TabsSection: React.FC = () => {
  const dataArr = useRecoilValue(links);

  return (
    <Section>      
      <Row contentArr={dataArr}/>
    </Section>
  )
}

export default TabsSection;