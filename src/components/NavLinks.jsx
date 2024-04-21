"use client"

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { revalidatePath } from "next/cache";
const links = [
  {
    title: "manual",
    desc: "使用說明"
  },
  {
    title: "payment",
    desc: "收費方式"
  },
  {
    title: "stations",
    desc: "站點資訊"
  },
  {
    title: "news",
    desc: "最新消息"
  },
  {
    title: "activity",
    desc: "活動專區"
  }
]

export default function NavLinks() {
  const pathName = usePathname();
  const str = pathName.split('/')[1]



  return (
    <>
      {
        links.map(e => (
          <Link className={`w-[72px] text-center text-[18px] leading-6 text-[#677510] font-[500] ${str === e.title && 'actives'}`}
            key={e.title}
            href={(() => {
              if (e.title === 'stations') {
                return `${e.title}?show=false`;
              }
              return e.title
            })()}>
            {e.desc}
          </Link>
        ))
      }
    </>
  )
}
