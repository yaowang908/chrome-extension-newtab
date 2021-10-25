import { atom, DefaultValue, selector } from "recoil";

// status state: 
//  1. display current one, and fetch next one
//  2. load next one, and prepare the one after
export type backgroundStatusType = "current" | "next" | "idle" | "error" ;

const backgroundStatusAtom = atom<backgroundStatusType>({
  key: "backgroundStatusAtom",
  default: "idle",
});

const backgroundStatusSelector = selector({
  key: "backgroundStatusSelector",
  get: ({ get }) => get(backgroundStatusAtom),
  set: ({ set, get }, method: DefaultValue | backgroundStatusType) => {
    if (method instanceof DefaultValue) {
      set(backgroundStatusAtom, method);
    } else {
      switch (method) {
        case "current":
          // show current image, pre-fetching next
          return;
        case "next":
          // update nextAndCurrent bucket, next -> current, next = ''
          // show next current image, pre-fetching next
          return;
        case "idle":
          // when idle, means get data from chrome storage
          return;
        case "error":
          // when fetching error
          return;
        default:
      }
      set(backgroundStatusAtom, method);
    }
  },
});

const getImgUrl = (keyword:string = "dark, city") => {
  return fetch(`https://source.unsplash.com/random/1920x1080?${keyword}`)
    .then((response) => {
      return response.url;
    })
    .catch((error) => {
      console.error("Fetching Error: ", error);
    });
};

// mode:
//  1. loop through liked ones
//  2. load random one
//  3. fixed one

export type backgroundModeType = "random" | "liked" | "fixed";

const backgroundModeAtom = atom<backgroundModeType>({
  key: "backgroundModeAtom",
  default: "random"
})

// URLs buckets
// Bucket 1: {current, next}
  // use sync storage
// Bucket 2: [all liked URLs]
  // use sync storage

// Bucket 1
export interface currentAndNextBucketTypeInterface {
  current: string | "", 
  next: string | ""
}

const defaultCurrentAndNextBucket = {current: '', next: ''};

const setCurrentAndNextBucketToChromeSync = (
  props: currentAndNextBucketTypeInterface
) => {
  if(props.current) {
    chromeSet({
      name: "currentBgUrl",
      value: props.current,
      successFn: () => {
        // console.log("Successfully set currentBgUrl ");
      },
      failFn: () => {
        console.error("Error when set currentBgUrl ", props.current);
      },
    });
  }
  if(props.next) {
    chromeSet({
      name: "nextBgUrl",
      value: props.next,
      successFn: () => {
        // console.log("Successfully set nextBgUrl ");
      },
      failFn: () => {
        console.error("Error when set nextBgUrl ", props.next);
      },
    });
  }
};

const currentAndNextBucketAtom = atom<currentAndNextBucketTypeInterface>({
  key: "currentAndNextBucket",
  default: defaultCurrentAndNextBucket,
});

const currentAndNextBucketSelector = selector({
  key: "currentAndNextBucketSelector",
  get: ({ get }) => get(currentAndNextBucketAtom),
  set: ({ set, get }, method: currentAndNextBucketTypeInterface | DefaultValue) => {
    if (method instanceof DefaultValue) {
      set(currentAndNextBucketAtom, method);
    } else {
      // preload images into cache
      const images = { current: new Image(), next: new Image() };
      images.current.src = method.current;
      images.next.src = method.next;
      set(currentAndNextBucketAtom, method);
      setCurrentAndNextBucketToChromeSync({
        current: method.current,
        next: method.next,
      });
    }
  },
});

// Bucket 2

type likedURLsInterface = string[];

const likedURLsAtom = atom<likedURLsInterface>({
    key: "likedURLsAtom",
    default: [],
  });


const setLikedURLsToChromeSync = (props: likedURLsInterface) => {
  chromeSet({
    name: "likedURLs",
    value: props,
    successFn: () => {
      // console.log("Successfully set likedURLs ", props);
    },
    failFn: () => {
      console.error("Error when set likedURLs ", props);
    },
  });
};

const likedURLsSelector = selector({
  key: "likedURLsSelector",
  get: ({ get }) => get(likedURLsAtom),
  set: ({ set, get }, method: likedURLsInterface | DefaultValue) => {
    if (method instanceof DefaultValue) {
      set(likedURLsAtom, method);
    } else {
      set(likedURLsAtom, method);
      setLikedURLsToChromeSync(method);
    }
  },
});

// Sync storage
// set function
// 1. exits
// 2. new
type chromeSyncValue = string | string[] | "";
interface chromeSetProps {
  name: string;
  value: chromeSyncValue;
  successFn: () => void;
  failFn: (error: chrome.runtime.LastError) => void;
}

const chromeSet = ({name, value, successFn, failFn}: chromeSetProps) => {
  chrome.storage.sync.set({[name]: value}, function() {
    let error = chrome.runtime.lastError;
    if (error) {
      console.error(error);
      failFn(error);
    } else {
      successFn();
    }
  })
}

// get function
// 1. exits
// 2. new
interface chromeGetProps {
  name: string | string[];
  successFn: (value: string[]) => void;
  failFn: () => void;
}

const chromeGet = ({
  name,
  successFn,
  failFn,
}: chromeGetProps) => {
  if (typeof name === "string") {
    chrome.storage.sync.get([name], function (result) {
      if (name in result) {
        successFn(result[name]);
      } else {
        failFn();
      }
    });
  } else {
    chrome.storage.sync.get([...name], function (result) {
      const res: string[] = [];
      let status = false;
      name.map((n, index) => {
        if (n in result) {
          res.push(result[n]);
          status = true;
        } else {
          status = false;
        }
      });
      if (status) {
        successFn(res);
      } else {
        failFn();
      }
    });
  }
};

// fetch data from Chrome sync storage on init

const getCurrentAndNextBucketFromChromeSync = (
  setInitialRecoilState: (newState: currentAndNextBucketTypeInterface) => void
) => {
  chromeGet({
    name: ["currentBgUrl", "nextBgUrl"],
    successFn: (value) => {
      let current = '', next = '';
      if (typeof value === "string") {
        current = value[0];
        next = value[1];
      }
      setInitialRecoilState({current: current, next: next});
    },
    failFn: () => {
      // this is init round
      console.error("Error when get CurrentAndNextBucket ");
    },
  });
};

const getLikedURLsFromChromeSync = (
  setInitialRecoilState: (newState: likedURLsInterface) => void
) => {
  chromeGet({
    name: ["likedURLs"],
    successFn: (value) => {
      setInitialRecoilState(value);
    },
    failFn: () => {
      console.error("Error when get liked URLs");
    },
  });
};

const keywordAtom = atom<string >({
  key: "keywordAtom",
  default: 'dark,city'
})

const setKeywordToChromeSync = (newState:string) => {
  chromeSet({
    name: "keyword",
    value: newState,
    successFn: () => {
      // console.log("Successfully set keyword ");
    },
    failFn: () => {
      console.error("Error when set keyword ", newState);
    },
  });
}

const keywordSelector = selector({
  key: "keywordSelector",
  get: ({ get }) => get(keywordAtom),
  set: ({ set, get }, method: string | DefaultValue) => {
    if (method instanceof DefaultValue) {
      set(keywordAtom, method);
    } else {
      set(keywordAtom, method);
      setKeywordToChromeSync(method);
    }
  },
});

export {
  backgroundStatusSelector,
  backgroundModeAtom,
  currentAndNextBucketSelector,
  getImgUrl,
  likedURLsSelector,
  getCurrentAndNextBucketFromChromeSync,
  getLikedURLsFromChromeSync,
  keywordSelector,
};