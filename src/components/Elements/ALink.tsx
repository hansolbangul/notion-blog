'use client'

import useQuery from '@/hook/useQuery';
import React from 'react'

type Props = {
  children: React.ReactNode;
  href: string;
  cache?: boolean;
  className?: string;
}

export default function ALink({children, href, cache = true, className}: Props) {
  const {push} = useQuery();

  return (
    <a className={className} onClick={() => push(href, cache)}>
      {children}
    </a>
  )
}
