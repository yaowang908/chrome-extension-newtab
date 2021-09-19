import React from 'react'
import { useSetRecoilState } from 'recoil'

import {
  errorModuleVisibility,
  errorMessageAtom,
} from "../Recoil/errorModule.atom";
import { importModuleVisibility } from "../Recoil/importModule.atom";

interface UploaderProps {
  handleUpload: (obj:{}) => void;
}

const Uploader:React.FC<UploaderProps> = ({handleUpload}) => {
  const [textareaState, setTextareaState] = React.useState<string>('');
  const setErrorVisibility = useSetRecoilState(errorModuleVisibility);
  const setErrorMessage = useSetRecoilState(errorMessageAtom);
  const setImportModuleVisibilityState = useSetRecoilState(importModuleVisibility);

  const textAreaChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaState(e.target.value);
  };

  const uploadClickHandler = () => {
    try{
      const uploadedObj = JSON.parse("{" + textareaState + "}");
      console.log(uploadedObj);
      handleUpload(uploadedObj);
    } catch {
      setErrorVisibility(true);
      setErrorMessage("Invalid Input! Please copy paste the whole content from the file you exported from Dashboard before.");
      throw new Error("Invalid input!");
    }
  };

  const closeClickHandler = () => {
    setImportModuleVisibilityState(false);
  };

  return (
    <div className="w-full h-full top-0 bottom-0 left-0 right-0 absolute z-50 bg-gray-100">
      <div className="w-full h-full p-6">
        <textarea
          name="import"
          id="import"
          className="w-full max-w-full h-96 max-h-full border-2 border-blue-300"
          placeholder={"Paste file content here..."}
          value={textareaState}
          onChange={textAreaChangeHandler}
        ></textarea>
        <div className="h-12 text-center">
          <div
            className="inline-block w-32 text-center border-2 px-6 py-2 bg-blue-900 text-white cursor-pointer text-2xl font-bold"
            onClick={uploadClickHandler}
          >
            Upload
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
  );
}

export default Uploader;
