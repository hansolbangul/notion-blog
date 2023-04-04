'use client'
import Modal from '@/components/Modal/Modal';
import React, { useState } from 'react'
import { MdSearch } from "react-icons/md";
import SearchForm from './SearchForm';

export default function Search() {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <MdSearch className='text-2xl cursor-pointer' onClick={() => setIsModal(true)}/>
      {isModal && <Modal outClick={() => setIsModal(false)}>
          <SearchForm />
        </Modal>}
    </>
  )
}
