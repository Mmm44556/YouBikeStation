"use client"
import { useState, useEffect, Suspense } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";

import useRegion from '@/store/useRegion';
import useContent from '@/store/useInput';



export default function Tables({ data }) {
  const [stations, setStations] = useState([]);
  const [sortBool, setSortBool] = useState(true);
  const { regions } = useRegion()
  const { text } = useContent()



  useEffect(() => {
    //勾選過濾
    const result = data.filter(dataArr => {
      return regions.has(dataArr.sarea)
    })
    //勾選後打字過濾
    const filteredItems = result.filter(
      item => item.sna.toLowerCase().includes(text.toLowerCase()) || item.sarea.toLowerCase().includes(text.toLowerCase())
    );
    setStations(filteredItems)

  }, [regions.size, text])

  //排大到小
  function sortedBiggerASC(id) {
    if (!['tot', 'sbi'].includes(id)) return stations;

    return stations.toSorted((a, b) => {
      return b[id] - a[id]
    });
  }
  //排小到大
  function sortedSmallASC(id) {
    if (!['tot', 'sbi'].includes(id)) return stations;

    return stations.toSorted((a, b) => {
      return a[id] - b[id]
    });
  }
  //重新排序分類
  const resortedTable = ({ target }) => {
    setSortBool(v => {
      if (v) {
        const res = sortedBiggerASC(target.id)

        setStations(res)
      } else {
        const res = sortedSmallASC(target.id)
        console.log(res)
        setStations(res)

      }

      return !v
    })

  }
  const Row = ({ index, style }) => {
    let e = stations[index]


    return (
      <tr key={index} style={style} className="odd:bg-white odd:dark:bg-[#F6F6F6]   border-b  items-center justify-center ">
        <th scope="row" className=" h-[24px]  w-[20%] max-sm:w-[80px]   font-[400] text-[16px] leading-[24px] text-center">
          台北市
        </th>
        <td className="  py-6   h-[24px]  w-[20%] max-sm:w-[93px] min-2xl:border font-[400] text-[16px] leading-[24px] text-center">
          {e.sarea}
        </td>
        <td className=" py-6  h-[24px]   w-[336px] max-sm:w-[112px] min-2xl:border max-md:h-[48px] font-[400] text-[16px] leading-[24px] text-center">
          {e.sna}
        </td>
        <td className="  py-6  h-[24px] w-[20%] max-sm:w-[130px] min-2xl:border font-[400] text-[16px] leading-[24px] text-center">
          {e.sbi}
        </td>
        <td className=" py-6   h-[24px]  w-[20%] max-sm:w-[130px] min-2xl:border font-[400] text-[16px] leading-[24px] text-center">
          {e.tot}
        </td>
      </tr>)


  }




  const Example = () => (

    <AutoSizer>
      {({ height, width }) => (
        <List
          className="List"
          height={height}
          itemCount={stations.length}
          itemSize={100}
          width={width}

        >
          {Row}
        </List>
      )}
    </AutoSizer>

  );
  return (
    <div className="mb-10 h-dvh relative  overflow-x-auto rounded-[28px] border-[0.5px] border-[#AEAEAE]">
      <table className="w-full  h-full ">
        <thead className=" text-white uppercase bg-[#B5CC22]  text-nowrap h-[66px] ">
          <tr className=''>
            <th scope="col" className=" h-6 w-[20%] text-[16px] font-[500] leading-[24px] text-center py-6 px-6">
              縣市
            </th>
            <th scope="col" className=" h-6 w-[20%] text-[16px] font-[500] leading-[24px] text-center   py-6 px-6">

              區域

            </th>
            <th scope="col" className=" h-6  w-[336px] max-sm:w-[132px] max-md:h-[48px] text-[16px] font-[500] leading-[24px] text-center  py-6 px-6">

              站點名稱

            </th>
            <th scope="col" className=" h-6 w-[20%] text-[16px] font-[500] leading-[24px] text-center ">
              <dive className="flex items-center justify-center  py-6 px-6">
                可借車輛
                <span
                  className='cursor-pointer'
                ><svg
                  onClick={resortedTable}
                  id="sbi"
                  className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg></span>
              </dive>
            </th>
            <th scope="col" className=" h-6 w-[20%] text-[16px] font-[500] leading-[24px]">
              <div className="flex items-center justify-center px-6 py-6">
                可還空位
                <span
                  className='cursor-pointer'
                >
                  <svg
                    onClick={resortedTable}
                    id="tot"
                    className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg></span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className='w-full  h-full '>
          <Example />
        </tbody>






      </table>
    </div>

  )
  function DataList({ index, style }) {

    return stations.map(e => {
      return (
        <>
          <tr className="odd:bg-white odd:dark:bg-[#F6F6F6]   border-b">
            <th scope="row" className="w-[48px] h-[24px] font-[400] text-[16px] leading-[24px] text-center">
              台北市
            </th>
            <td className="    px-6 py-6 w-[48px] h-[24px] font-[400] text-[16px] leading-[24px] text-center">
              {e.sarea}
            </td>
            <td className="   px-6 py-6 w-[48px] h-[24px] font-[400] text-[16px] leading-[24px] text-center">
              {e.sna}
            </td>
            <td className="   px-6 py-6 w-[48px] h-[24px] font-[400] text-[16px] leading-[24px] text-center">
              {e.sbi}
            </td>
            <td className="   px-6 py-6 w-[48px] h-[24px] font-[400] text-[16px] leading-[24px] text-center">
              {e.tot}
            </td>
          </tr>
        </>
      )
    })

  }
}

