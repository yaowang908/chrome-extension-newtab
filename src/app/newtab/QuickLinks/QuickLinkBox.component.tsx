import React from 'react'
import { useSetRecoilState } from 'recoil'
import {
  quickLinkInterface,
  QuickLinkEditorVisibility,
  QuickLinkEditorMode,
  SelectedQuickLinkIndex,
} from "../Recoil/quicklinks.atom";
import protocolAutoPrefix from "../Helper/protocolAutoPrefix";
import LazyImage from '../LazyImage/LazyImage.component';

const QuickLinkBox: React.FC<quickLinkInterface> = ({ title, url, index = false}) => {
  const setVisibility = useSetRecoilState(QuickLinkEditorVisibility);
  const setMode = useSetRecoilState(QuickLinkEditorMode);
  const setSelectedQuickLinkIndexState = useSetRecoilState(SelectedQuickLinkIndex);
  const [iconUrl, setIconUrl] = React.useState('');

  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if(e.target === e.currentTarget) {
      chrome.tabs.create({
        active: true,
        url: url,
      });
    }
  };

  const editClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      setVisibility(true);
      setMode('edit');
      setSelectedQuickLinkIndexState(index);
    }
  }

  React.useEffect(() => {
    setIconUrl(
      `https://www.google.com/s2/favicons?domain=${protocolAutoPrefix(url)}`
    );
  }, [])

  return (
    <div
      className="relative pb-full box-border color-white cursor-pointer box-border group z-20 grid place-items-center hover:bg-white hover:bg-opacity-30 focus:bg-white focus:bg-opacity-30"
      style={{ width: "10vmin", height: "10vmin" }}
      onClick={onClickHandler}
      tabIndex={index === false ? undefined : index}
    >
      <div
        className="text-vertical absolute w-6 h-full top-0 -right-6 box-border text-left transform origin-bottom-left bg-opacity-0 ease-in-out delay-150 duration-300 opacity-0 z-0 group-hover:opacity-100 group-hover:bg-opacity-10 text-lg "
        onClick={editClickHandler}
      >
        ...
      </div>
      <LazyImage
        src={iconUrl}
        alt={title}
        className="block pointer-events-none"
        style={{ width: "3vmin", height: "3vmin" }}
      />
      {title}
    </div>
  );
};

export default QuickLinkBox
