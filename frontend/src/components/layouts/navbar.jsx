import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getUser, logOut } from '../../services/Api/auth'
import { Icon } from '@iconify/react'
import { useUser } from '../../context/UserProvider'

const Navbar = () => {
  const { pathname } = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const { user, setUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) window.location.href = '/login'
    fetchUser()
  }, [])
  const fetchUser = async () => {
    setIsLoading(true)
    const res = await getUser()
    setUser(res)
    setIsLoading(false)
  }
  const getFirstLetter = (name) => {
    return name ? name.charAt(0) : '';
  }
  const handleLogout = async () => {
    await logOut()
  }
  return (
    <div className='flex items-center justify-end p-2 max-lg:justify-between'>
      <label htmlFor="my-drawer-2" className="p-1 cursor-pointer drawer-button lg:hidden hover:bg-gray-200 rounded-xl">
        <Icon icon="bx:menu-alt-left" className="w-10 h-10 text-secondary" />
      </label>
      <div className=" w-15 h-15 dropdown dropdown-end">
        <div tabIndex={0} role="button" className="w-full h-full btn btn-ghost btn-circle avatar">
          <div className="avatar placeholder">
            <div className="rounded-full bg-secondary text-primary w-14">
              <span className="text-3xl">
                {getFirstLetter(user?.name)}
              </span>
            </div>
          </div>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary text-secondary rounded-box w-52">
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li><a >Settings</a></li>
          <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
