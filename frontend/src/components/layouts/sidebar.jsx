
import React from 'react'
import MenuSidebar from '../elements/MenuSidebar'
import { useUser } from '../../context/UserProvider'
import { logOut } from '../../services/Api/auth'

const Sidebar = () => {
  const { user } = useUser()
  const handleLogout = async () => {
    await logOut()
  }
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
      <div className='flex flex-col w-64 min-h-full px-4 py-10 bg-primary text-secondary'>
        <div>
          <img src="/opt-logo.png" alt="" />
        </div>
        <div className='flex flex-col mt-10'>
          <h1 className='px-2.5 text-gray-400 mb-1 '>Main Menu</h1>
          <MenuSidebar url="/home" icon="home" name="Dashboard" />
          {user && user.role_id === 2 ? (<MenuSidebar url="/customers" icon="users" name="Customers" />) : (
            <>
              <MenuSidebar url="/packages" icon="template" name="Package" />
              <MenuSidebar url="/subscriptions" icon="coins" name="Subscriptions" />
              <MenuSidebar url="/employees" icon="user" name="Employee" />
            </>
          )}
          <h1 className='px-2.5 text-gray-400 mb-1 mt-4'>Others</h1>
          <MenuSidebar url="/settings" icon="settings" name="Settings" />
          <MenuSidebar onClick={handleLogout} icon="logout" name="Logout" />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
