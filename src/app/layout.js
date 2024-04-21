
import "./globals.css";
import Stations from "./stations/page";
import Nav from "./page";
import Container from "@/components/Container";

import { Noto_Sans_400 } from "@/utils/font";
export const metadata = {
  title: "YouBike即時站點資訊",
  description: "Welcome to YouBike, 推廣民眾騎乘自行車作為短程接駁交通工具，用慢速的方式體驗城市不同時空的迷人風情，不僅提供市民便利的接駁工具，同時還兼具了休閒運動與娛樂的特點，讓市民及遊客體驗騎乘自行車是一種生活與旅遊的最佳方式。",
};

export default function RootLayout({ children }) {

  return (

    <html html lang="en" >
      <head>
        <meta httpEquiv="Cache-control" content="no-cache" />
        <meta httpEquiv="Cache" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>

      <body className={`${Noto_Sans_400.className} h-dvh w-dvh`}>
        <Container>
          <Nav />
        </Container>
        <hr className="w-full border-[#EBEBEB]" />
        <Container>
          {children}
          <Stations />
        </Container>
      </body>
 
    </html >
  );
}
