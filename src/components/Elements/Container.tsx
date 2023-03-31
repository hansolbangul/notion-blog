import React from 'react'

type Props = {
  children: React.ReactNode;
}

export default function Container({children, ...props}: Props) {
  return (
    <div {...props} className='w-full relative'>{children}</div>
  )
}

Container.Flex = ({children, ...props}: Props) => {
  return (
    <div {...props} className='w-full flex relative'>{children}</div>
  )
}

Container.Col = ({children, ...props}: Props) => {
  return (
    <div {...props} className='w-full flex flex-col relative'>{children}</div>
  )
}