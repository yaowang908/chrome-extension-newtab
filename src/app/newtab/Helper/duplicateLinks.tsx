import {LinkProps} from '../tabs/link/link.interfaces'

export const hasDuplicates = (arr: LinkProps[]) => {
  const uniqueUrls = new Set(arr.map((x) => x.link));
  if (uniqueUrls.size < arr.length) {
    return true;
  }
  return false;
};

export const removeDuplicates = (arr: LinkProps[]) => {
    console.log("Removed duplicates!");
    return arr.filter(
      (value, index, array) =>
        array.findIndex((t) => t.link === value.link) === index
    );
  };

const handleDuplicates = (arr: LinkProps[]) => {
  if(hasDuplicates(arr)) {
    return removeDuplicates(arr)
  } else {
    return arr;
  }
}

export default handleDuplicates