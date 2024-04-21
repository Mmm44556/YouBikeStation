import React from 'react'

export default function BurgerMenu({isOpen}) {
  return (
    <div className="w-[18px] h-[12px] flex flex-col justify-between">
      <div className={`w-full h-[2px]  bg-[#B5CC22] ${isOpen ? "transform rotate-45 origin-left translate-y-[2px]" : ""} transition-all duration-300 ease-in-out`} />
      <div className={`w-full h-[2px] bg-[#B5CC22] ${isOpen ? 'opacity-0' : ''
        } transition-all duration-300 ease-in-out`} />
      <div className={`w-full h-[2px]  bg-[#B5CC22]  ${isOpen ? "transform -rotate-45 origin-left translate-y-1" : ""} transition-all duration-300 ease-in-out`} />
    </div>
  )
}
