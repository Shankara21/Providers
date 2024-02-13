import { Icon } from '@iconify/react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const MenuSidebar = ({ url, icon, name, onClick }) => {
  const { pathname } = useLocation()
  return (
    <Link onClick={onClick} to={url} className={`flex items-end gap-2 p-2 mb-3 transition-colors duration-300 ease-in-out cursor-pointer  rounded-xl active:bg-secondary active:text-white ${pathname.includes(url) ? 'bg-secondary text-white' : 'hover:bg-gray-200'
      }`}>
      <Icon icon={`tabler:${icon}`} className="w-8 h-8" />
      <p className='text-base font-medium'>{name}</p>
    </Link>
  )
}

export default MenuSidebar
