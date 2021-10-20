import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { notificationVisibility, notificationMessageAtom } from '../Recoil/notification.atom';

const Notification = () => {
  const [visibility, setVisibility] = useRecoilState(notificationVisibility);
  const message = useRecoilValue(notificationMessageAtom);

  const animationEndHandler = () => {
    setVisibility(false);
    console.log('fade out ends')
  }

  return (
    <>
      {visibility ? (
        <div className="absolute bg-gray-100 h-auto w-2/5 max-h-96 max-w-64 left-2/4 top-1/4 transform -translate-x-1/2 -translate-y-1/2 overflow-y-scroll z-50 animate-fade opacity-0" onAnimationEnd={animationEndHandler}>
          <div className="py-4 px-6 h-auto text-lg">{message}</div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Notification
