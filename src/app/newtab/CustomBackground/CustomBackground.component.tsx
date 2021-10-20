import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import parse from 'html-react-parser'
import ImageBuffer from './ImageBuffer.component'

import {
  backgroundStatusSelector,
  currentAndNextBucketSelector,
  getImgUrl,
  likedURLsSelector,
} from "../Recoil/background.selector";
import { notificationVisibility, notificationMessageAtom } from '../Recoil/notification.atom';
import { collapseSelector } from "../Recoil/collapse.atom"
import throttle from '../Helper/throttle'
import icon_like from "../../../assets/like.png";
import icon_loopLiked from "../../../assets/loop liked.png";
import icon_random from "../../../assets/random.png";
import icon_search from "../../../assets/search.png";

const CustomBackground = () => {
  const [collapseState, setCollapseState] = useRecoilState(collapseSelector);
  const [curAndNextBucketState, setCurAndNextBucketState] = useRecoilState(
    currentAndNextBucketSelector
  );
  const [backgroundStatusState, setBackgroundStatusState] = useRecoilState(
    backgroundStatusSelector
  );
  const [likedURLsState, setLikedURLsState] = useRecoilState(likedURLsSelector);
  const setNotificationVisibility = useSetRecoilState(notificationVisibility);
  const setNotificationMessage = useSetRecoilState(notificationMessageAtom);
  
  const customBgClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if(e.target === e.currentTarget) {
      console.log("Single Click!");
      setCollapseState(false)
    };
  };

  React.useEffect(() => {
    // init likedURLsState
    chrome.storage.sync.get(["likedURLs"], function (result) {
      if ("likedURLs" in result) {
        setLikedURLsState(result['likedURLs']);
      } else {
        // do nothing
      }
    });
  }, [])
  
  //DONE: preload next random image

  let isFetching = false;
  const buttonsClickHandler = (e:React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // console.log(e.currentTarget.id);
    const clickedId = e.currentTarget.id;
    const funcRandom = () => {
      // add fetching status, to enable pause function
      isFetching = true;
      getImgUrl()
        .then((url) => {
          isFetching = false;
          if (typeof url === "string") {
            // return img url
            // set bucket 1
            setCurAndNextBucketState({
              current: curAndNextBucketState.next,
              next: url,
            });
            setBackgroundStatusState("idle");
          }
        })
        .catch((err) => {
          console.error(err);
          setBackgroundStatusState("error");
        });
      // console.log("random");
    }

    if(clickedId === 'bg_random'){
      //DONE: add random
      // DONE: throttle
      // console.log("bg_random")
      
      // disable click while fetching
      if (isFetching) {
        setNotificationVisibility(true);
        setNotificationMessage("Too FAST!! Or Slow network responds.")
        // console.log("Too FAST!!!!");
        return;
      }
      // throttle returns a funtion, need to call
      throttle(funcRandom, 500)();
      // funcRandom()
    }

    if (clickedId === "bg_loop") {
      // TODO: loop liked
    }

    if (clickedId === "bg_like") {
      //DONE: add like button
      // console.log('like')
      if (curAndNextBucketState.current) {
        // only unique URLs
        const likedURLsNextSet = new Set([
          ...likedURLsState,
          curAndNextBucketState.current,
        ]);
        //  if no URL added, return
        if (likedURLsNextSet.size === likedURLsState.length) return;
        setLikedURLsState([...likedURLsNextSet]);        
        setNotificationVisibility(true);
        setNotificationMessage("Image Saved!");
      }
    }
    if(clickedId === 'bg_custom'){
      //TODO: put custom keyword
      console.log('custom')
    }
  };

  return (
    <ImageBuffer onClick={customBgClickHandler}>
      <div className={`absolute bottom-6 left-6`}>
        <div className="w-full h-auto grid grid-cols-4 gap-3 place-items-center bg-opacity-30 bg-gray-100 z-10 px-5 py-2">
          <div
            id="bg_random"
            className={`cursor-pointer transform scale-100 hover:scale-125 duration-300`}
            onClick={buttonsClickHandler}
          >
            <img className="w-5 h-5" src={icon_random} />
          </div>
          <div
            id="bg_loop"
            className={`cursor-pointer transform scale-100 hover:scale-125 duration-300`}
            onClick={buttonsClickHandler}
          >
            <img className="w-5 h-5" src={icon_loopLiked} />
          </div>
          <div
            id="bg_like"
            className={`cursor-pointer transform scale-100 hover:scale-125 duration-300`}
            onClick={buttonsClickHandler}
          >
            <img className="w-5 h-5" src={icon_like} />
          </div>
          <div
            id="bg_custom"
            className={`cursor-pointer transform scale-100 hover:scale-125 duration-300`}
            onClick={buttonsClickHandler}
          >
            <img className="w-8 h-8" src={icon_search} />
          </div>
        </div>
      </div>
    </ImageBuffer>
  );
}

export default CustomBackground