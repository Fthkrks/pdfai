import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-end '>
      <UserButton/>
    </div>
  )
}

export default Header