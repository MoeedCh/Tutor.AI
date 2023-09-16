import React from 'react'
import Image from 'next/image'

const NavBar = () => {

  return (
    <div className='flex justify-left items-center ml-10'>
      <Image src="/gray_logo.png" width={200} height={65}/>
    </div>
  )
}

export default NavBar