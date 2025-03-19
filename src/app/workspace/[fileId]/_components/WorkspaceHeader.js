import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function WorkSpaceHeader() {
  return (
    <div className='p-4 flex justify-between items-center bg-white shadow-md'>
        <Image src={"/logo.svg"} alt="" width ={40} height={50}/>
        <UserButton/>

    </div>
  )
}

export default WorkSpaceHeader