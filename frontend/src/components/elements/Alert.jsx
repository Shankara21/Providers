
import { Icon } from '@iconify/react'
import React from 'react'

const Alert = ({ type, message, onClick }) => {
  return (
    <div onClick={onClick} className="bg-white rounded-full shadow z-[999999999]" role="alert">
      <div className="flex p-4">
        <div className={`flex items-center justify-center w-14 text-white ${type === 'success' ? 'bg-green-500' : type === 'danger' ? 'bg-red-500' : 'bg-blue-500'} rounded-full`}>
          <Icon icon={type === 'success' ? 'tabler:circle-check' : type === 'danger' ? 'tabler:circle-x' : 'tabler:info-circle'} className="w-8 h-8" />
        </div>
        <div className="pl-2 text-gray-600">
          <p className="font-bold">{type}</p>
          <p>
            {message}
          </p>
        </div>
      </div>
    </div>

  )
}

export default Alert
