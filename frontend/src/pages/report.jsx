import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAlert } from '../context/AlertProvider';
import { getReports } from '../services/Api/reports';
import { formatDate } from '../utils/FormatingDate'
import { formatToCurrency } from '../utils/FormatingCurrency';
const Report = () => {
  const { id } = useParams();
  const [datas, setDatas] = useState([])
  const [packages, setPackages] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [selectedData, setSelectedData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { showAlert } = useAlert()
  const [srcIdCard, setSrcIdCard] = useState('')
  const [srcHouseImage, setSrcHouseImage] = useState('')
  const [isPrint, setIsPrint] = useState(false)
  useEffect(() => {
    if (!isPrint)
      setTimeout(() => {
        window.print()
        setIsPrint(true)
      }, 1000)
    fetchData()
  }, [])
  const fetchData = async () => {
    const res = await getReports(id)
    res.data_sales.forEach((data) => {
      data.index = res.data_sales.indexOf(data) + 1
    })
    setDatas(res)
    setFilteredData(res)
    setIsLoading(false)
  }
  return (
    <div className='flex items-center justify-center w-screen h-screen overflow-auto bg-white'>
      <div className="w-full h-full max-w-5xl py-5">
        <div className="flex justify-center mb-10">
          <img src="/opt-logo.png" alt="" className='max-h-32' />
        </div>
        <h1 className="mb-3 text-2xl font-semibold">Data Sales</h1>
        <div className="flow-root mb-10">
          <dl className="mb-5 text-sm divide-y divide-gray-100">
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">NIP</dt>
              <dd className="text-gray-700 sm:col-span-2">{datas.user?.nip}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Name</dt>
              <dd className="text-gray-700 sm:col-span-2">{datas.user?.name}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Email</dt>
              <dd className="text-gray-700 sm:col-span-2">{datas.user?.email}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Total Customer</dt>
              <dd className="text-gray-700 sm:col-span-2">{datas.data_sales?.length}</dd>
            </div>

          </dl>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Package
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {datas.data_sales?.map((data) => (
                <tr className="bg-white " key={data.id}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {data.index}
                  </th>
                  <td className="px-6 py-4">{data.customer.name}</td>
                  <td className="px-6 py-4">{data.package.name}</td>
                  <td className="px-6 py-4">{formatDate(data.created_at)}</td>
                  <td className="px-6 py-4">{formatToCurrency(data.package.price)}</td>
                </tr>
              ))}
              <tr className="bg-white border-t" >
                <th
                  scope="row"
                  colSpan={4}
                  className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                >
                  Total
                </th>
                <td className="px-6 py-4">{formatToCurrency(datas?.revenue)}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div >
  )
}

export default Report
