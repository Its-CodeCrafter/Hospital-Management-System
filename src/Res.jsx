import React from 'react'

export default function Res() {
  return (
    <ul className=' grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 space-y-2'>
    {[1,2,3,4].map(item=>{
        return <li className='w-[300px] h-[300px] bg-gray-200'>
{item}
        </li>
    })}
    </ul>
  )
}
