import React from 'react'

const Section:React.FC = props => {
  return (
    <div className="w-full py-5 px-10 text-lg max-w-3xl text-left mx-auto">
      {props.children}
    </div>
  )
}

export default Section
