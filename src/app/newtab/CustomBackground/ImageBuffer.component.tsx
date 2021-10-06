import React, { Children } from 'react'

interface ImageBuffer {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ImageBuffer:React.FC<ImageBuffer> = ({onClick, ...props}) => {
  const [imgUrl, setImgUrl] = React.useState('');

  const saveNextImg = (nextBg: string) => {
    chrome.storage.sync.set({ nextBg: nextBg }, function () {
      console.log("collapse are saved");
    });
  };

  interface getNextImgProps {
    getCurrentUrlAndSetNextUrl: () => void;
    useExistNextUrlAndUpdateNextUrl: (url:string) => void;
  }

  const getNextImg = ({
    getCurrentUrlAndSetNextUrl,
    useExistNextUrlAndUpdateNextUrl,
  }: getNextImgProps) => {
    chrome.storage.sync.get(["nextBg"], function (result) {
      console.log("in sync storage fn");
      if ("nextBg" in result) {
        // setImgUrl(result.nextBg);
        console.log("nextBg exist");
        useExistNextUrlAndUpdateNextUrl(result.nextBg);
      } else {
        getCurrentUrlAndSetNextUrl(); 
      }
    });
  };

  const getImgUrl = () => {
    return fetch("https://source.unsplash.com/random/1920x1080?dark,city")
      .then((response) => {
        return response.url
      })
      .catch((error)=> {
        console.error('Fetching Error: ', error);
      });
  }
  
  React.useEffect(() => {
    const getCurrentUrlAndSetNextUrl = () => {
      getImgUrl()
        .then((currentUrl) => {
          // console.log('image url: ',url)
          if (typeof currentUrl === "string") {
            setImgUrl(currentUrl);
          }
          // prepare next img
          getImgUrl().then((nextUrl) => {
            if (typeof nextUrl === "string") {
              saveNextImg(nextUrl);
            }
          });
        })
        .catch((err) => {
          console.error("Error: ", err);
        });
    }
    const useExistNextUrlAndUpdateNextUrl = (url: string) => {
      setImgUrl(url);
      getImgUrl().then((nextUrl) => {
        if (typeof nextUrl === "string") {
          saveNextImg(nextUrl);
        }
      });
    }

    getNextImg({ getCurrentUrlAndSetNextUrl, useExistNextUrlAndUpdateNextUrl });
    
  }, []);

  return (
    <div
      className={`w-full h-screen fixed top-0 left-0 overflow-hidden bg-gray-100`}
      style={{
        backgroundColor: "white",
        zIndex: -1,
        backgroundImage: `url( ${imgUrl} )`,
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
