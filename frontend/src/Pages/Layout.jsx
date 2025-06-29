import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='bg-gray-100 p-5 h-screen'>
        <Outlet/>
    </div>
  )
}

export default Layout