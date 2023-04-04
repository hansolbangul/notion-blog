'use client'
import { useEffect, useState } from 'react';
import ReactDom from 'react-dom'

type BackdropProps = {
  onClick: () => void
}

const Backdrop = ({onClick}: BackdropProps) => {
  return <div onClick={onClick} className="w-screen h-screen backdrop-opacity-10 absolute z-20" />;
};

type props = {
  children: React.ReactNode;
  outClick: () => void;
}

export default function Modal({children, outClick}: props) {
  const [isCSR, setIsCSR] = useState<boolean>(false);

  useEffect(() => {
    setIsCSR(true);
  }, [])
  
  if (typeof window === 'undefined') return <></>;
  if (!isCSR) return <></>;
  return (
    <>
    {ReactDom.createPortal(
      <>
        <Backdrop onClick={outClick} />
        <div className='z-30 absolute'>
          {children}
        </div>      
      </>
      , document.getElementById('modal-root')!
    )}
    </>
  )
}