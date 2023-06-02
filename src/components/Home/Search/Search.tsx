'use client'

import React, { useState } from 'react'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default function Search({value, onChange}: Props) {

  return (
    <div className='mb-4 w-full'>
      <input 
        type="text" className='border-none bg-gray-200 rounded-2xl w-full py-2 px-3 flex-auto' 
        placeholder='Search Keyword' value={value} onChange={onChange} 
      />
    </div>
  )
}
