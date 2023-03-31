import { Tags } from '@/application/domain/tag'
import React from 'react'

type Props = {
  tags: Tags
}

export default function Tag({tags}: Props) {
  return (
    <>
      {/* <div className="flex flex-col sticky h-fit invisible lg:visible w-40 p-3 top-20"> */}
      <div className="flex flex-col absolute h-fit invisible md:visible w-40 p-3 top-20 -left-40">
        {Object.keys(tags).map((tag) => (
          <div className="p-1 hover:text-slate-500 hover:cursor-pointer flex items-center space-x-1" key={tag}>
            <span className="text-sm truncate">{tag}</span>
            <span className="text-xs flex-auto">({tags[tag]})</span>
          </div>
        ))}
      </div>
    </>
  )
}
