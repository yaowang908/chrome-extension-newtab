import React from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";

import {
  QuickLinkEditorVisibility,
  QuickLinkEditorMode,
  QuickLinksSelector,
  quickLinkInterface,
  SelectedQuickLinkIndex,
} from "../Recoil/quicklinks.atom";
import Popup from "../Popup/Popup.component";
import {
  errorModuleVisibility,
  errorMessageAtom,
} from "../Recoil/errorModule.atom";

const EditQuickLink = () => {
  const [visibility, setVisibility] = useRecoilState(QuickLinkEditorVisibility);
  const mode = useRecoilValue(QuickLinkEditorMode);
  const [quickLinksState, setQuickLinksState] = useRecoilState(QuickLinksSelector);
  const [titleLocalState, setTitleLocalState] = React.useState<string>('');
  const [urlLocalState, setUrlLocalState] = React.useState<string>('');
  const setErrorVisibility = useSetRecoilState(errorModuleVisibility);
  const setErrorMessage = useSetRecoilState(errorMessageAtom);
  const [selectedQuickLinkIndexState, setSelectedQuickLinkIndexState] =
    useRecoilState(SelectedQuickLinkIndex);

  const closeClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setVisibility(!visibility);
    }
  };

  //DONE: selected id, update or create base on mode
  
  const protocolAutoPrefix = (link: string) => {
    if (link.startsWith("http://") || link.startsWith("https://")) return link;
    // http will auto redirect to https if available
    return `http://${link}`;
  };

  const saveClickHandler = () => {
    console.log("Save!");
    if(titleLocalState === '' || urlLocalState === '') {
      setErrorVisibility(true);
      setErrorMessage("Title or/and URL is empty!");
      return;
    };
    const current: quickLinkInterface = {
      title: titleLocalState,
      url: protocolAutoPrefix(urlLocalState),
    };
    console.log(current);
    const newQuickLinksArr = [...quickLinksState];
    newQuickLinksArr.push(current);
    setQuickLinksState(newQuickLinksArr);
    setVisibility(!visibility);
    setSelectedQuickLinkIndexState(false);
  };

  interface onChangeHandlerProps {
    e: React.ChangeEvent<HTMLInputElement>;
    id: string;
  }

  const onChangeHandler = ({e, id}:onChangeHandlerProps) => {
    if(id === 'title') {
      if (e.target.value !== '') {
        setTitleLocalState(e.target.value);
      }
    }
    if(id === 'url') {
      if (e.target.value !== "") {
        setUrlLocalState(e.target.value);
      }
    }
  }

  React.useEffect(() => {
    if (selectedQuickLinkIndexState === false) {
      // setTitleLocalState('');
      // setUrlLocalState('');
      return;
    }
    console.log(selectedQuickLinkIndexState);
    setTitleLocalState(quickLinksState[selectedQuickLinkIndexState]["title"]);
    setUrlLocalState(quickLinksState[selectedQuickLinkIndexState]["url"]);
  }, [selectedQuickLinkIndexState]);

  const updateClickHandler = () => {
    if (selectedQuickLinkIndexState === false) {
      setErrorVisibility(true);
      setErrorMessage("No link selected");
      return;
    }
    
    // console.log("update! index: ", titleLocalState, urlLocalState);
    const nextState = [...quickLinksState];
    // console.log(nextState[selectedQuickLinkIndexState]);
    nextState.splice(selectedQuickLinkIndexState, 1, {title: titleLocalState, url: urlLocalState});
    setQuickLinksState(nextState);
    setVisibility(!visibility);
    setTitleLocalState("");
    setUrlLocalState("");
  };

  const renderSaveOrUpdateButton = () => {
    if(mode === 'edit') {
      return (
        <div
          className="inline-block w-32 text-center border-2 px-6 py-2 bg-blue-900 text-white cursor-pointer text-2xl font-bold"
          onClick={updateClickHandler}
        >
          Update
        </div>
      )
    }
    if(mode === 'new') {
      return (
        <div
          className="inline-block w-32 text-center border-2 px-6 py-2 bg-blue-900 text-white cursor-pointer text-2xl font-bold"
          onClick={saveClickHandler}
        >
          Save
        </div>
      )
    }
  }

  return (
    <>
      {visibility ? (
        <Popup outClick={closeClickHandler}>
          <div className="w-full h-full p-5 border-blue-900 text-blue-900 relative box-border overflow-y-scroll flex flex-col">
            <h1 className="text-3xl font-bold border-b-2 pb-2">
              {mode === "new" ? "New Link" : "Edit"}
            </h1>
            <div className="mt-10 w-full h-auto flex-auto flex flex-col justify-between">
              <div className="mt-10 w-full grid grid-cols-1 gap-5">
                <div className="md:flex md:items-center mb-6">
                  <div className="w-1/3 md:w-1/6">
                    <div className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      Title
                    </div>
                  </div>
                  <div className="w-2/3 md:w-4/6">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-title"
                      type="text"
                      value={titleLocalState}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onChangeHandler({ e: e, id: "title" });
                      }}
                      placeholder="Title"
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="w-1/3 md:w-1/6">
                    <div className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      URL
                    </div>
                  </div>
                  <div className="w-2/3 md:w-4/6">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-url"
                      type="text"
                      value={urlLocalState}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onChangeHandler({ e: e, id: "url" });
                      }}
                      placeholder="https://www.url.com"
                    />
                  </div>
                </div>
              </div>
              <div className="h-12 text-center">
                <div
                  className="inline-block w-32 text-center border-2 px-6 py-2 bg-blue-900 text-white cursor-pointer text-2xl font-bold"
                  onClick={closeClickHandler}
                >
                  Cancel
                </div>
                {renderSaveOrUpdateButton()}
              </div>
            </div>
          </div>
        </Popup>
      ) : (
        ""
      )}
    </>
  );
};

export default EditQuickLink;
