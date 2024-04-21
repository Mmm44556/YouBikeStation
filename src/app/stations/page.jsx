import RegionSelector from "@/components/RegionSelector";
import Image from "next/image";
import Frame from '@/assets/Frame.png'
import { youBikeStations } from "@/utils/data";
import dynamic from "next/dynamic";
const Tables = dynamic(()=>import('@/components/Tables'),{ssr:false})
export default async function Stations({ searchParams }) {
  //初始化資料
  const data = await youBikeStations()
  
  return (
    <>


      {
        searchParams ? null : <div className="  grid grid-rows-[max-content] gap-20  max-lg:gap-16 max-sm:gap-10">

          <div className="flex flex-row max-md:justify-center max-md:items-baseline max-xl:gap-8  ">

            <RegionSelector />

            <div className=" max-lg:hidden relative  basis-1/2 flex justify-center items-end max-xl:items-center">
              <Image alt="" src={Frame} priority width={501.98} height={171.5} />
            </div>
          </div>


         <Tables data={data} />

        </div>
      }

    </>
  )
}
