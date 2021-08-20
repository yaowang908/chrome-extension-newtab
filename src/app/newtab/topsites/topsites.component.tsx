import { nanoid } from 'nanoid';
import React from 'react'
import { useRecoilValue } from 'recoil';

import Row from '../tabs/row/row.component';
import Section from '../section/section.component';
import { LinkProps } from '../tabs/link/link.interfaces';
import { colorThemeSelector } from "../Recoil/color_theme.atom";
import setting from '../setting/setting';

const TopSites:React.FC = () => {
  const [topSites, setTopSites] = React.useState<LinkProps[] | undefined>(undefined);
  const colorTheme = useRecoilValue(colorThemeSelector);

  // const clickHandler = () => {
  //   console.log(chrome);
  //   console.log(chrome.topSites);
  //   chrome.topSites.get((url_list) => {
  //     for(var i=0;i<url_list.length;i++) {
  //       console.log(url_list[i]);
  //     }
  //   })
  // }

  React.useEffect(() => {
    if(chrome.topSites) {
      chrome.topSites.get((url_list) => {
        const formatData: LinkProps[] = [];
        url_list.map((x) => {
          formatData.push({
            id: nanoid(),
            link: x.url,
            title: x.title
          })
        })
        setTopSites(formatData)
      })
    } else {
      console.error('Your browser doesn\'t support top site method!');
    }
  }, [])


  return (
    <Section>
      <h3 className={`text-md font-bold border-b-2 ${setting.headBorder[colorTheme]} ${setting.text[colorTheme]} mb-2`}>Top Sites</h3>
      {/* <button onClick={clickHandler}>get top sites</button>    */}
      {
        topSites ?
        <Row contentArr={topSites}/> :
        ''
      }
    </Section>
  )
}

export default TopSites;