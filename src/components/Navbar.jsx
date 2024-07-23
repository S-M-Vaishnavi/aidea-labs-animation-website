import React from 'react'
import {aideaLogo} from '../utils'
import { navLists } from '../constants'

const Navbar = () => {
  return (
    <header className='w-full py-5 sm:px-10 px-5 flex justify-between items-center'>
        <nav className='flex w-full screen-max-width'>
            <img src={aideaLogo} alt="Apple" width={300} height={18} />
        </nav>

        <div className='flex justify-between items-center space-x-4 max-sm:hidden'>
            {navLists.map((navHeader,index)=>(
                <div key={index} className='whitespace-nowrap text-sm cursor-pointer'>
                    {navHeader}
                </div>
            ))}
        </div>
      
    </header>
  )
}

export default Navbar
