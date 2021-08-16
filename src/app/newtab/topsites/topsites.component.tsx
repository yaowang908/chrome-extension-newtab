import React from 'react'

import Section from '../section/section.component';

interface TopSiteProps {

}

const TopSites:React.FC<TopSiteProps> = ({}:TopSiteProps) => {
  // const [topSites, setTopSites] = React.useState(undefined);

  const clickHandler = () => {
    console.log(chrome);
    console.log(chrome.topSites);
    chrome.topSites.get((url_list) => {
      for(var i=0;i<url_list.length;i++) {
        console.log(url_list[i]);
      }
    })
  }


  return (
    <Section>
      <div className="grid grid-cols-3 mb-4">
        <button onClick={clickHandler}>get top sites</button>      
      </div>
    </Section>
  )
}

export default TopSites;