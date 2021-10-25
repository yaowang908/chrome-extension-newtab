import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import parse from 'html-react-parser'
import ImageBuffer from './ImageBuffer.component'

import {
  backgroundStatusSelector,
  currentAndNextBucketSelector,
  getImgUrl,
  likedURLsSelector,
  keywordSelector,
} from "../Recoil/background.selector";
import { notificationVisibility, notificationMessageAtom } from '../Recoil/notification.atom';
import { collapseSelector } from "../Recoil/collapse.atom"
import throttle from '../Helper/throttle'
import icon_like from "../../../assets/like.png";
import icon_loopLiked from "../../../assets/loop liked.png";
import icon_random from "../../../assets/random.png";
import icon_search from "../../../assets/search.png";
import LazyImage from '../LazyImage/LazyImage.component';
import Popup from '../Popup/Popup.component';
import { loadingModuleVisibility } from "../Recoil/loading.selector";

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
  const [keywordState, setKeywordState] = useRecoilState(keywordSelector);
  const [searchInputVisibility, setSearchInputVisibility] = React.useState(false);
  const [loadingModuleVisibilityState, setLoadingModuleVisibilityState] = useRecoilState(loadingModuleVisibility);

  const keywordInputRef = React.useRef<HTMLInputElement>(null)
  
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

  React.useEffect(() => {
    // init keyword
    chrome.storage.sync.get(["keyword"], function (result) {
      if ("keyword" in result) {
        setKeywordState(result["keyword"]);
      } else {
        // do nothing
      }
    });
  }, [])
  
  //DONE: preload next random image

  let isFetching = false;
  const funcRandom = () => {
    // add fetching status, to enable pause function
    // TODO: when keyword changes, update both at first run
    isFetching = true;
    setLoadingModuleVisibilityState(true);
    getImgUrl(keywordState)
      .then((url) => {
        isFetching = false;
        if (typeof url === "string") {
          // return img url
          // set bucket 1
          // TODO: even though, it get new images on click, but it is also possible to return the same image, that's why sometimes the bg won't update
          setCurAndNextBucketState({
            current: curAndNextBucketState.next,
            next: url,
          });
          setBackgroundStatusState("idle");
          setLoadingModuleVisibilityState(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setBackgroundStatusState("error");
      });
    // console.log("random");
  }
  const buttonsClickHandler = (e:React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // console.log(e.currentTarget.id);
    const clickedId = e.currentTarget.id;

    if(clickedId === 'bg_random'){
      //DONE: add random
      // DONE: throttle
      // console.log("bg_random")
      
      // disable click while fetching
      if (isFetching) {
        setNotificationVisibility(true);
        setNotificationMessage("Too FAST!! Or Slow network responds.")
        console.log("Too FAST!!!!");
        return;
      }
      // throttle returns a function, need to call
      throttle(funcRandom, 500)();
      // funcRandom()
    }

    if (clickedId === "bg_loop") {
      // TODO: loop liked
      // every 30 minutes change image
      // or every time collapse the content
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
      //DONE: put custom keyword
      console.log('custom')
      setSearchInputVisibility(true);
    }
  };

  const closeClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.target === e.currentTarget) {
      setSearchInputVisibility(false);
    }
  };

  const saveClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    // DONE: update keyword
    if(keywordInputRef?.current) {
      setKeywordState(keywordInputRef.current?.value);
      setSearchInputVisibility(false);
      // completely replace current and next url
      // DONE: bring loading screen
      setLoadingModuleVisibilityState(true);
      getImgUrl(keywordInputRef.current?.value)
        .then((url) => {
          if (typeof url === "string") {
            // return img url
            getImgUrl(keywordState).then((r) => {
              if (typeof r === "string") {
                // set bucket 1
                setCurAndNextBucketState({ current: url, next: r });
                setBackgroundStatusState("idle");
                setLoadingModuleVisibilityState(false);
              }
            });
          }
        })
        .catch((err) => {
          console.error(err);
          setBackgroundStatusState("error");
        });
    }
  };

  return (
    <>
      {searchInputVisibility ? (
        <Popup outClick={closeClickHandler}>
          <div className="w-full h-full p-5 border-blue-900 text-blue-900 relative box-border flex flex-col">
            <h1 className="text-3xl font-bold border-b-2 pb-2">
              Custom Keyword(s)
            </h1>
            <div className="relative flex-auto overflow-y-scroll">
              <div className="mt-12 w-full grid grid-cols-1 gap-1 mx-auto max-w-3xl">
                <input type="text" placeholder={keywordState} className="max-w-md py-2 px-6 mx-auto w-2/4 text-lg" onChange={() => {}} ref={keywordInputRef}/>
              </div>
              <div>
                <p className="text-gray-600 text-center mt-12 text-base">
                  separate multiple keywords with comma(,)
                </p>
              </div>
              <div className="h-12 flex-auto text-center bg-gray-100 absolute bottom-0 left-0 w-full">
                <div
                  className="inline-block w-32 text-center border-2 px-6 py-2 bg-blue-900 text-white cursor-pointer text-2xl font-bold"
                  onClick={saveClickHandler}
                >
                  Save
                </div>
                <div
                  className="inline-block w-32 text-center border-2 px-6 py-2 bg-blue-900 text-white cursor-pointer text-2xl font-bold"
                  onClick={closeClickHandler}
                >
                  Close
                </div>
              </div>
            </div>
          </div>
        </Popup>
      ) : (
        ""
      )}
      <ImageBuffer onClick={customBgClickHandler}>
        <div className={`absolute bottom-6 left-6`}>
          <div className="w-full h-auto grid grid-cols-4 gap-3 place-items-center bg-opacity-30 bg-gray-100 z-10 px-5 py-2">
            <div
              id="bg_random"
              className={`cursor-pointer transform scale-100 hover:scale-125 duration-300`}
              onClick={buttonsClickHandler}
            >
              <LazyImage
                className="w-5 h-5"
                src={icon_random}
                alt="Random Background"
              />
            </div>
            <div
              id="bg_loop"
              className={`cursor-pointer transform scale-100 hover:scale-125 duration-300`}
              onClick={buttonsClickHandler}
            >
              <LazyImage
                className="w-5 h-5"
                src={icon_loopLiked}
                alt="Random liked background"
              />
            </div>
            <div
              id="bg_like"
              className={`cursor-pointer transform scale-100 hover:scale-125 duration-300`}
              onClick={buttonsClickHandler}
            >
              <LazyImage
                className="w-5 h-5"
                src={icon_like}
                alt="Like this image"
              />
            </div>
            <div
              id="bg_custom"
              className={`cursor-pointer transform scale-100 hover:scale-125 duration-300`}
              onClick={buttonsClickHandler}
            >
              <LazyImage
                className="w-8 h-8"
                src={icon_search}
                alt="set keyword"
              />
            </div>
          </div>
        </div>
      </ImageBuffer>
    </>
  );
}

export default CustomBackground