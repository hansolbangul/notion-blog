import useQuery from '@/hook/useQuery';
import React from 'react'

type Props = {
  children: React.ReactNode;
  href: string;
  cache?: boolean
}

export default function ALink({children, href, cache = true}: Props) {
  const {push} = useQuery();

  return (
    <a onClick={() => push(href, cache)}>
      {children}
    </a>
  )
}
