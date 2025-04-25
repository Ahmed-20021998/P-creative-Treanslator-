import Image from 'next/image'
import React from 'react'
import logo from '@/public/Images/logo.png'

export default function Nav() {
  return (
    <div className='flex justify-center items-center h-[50px] bg-gray-100'>
        <Image src={logo} width={50} height={50} alt='logo' priority />
        <h1 className='text-black text-2xl mt-[10px]'>P-Creative Traslator</h1>
    </div>
  )
}
