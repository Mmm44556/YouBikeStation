"use client"
import { useState, useEffect } from 'react'
import Image from "next/image";
import Triangle from '@/assets/triangle.svg'
import Search from '@/assets/search.svg'
import { regionObjects } from '@/utils/regions';
import useRegion from '@/store/useRegion';
import useContent from '@/store/useInput';
export default function RegionSelector({ }) {
  //開啟縣市列表
  const [selectedRegion, setSelectedRegion] = useState(() => regionObjects);
  const [currCity, setCurrCity] = useState('選擇縣市')
  const [regionsOn, setRegionsOn] = useState(false)
  const [selectAllRegion, setSelectAllRegion] = useState(true)
  const [CurrText, setCurrText] =useState('')
  const {  addRegions, removeRegions } = useRegion();
  const {textChanger} = useContent();

  // 更新全局狀態
  const changeStore = (regionName, target) => {
    if (target.checked) {
      addRegions(regionName)
    } else {
      removeRegions(regionName)
    }
  }

  //切換勾選
  const handleRegionToggle = (regionName, { target }) => {
    changeStore(regionName, target)
    setSelectedRegion((prevRegions) => {
      return prevRegions.map((region) => {
        if (region.name === regionName) {
          return { ...region, checked: !region.checked }
        }
        return region;
      });
    });
  };
  const toggleAllRegion = ({ target }) => {
    setSelectAllRegion(target.checked)
    setSelectedRegion(v => {
      return v.map(e => {
        changeStore(e.name, target)
        return { ...e, checked: target.checked }
      })
    })
  }
  return (
    <div className=' grid grid-rows-[max-content] gap-[15px] max-sm:gap-[1rem] max-lg:justify-center max-lg:flex max-lg:flex-col max-sm:items-baseline mt-10 max-sm:mt-4 basis-1/2 max-lg:basis-full'>
      <h1 className='max-lg:text-center max-sm:text-start max-sm:basis-[10%]'>
        <span className='w-[109px] h-[24px] font-[700] text-[24px] leading-[24px] text-[#B5CC22] max-lg:text-4xl max-sm:text-[24px] tracking-[0.3rem]'>
          站點資訊
        </span>
      </h1>

      <div className='flex gap-4  max-lg:flex-col-reverse  max-sm:basis-[20%] max-sm:gap-2 max-lg:items-center '>

        <div data-selected={currCity}
          onClick={() => setRegionsOn(v => !v)}
          className='options w-[175px] h-[40px] rounded-[8px] px-4 py-2 bg-[#F6F6F6] border-0 outline-none  cursor-pointer max-lg:w-[311px] max-lg:h-[40px] relative'>
          <Image alt="" className="absolute right-[1rem] top-[0.75rem]" src={Triangle} width={18} height={18} />
          <ul
            onClick={({ target }) => {
              if (target.id === '') return
              setCurrCity(target.id)
            }}
            className={`w-[175px] rounded-lg max-lg:w-[311px] bg-[#F6F6F6] absolute  -bottom-[13.5rem] left-0 z-20  grid gap-4 ${regionsOn ? 'grid ' : ' hidden'}`} >
            <li className='h-[20px] font-[400]  text-[18px]  leading-[20px] m-1 hover:bg-[#efeeee]' id={'臺北市'}>臺北市</li>
            <li className='h-[20px] font-[400]  text-[18px]  leading-[20px] m-1 hover:bg-[#efeeee]' id={'新北市'}>新北市</li>
            <li className='h-[20px] font-[400]  text-[18px]  leading-[20px] m-1 hover:bg-[#efeeee]' id={'新竹縣'}>新竹縣</li>
            <li className='h-[20px] font-[400]  text-[18px]  leading-[20px] m-1 hover:bg-[#efeeee]' id={'桃園市'}>桃園市</li>
            <li className='h-[20px] font-[400]  text-[18px]  leading-[20px] m-1 hover:bg-[#efeeee]' id={'新竹科學園區'}>新竹科學園區</li>
          </ul>

        </div>


        <label htmlFor="search" className='relative w-fit'>
          <Image alt="" className="absolute right-[1rem] top-[0.75rem] bg-[#F6F6F6] cursor-pointer " src={Search} width={18} height={18} />
          <input
            value={CurrText} 
            onChange={(e)=>{

              setCurrText(e.target.value)
              textChanger(e.target.value)
            }}
          list="region" id="search" placeholder='搜尋站點' className='w-[277px] h-[40px] rounded-[8px] px-4 py-2 bg-[#F6F6F6] border-0 outline-none max-lg:w-[311px] max-lg:h-[40px] appearance-none' />
        </label>

      </div>

      {
        currCity === '臺北市' ? <div className='w-fit '>
          <label htmlFor="all" className='flex cursor-pointer text-nowrap  items-center gap-2  text-[16px] font-[400] leading-6'>
            <input
              checked={selectAllRegion}
              onChange={toggleAllRegion}
              type="checkbox" name="all" id="all" className='w-[64px] h-[24px]' />
            全部勾選
          </label>
        </div> : null
      }


      <div
        className='w-full grid grid-cols-4  max-lg:grid-cols-3 gap-6'>
        {
          currCity === '臺北市' ? <>
            {
              selectedRegion.map((e, idx) =>
              (<div className='w-fit ' key={e.idx}>
                <label
                  onChange={(event) => handleRegionToggle(e.name, event)}
                  htmlFor={e.name} className='flex text-nowrap cursor-pointer items-center gap-2'>
                  <input
                    className='cursor-pointer'
                    type="checkbox" name={e.idx} id={e.name} checked={e.checked} />
                  {e.name}
                </label>
              </div>)

              )
            }
          </> : null
        }



      </div>

    </div>
  )
}
