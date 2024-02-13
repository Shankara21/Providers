import React, { useEffect, useState } from 'react'
import { createPackage, deletePackage, getPackages, updatePackage } from '../services/Api/package'
import DataTable from 'react-data-table-component'
import { Icon } from '@iconify/react'
import { useAlert } from '../context/AlertProvider'
import { formatToCurrency } from '../utils/FormatingCurrency'

const Package = () => {
  const [datas, setDatas] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [selectedData, setSelectedData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { showAlert } = useAlert()
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    const res = await getPackages()
    res.forEach((data, index) => {
      data.index = index + 1
    })
    setDatas(res)
    setFilteredData(res)
    setIsLoading(false)
  }
  const searchData = (e) => {
    const keyword = e.target.value
    if (keyword !== '') {
      const results = datas.filter((data) => {
        return data.name.toLowerCase().startsWith(keyword.toLowerCase())
      })
      setFilteredData(results)
    } else {
      setFilteredData(datas)
    }
  }
  const getDetail = (id) => {
    const res = datas.find((data) => data.id === id)
    setSelectedData(res)
    setForm({
      name: res.name,
      price: res.price
    })
  }
  const columns = [
    {
      name: 'No',
      selector: row => row.index,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Price',
      selector: row => formatToCurrency(row.price),
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => <div className='flex items-center justify-center gap-1 m-2'>
        <button onClick={() => {
          document.getElementById('my_modal_edit').showModal()
          getDetail(row.id)
        }} className='p-2 text-yellow-400 transition-colors duration-300 ease-in-out rounded-full cursor-pointer hover:text-white hover:bg-yellow-500'>
          <Icon icon="tabler:edit" className=" w-7 h-7" />
        </button>
        <button onClick={() => {
          document.getElementById('my_modal_info').showModal()
          getDetail(row.id)
        }} className='p-2 text-blue-400 transition-colors duration-300 ease-in-out rounded-full cursor-pointer hover:text-white hover:bg-blue-500'>
          <Icon icon="tabler:info-circle" className="w-7 h-7" />
        </button>
        <button onClick={() => {
          document.getElementById('my_modal_delete').showModal()
          getDetail(row.id)
        }} className='p-2 text-red-400 transition-colors duration-300 ease-in-out rounded-full cursor-pointer hover:text-white hover:bg-red-500'>
          <Icon icon="tabler:trash" className="w-7 h-7" />
        </button>
      </div>,
    },
  ];
  const resetForm = () => {
    setForm({
      name: '',
      price: ''
    })
  }

  const [form, setForm] = useState({
    name: '',
    price: ''
  })
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleDelete = async (id) => {
    setIsLoading(true)
    await deletePackage(id)
    fetchData()
    setIsLoading(false)
    showAlert('success', 'Package has been deleted')
  }

  const handleCreate = async () => {
    setIsLoading(true)
    const res = await createPackage(form)
    console.log(res);
    fetchData()
    setIsLoading(false)
    showAlert('success', 'Package has been created')
  }

  const handleEdit = async (id) => {
    setIsLoading(true)
    const res = await updatePackage(id, form)
    fetchData()
    setIsLoading(false)
    showAlert('success', 'Package updated successfully')
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold text-secondary">
        List of Packages
      </h1>
      <div className="flex justify-end gap-3 mb-3">
        <input type="text" placeholder="Type here" className="w-full max-w-xs input input-bordered" onChange={
          (e) => searchData(e)
        } />
        <button onClick={() => {
          document.getElementById('my_modal_create').showModal()
        }} className="btn">Create</button>
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        progressPending={isLoading}
      />
      <dialog id="my_modal_create" className="modal">
        <div className="modal-box">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold">Create new data</h3>
            <button className="" onClick={() => {
              document.getElementById('my_modal_create').close()
              resetForm()
            }}>
              <Icon icon="tabler:x" className="text-red-500 duration-300 ease-in-out w-7 h-7 hover:scale-125" />
            </button>
          </div>
          <div className="my-1 divider"></div>
          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">Package Name</span>
            </div>
            <input type="text" placeholder="Type here" className="w-full input input-bordered" name='name'
              onChange={handleChange}
              value={form.name}
            />
          </label>
          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">Price</span>
            </div>
            <input type="number" min={0} placeholder="Type here" className="w-full input input-bordered"
              name='price'
              onChange={handleChange}
              value={form.price}
            />
          </label>
          <div className="my-1 divider"></div>
          <div className="flex justify-end">
            <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-200" onClick={() => {
              document.getElementById('my_modal_create').close()
              resetForm()
            }}>Close</button>
            <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-green-500 rounded-lg border border-gray-200 hover:bg-green-600  focus:z-10 focus:ring-4 focus:ring-gray-200" onClick={() => {
              document.getElementById('my_modal_create').close()
              handleCreate()
              resetForm()
            }}>Submit</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="my_modal_edit" className="modal">
        <div className="modal-box">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold">Edit data {selectedData?.name}</h3>
            <button className="" onClick={() => {
              document.getElementById('my_modal_edit').close()
              resetForm()
            }}>
              <Icon icon="tabler:x" className="text-red-500 duration-300 ease-in-out w-7 h-7 hover:scale-125" />
            </button>
          </div>
          <div className="my-1 divider"></div>
          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">Package Name</span>
            </div>
            <input type="text" placeholder="Type here" className="w-full input input-bordered" name='name'
              onChange={handleChange}
              value={form.name}
            />
          </label>
          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">Price</span>
            </div>
            <input type="number" min={0} placeholder="Type here" className="w-full input input-bordered"
              name='price'
              onChange={handleChange}
              value={form.price}
            />
          </label>
          <div className="my-1 divider"></div>
          <div className="flex justify-end">
            <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-200" onClick={() => {
              document.getElementById('my_modal_edit').close()
              resetForm()
            }}>Close</button>
            <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-yellow-500 rounded-lg border border-gray-200 hover:bg-yellow-600  focus:z-10 focus:ring-4 focus:ring-gray-200" onClick={() => {
              document.getElementById('my_modal_edit').close()
              handleEdit(selectedData.id)
              resetForm()
            }}>Submit</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="my_modal_info" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Info!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="my_modal_delete" className="modal">
        <div className="modal-box">
          <div className="flex items-center justify-between mb-3">
            <Icon icon="tabler:trash" className="w-12 h-12 p-1.5 text-red-500 rounded-full bg-red-50 " />
            <button className="" onClick={() => {
              document.getElementById('my_modal_delete').close()
            }}>
              <Icon icon="tabler:x" className="text-red-500 duration-300 ease-in-out w-7 h-7 hover:scale-125" />
            </button>
          </div>
          <h3 className="text-xl font-semibold">Are you sure to delete it?</h3>
          <p className='mt-1 text-gray-400'>
            By deleting this package,you will lose all the data and it can't be recovered.
          </p>
          <div className="my-1 divider"></div>
          <div className="flex justify-end">
            <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-200" onClick={() => {
              document.getElementById('my_modal_delete').close()
            }}>Close</button>
            <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-red-500 rounded-lg border border-gray-200 hover:bg-red-600  focus:z-10 focus:ring-4 focus:ring-gray-200" onClick={() => {
              document.getElementById('my_modal_delete').close()
              handleDelete(selectedData.id)
            }}>Close</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}

export default Package
