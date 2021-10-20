import React, { Children } from 'react'
import { useRecoilState } from 'recoil'

import {
  backgroundStatusSelector,
  currentAndNextBucketSelector,
  getImgUrl,
} from "../Recoil/background.selector";

interface ImageBuffer {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ImageBuffer:React.FC<ImageBuffer> = ({onClick, ...props}) => {
  const [curAndNextBucketState, setCurAndNextBucketState] = useRecoilState(currentAndNextBucketSelector);
  const [backgroundStatusState, setBackgroundStatusState] = useRecoilState(backgroundStatusSelector);
  
  React.useEffect(() => {
    chrome.storage.sync.get(["currentBgUrl", "nextBgUrl"], function (result) {
        console.log("in sync storage fn");
        if ("currentBgUrl" in result && "nextBgUrl" in result) {
          // when currentBgUrl and nextBgUrl exist in Chrome storage, load these URLs
          setCurAndNextBucketState({
            current: result['currentBgUrl'],
            next: result['nextBgUrl']
          });
        } else {
          setBackgroundStatusState("current");
          getImgUrl().then((url) => {
            if (typeof url === "string") {
              // return img url
              getImgUrl().then((r) => {
                if (typeof r === "string") {
                  // set bucket 1
                  setCurAndNextBucketState({current: url, next: r});
                  setBackgroundStatusState("idle");
                }
              });
            }
          }).catch((err) => {
            console.error(err);
            setBackgroundStatusState("error");
          });
        }
      })
  }, []);

  return (
    <div
      className={`w-full h-screen fixed top-0 left-0 overflow-hidden bg-gray-100`}
      style={{
        backgroundColor: "white",
        zIndex: -1,
        backgroundImage: `url( ${curAndNextBucketState.current} )`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={onClick}
    >
      {props.children}
    </div>
  );
}

export default ImageBuffer
