import React from 'react'
import SideBar from './SideBar'
import TopBar from './TopBar'
import { Outlet } from 'react-router'


const Home = () => {

  return (
    <div className="w-screen h-screen bg-slate-100 p-4 md:p-8">
      <div className="w-full h-full flex gap-4 md:gap-8">
        <div className="w-full h-full w-fit max-w-[300px] bg-white rounded-lg">
          <SideBar />
        </div>
        <div className="flex-1 h-full rounded-lg flex flex-col gap-6">
          <TopBar />
          <div className="flex-1 overflow-y-auto bg-white rounded-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home