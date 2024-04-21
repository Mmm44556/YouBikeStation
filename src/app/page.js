"use client"
import { useState } from 'react';
import Image from "next/image";
import NavLinks from '@/components/navLinks';
import BurgerMenu from '@/components/BurgerMenu';
import Logo from '@/assets/logo.png'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(v => !v);
  };
  return (
    <>
      <div className="flex justify-between items-center gap-10 relative h-[95px]">
        <div className="w-[95px] h-[95px] relative max-lg:w-[65px] max-lg:h-[65px]">
          <Image alt="logo" src={Logo} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority/>
        </div>

        <div className="lg:hidden max-lg:w-6 max-lg:h-6 flex items-center justify-center cursor-pointer"
          onClick={toggleMenu}>
          <BurgerMenu isOpen={isOpen}/>
        </div>

        <div className={`flex gap-8 items-center basis-10/12 justify-between max-lg:fixed max-lg:bg-[#B5CC22] bottom-0 
        max-lg:flex-col
        max-lg:h-[calc(100dvh-6rem)] max-lg:w-dvw max-lg:left-0 max-lg:items-start z-50  ${isOpen ? "max-lg:opacity-100 transition-all duration-300 ease-in-out" :"transition-all duration-300 ease-in-out max-lg:opacity-0 -bottom-full max-lg:z-0"}`}>

          <div className='lg:hidden basis-[50%] w-full '>
    
            <div className={`w-[82px] h-[248px]  flex flex-col gap-[32px] mt-8 ms-[32px]  max-lg:ms-16 max-sm:ms-8`}>
                <NavLinks />
            </div>

          </div>
          <div className="flex gap-10 max-lg:gap-6 max-lg:w-auto w-[520px] h-6 max-lg:hidden">
            <NavLinks />
          </div>
          
          <button
            className=" bg-[#B5CC22] w-[85px] h-[40px] rounded-[100px] px-6 py-[10px] flex items-center ms-[32px] max-lg:w-[81px] max-lg:h-[40px]  max-lg:ms-16 max-sm:ms-8  max-lg:mb-[71px] max-lg:bg-white"
          >
            <span className="text-white w-[37px] h-[20px] leading-5 text-[18px] max-lg:text-[16px] max-lg:w-[33px] max-lg:h-[20px]  max-lg:text-[#B5CC22]">
              登入
            </span>

          </button>
        </div>
      </div>

    </>
  );
}
