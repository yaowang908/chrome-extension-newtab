import React from 'react';

const Section:React.FC = props => {

  return (
    <div className="w-full my-t border-r-2 border-blue-800 px-2">
      {props.children}
    </div>
  )
}

export default Section;