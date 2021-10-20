import React from 'react'
import { useRecoilState } from 'recoil'
import parse from 'html-react-parser'
import ImageBuffer from './ImageBuffer.component'

import {
  backgroundStatusSelector,
  currentAndNextBucketSelector,
  getImgUrl,
  likedURLsSelector,
} from "../Recoil/background.selector";
import { collapseSelector } from "../Recoil/collapse.atom"
import throttle from '../Helper/throttle'

const CustomBackground = () => {
  const [collapseState, setCollapseState] = useRecoilState(collapseSelector);
  const [curAndNextBucketState, setCurAndNextBucketState] = useRecoilState(
    currentAndNextBucketSelector
  );
  const [backgroundStatusState, setBackgroundStatusState] = useRecoilState(
    backgroundStatusSelector
  );
  const [likedURLsState, setLikedURLsState] = useRecoilState(likedURLsSelector);
  
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
        console.log("Too FAST!!!!");
        return;
      }
      // throttle returns a funtion, need to call
      throttle(funcRandom, 500)();
      // funcRandom()
    }



    if(clickedId === 'bg_like'){
      //DONE: add like button
      // console.log('like')
      if (curAndNextBucketState.current) {
        // only unique URLs
        const likedURLsNextSet = new Set([
          ...likedURLsState,
          curAndNextBucketState.current,
        ]);
        //  if no URL added, return
        if(likedURLsNextSet.size === likedURLsState.length) return;
        setLikedURLsState([...likedURLsNextSet]);
      }
    }
    if(clickedId === 'bg_custom'){
      //TODO: put custom image url
      console.log('custom')
    }
  };

  return (
    <ImageBuffer
      onClick={customBgClickHandler}
    >
      <div className={`absolute bottom-6 left-6`}>
        <div className="w-full h-auto grid grid-cols-3 gap-3 place-items-center bg-opacity-50 bg-gray-100 z-10">
          <div
            id="bg_random"
            className={`cursor-pointer transform scale-100 hover:scale-125 duration-300`}
            onClick={buttonsClickHandler}
          >
            <img
              className="w-8 h-8"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAADAUlEQVR4nO3aT6gWVRjH8c/rVbwt7A+SktqFvJqBupXMP60kAykIJGyVIoHkKoMWISIIppIL/4K6ClxEKxeulKKCyoUFIVb4hwxqEeZFBTWxdDFzmXNfnPfOjPd13nvnfOHA+86cc57feWbOmWeeM0QikUgkEolEmklf3QIekaU4iRn4umYttbAH99Oyu2YttTAHlzXcCc/joswJn9Yrpx6iE0QnoIITJo9yfj1e7nD+Nm7gPL7Fn4VkVmM+XsVcPIkpOfUuYDD9/QHu4aMqBufJPFmk/I9v8HoVYzn04T38UFJLexls77gIU3EK1zqUmzkGj+PZKkYDFuFMTv9DHTQNtdX9KR1L13gKr2BfKmDY8B94qWKfb0im13Bfl7AVC/FEh3aTcCxo97NHvxClmIHPjXTCrJJ9rMCdtP1dbFfsCrZwJLB9LtVTCzsDId/LX7DamYm/0nb3sLZguxYOBjZ/xXMl9HaF8FbcVaB+H74K2mwoaKeFQ0G78xJH1k4/zsqeEG+OUn+HbBDHCtpoYX/Q7jflp1xXmYfrEnH/YCCn3mv4T7ZwdVroQt7XY7f9w1ir83owG3+n529gQYm+P9SjV76d8DbdGxyfLIkgh8+tK9lvS/IInjYGGrvKFHwnWw/eSo/vkg3+cD3SHh8vyKK0IWyWOOM+fpQsmhOeNbJBD5ebys37cc9eIx3wTp1iJtVpvIk0egqEi+A1DVsEG/8YDAOhME83FoHQcj0eCHUzFN6ix0Ph8GXoqrF/Gdqkh1+Gpmr46/BRmbBPCtSfUAmRsUqJvV2wXc+kxGbii0DIlQpClhuZFN2hx5OiT2MZDhiZk/8dL1bscw1uBX1dxjYs9hjT4v04rdrGyGeYXtVwykLJ9KltY6Ts1ti/OIFVVYzl0IeNsiiyapmbZ6A1ioB3Jd/h5HFb4vVf8KUk8dktBrFSMphn5C+sA1gd/N+t4uboeGRAso32sLB7whMHLw6+eYOfreGfyYUJlcYNHpZI0mkf1y0kEolEIpFIJDLeeACv7nmsXVksTwAAAABJRU5ErkJggg=="
            />
          </div>
          <div
            id="bg_like"
            className={`cursor-pointer transform scale-100 hover:scale-125 duration-300`}
            onClick={buttonsClickHandler}
          >
            <img
              className="w-8 h-8"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAE90lEQVR4nO3aWYwVRRSA4W9mmBFmQAZFUeKDIK5EfVHUxMQXTXzDjShKfCDBNSZGE3GJLxq3GOMTxn2Nu0GjUeMSYyRuQTNBEVyJCIr7ioKKXB+q266+w8zcpfvOIPdPOt33dtU5p6qrq0+dOrRp06ZNmx2Xjibq7o3jcACmYjx+xg/4EMuxulkDBRsPxOGJrl3Qj834LtH1Ir4oQNeITMRlGEClhuMjXIqdG9A1GZfjkxp1vYvF6GuoZSMwDufj620o3ooNiaHrsWkbZb7CaXXoWzCErj+wLtG1IdFdXWYDzkFXg20dxBRhiMVKVuAKHCx0TkwXZuMCg0fKzSMY1o0lBj/Z83HQNup24xBcifeq6j0vjKKm2EcYxqnQj3GK+uaO+fJP854h6nfiIflRM68OPR04FZ9GMlZjRh0ycvQLE0wq7GFMaFDWXlgZybp2G2Vukh9h0xvU1YvHIlmrNDASuvBCJOQGzX0xCLN3Opq24vjo3lzZ+/yB0PnN0IEbZfY/p845YVFU+VHNNz7lAOFTWRFei37sKnzOKvgRswrS1YEnZO1YWGvFXnyZVPos+V0kCyOjluD26PeCgnX14fNE9jo1vsIXRQadXrBBhCfzUiL/n+So4NkSdBE6NW3PhbVUeFM2g3aWZNRB2BIZ9hf2LUlXp2wyf32kwtNkT+SqkgxKuUPWAbeUrOsa2YjbY7iCZ0RGzSnZqOnCe7l2JKMK4EhZu+bHN6q9uP2j6yIWMsPxleCkpE+mTFZF13EbB73jU5Pzb8lRNluU33j4FRuT66nxjeoO6EnOv5Rt0Sjwc3IeH/9Z3QGbknPR3/6xwKTk/Hv8Z3UHfJ+c+1X11HZOr6wDvo9vVHfAmuj/olzSscAsWVvXxDeqO2BFdH1EmRa1mKOi64HhCnbKFisPlWlRi3lUttga0bt9OCm8UUnxtRbTJ7SlggdqqXCSzGs6uzy7Wsa5svbMraXCOMFFrQhuas/wxcc0PbLl8FqDPd8huUTWa4tKMa01xE//onoq9gm+ehpIaDZENRpMkQV21msgnhmvDO8v1LTW8KDM/nr2JHLEMbV6QtSjzYkyu59qRtA0WcDyO8xs2rTymSXsT6Y2796swHnyMfaxPB/sIgt/bcXJRQlOQ0oVvGpsfhq78bLMzkJDeh14XH5SLCtg2ghdMg+2gkcUt5fxH714O1Jyt7HRCZ3CA0ntekPjW3gj0o93ImV3Gd1O6MCtkT0DwjxQKrvJb3TeqcC9+DoYh3sjO1YI22wtYZoQNU6VL9XaCNIEPB3pXyk8mJayK96S/zo0nZBQA/14LdK73Cg0PmWifPbI+xrf16+FafJZJ69oLP+oUHaST0hYo5x44gwhQyXV86QxFLjtwm0y4zbg0ALlzxZWdHGaTc1r+1bRgetkRv6IowuQewx+iuReXYDMUrlAtsO8WXOryBOE1LjUt7+4aetaxJnCnn9F2P87qwEZ58lyCP5UTrJGqRwrbEqmQ/f6OuoujuptlE+o2q6Yg2/lc4KGc5275HOGvsFhJdtYOjPl830fFJau1XThPvnP6X4tsrF09pRPZV0q+A8p4+Vd2wHlZ420nCmyBKzUi5soRKBjb3K5Fi5qWs1kLJM1dpmwfo/XE5OGrP0/oVc+Dbd6ROwQ9Ai+fNr4Z4ySX1943KwOuoU8/61C0PXvUbSlTZs2bdrskPwL2xGeQlshAS4AAAAASUVORK5CYII="
            />
          </div>
          <div
            id="bg_custom"
            className={`cursor-pointer transform scale-100 hover:scale-125 duration-300`}
            onClick={buttonsClickHandler}
          >
            <img
              className="w-8 h-8"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABHElEQVRYhe3Wv0oDQRDH8U/E1KYRLNRC30Ar8SFEtPF1VEyhVnmN1IIg6AvYBPQVJAlqIYomSiwy4ZagXfZQuB8Ms3+G/c7N3u4dlSrl0TZuMMQb2lgrC76PAUZ4wUe0+1gvAz4M4BnqaOAixtplwXtYTOYaeMcrarnh/fCdJIm68XYMMJcT3gxoZyqJ8+hf54ZPlCbRCz/AVhnwNInJdgwjfmbaUxy1019ijmP+EwcVvIJX8H8HTy+Z1i8xTZkuGejG4iM8YrdM+HIs/oSraH8lSWSFw04ALo2/3UeKSrRyw+EwICfRrykqMXP4/A9jG+EXIonNMIq3Peuv1YPiaVPrylD26QqsYgnPuMdtYnezhv+kBlbKAFX6M/oGnuuQx6252wsAAAAASUVORK5CYII="
            />
          </div>
        </div>
      </div>
    </ImageBuffer>
  );
}

export default CustomBackground