import React from 'react';

const NavBar = React.lazy(() => import('../components/NavBar'));
const DashboardOverviewCard = React.lazy(() => import("../components/DashboardOverviewCard"))

import { BiTask } from "react-icons/bi";
import { GoIssueOpened } from "react-icons/go";
import { MdOutlineAccessTime } from "react-icons/md";

import { useLoginCheck } from '../hooks/UserAuthHook';
// import Loading from '../components/Loading';

export default function DashboardPage() {

  const { userData, isDataLoading } = useLoginCheck();

  // console.log(userData.username, isDataLoading);

  console.log(isDataLoading);

  let desktopMainContainerStyle = " lg:grid lg:grid-cols-[1fr_75px] lg:overflow-hidden dir-rtl lg:outline-gray-borders lg:outline-2 lg:outline lg:rounded-xl lg:pt-0"
  let desktopNavBarContainerStyle = "lg:w-[75px] lg:h-[calc(100vh-1rem)] lg:rounded-none lg:rounded-tl-xl lg:rounded-bl-xl dir-ltr lg:left-0"
  let desktopContentContainerStyle = "lg:h-[calc(100vh-1rem)] lg:overflow-y-auto lg:p-7 lg:rounded-none lg:rounded-tr-xl lg:rounded-br-xl dir-ltr lg:border-l-2 lg:border-l-gray-borders lg:mt-0"
  return (
    <div className={`relative sm:overflow-x-hidden m-2 pt-[80px] ${desktopMainContainerStyle}`}>
      {/* left nav bar */}
      <div className={`bg-gray-primary w-full h-[70px] box-border top-0 rounded-lg absolute ${desktopNavBarContainerStyle}`}>
        <NavBar />
      </div>
      {/* content container */}
      <div className={`bg-black-primary w-full overflow-x-hidden box-border rounded-lg h-max text-white p-3 ${desktopContentContainerStyle}`}>
        {/* Welcome Title */}
        <div>
          <h2 className='text-2xl'>Hey there, {isDataLoading ? "..." : userData?.username}!</h2>
          <p className='text-base text-gray-400'>Welcome back, we&apos;re happy to have you here!</p>
        </div>
        {/* Dashboard overview */}
        <div className='mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6'>
          <DashboardOverviewCard icon={<BiTask size={30} color='white' />} overviewData={420} overviewTitle={"Total Tasks"} />
          <DashboardOverviewCard icon={<GoIssueOpened size={30} color='white' />} overviewData={302} overviewTitle={"Total Issues"} />
          <DashboardOverviewCard icon={<MdOutlineAccessTime size={30} color='white' />} overviewData={"1D 12H"} overviewTitle={"Total Time Spent"} />
        </div>
      </div>
    </div>
  )
}