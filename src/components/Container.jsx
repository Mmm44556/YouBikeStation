import React from 'react'

export default function Container({children}) {
  return (
    <div className=' mx-[124px] max-lg:mx-16 max-sm:mx-8 '>
      {
        children
      }
    </div>
  )
}
