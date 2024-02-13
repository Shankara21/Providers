import Sidebar from './sidebar'
import Navbar from './navbar'
import { useLocation } from 'react-router-dom'

const MainLayout = ({ children }) => {
  const { pathname } = useLocation()
  return (
    <div className="max-h-screen overflow-hidden drawer lg:drawer-open bg-primary">
      {pathname.includes('reports') ? (
        <>
          {children}
        </>
      ) : (
        <>
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="flex flex-col h-screen px-8 py-3 drawer-content lg:rounded-tl-[50px] lg:rounded-bl-[50px]  bg-white">
            <Navbar />

            <div className="flex-1 mt-5 overflow-auto">
              {children}
            </div>
          </div>
          <Sidebar />
        </>
      )}
    </div>
  )
}

export default MainLayout
