import React, { useEffect, useState } from 'react'
import { useAlert } from '../context/AlertProvider'
import { createCustomer, deleteCustomer, getCustomers, showCustomer, updateCustomer } from '../services/Api/customer'
import { getPackages } from '../services/Api/package'
import DataTable from 'react-data-table-component'
import { Icon } from '@iconify/react'
import { formatToCurrency } from '../utils/FormatingCurrency'
import { useUser } from '../context/UserProvider'

const Customer = () => {
  const url = import.meta.env.VITE_URL_IMAGE;
  const [datas, setDatas] = useState([])
  const [packages, setPackages] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [selectedData, setSelectedData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { showAlert } = useAlert()
  const [srcIdCard, setSrcIdCard] = useState('')
  const [srcHouseImage, setSrcHouseImage] = useState('')
  const { user } = useUser()
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    const res = await getCustomers()
    const resPackages = await getPackages()
    res.forEach((data) => {
      data.index = res.indexOf(data) + 1
    })
    setPackages(resPackages)
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
  const getDetail = async (id) => {
    setIsLoading(true)
    const res = await showCustomer(id)
    setForm({
      name: res.data.name,
      phone: res.data.phone,
      address: res.data.address,
      id_card: '',
      house_photo: ''
    })
    res.data.id_card = `${url}/${res.data.id_card}`
    res.data.house_photo = `${url}/${res.data.house_photo}`
    setSrcHouseImage(res.data.house_photo)
    setSrcIdCard(res.data.id_card)
    setSelectedData(res.data)
    console.log(res.data);
    setIsLoading(false)
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
      name: 'Phone',
      selector: row => row.phone,
      sortable: true,
    },
    {
      name: 'Address',
      selector: row => row.address,
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => <div className='flex items-center justify-center gap-1 m-2'>
        <button onClick={() => {
          document.getElementById('my_modal_edit').showModal()
          getDetail(row?.id)
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
          getDetail(row?.id)
        }} className='p-2 text-red-400 transition-colors duration-300 ease-in-out rounded-full cursor-pointer hover:text-white hover:bg-red-500'>
          <Icon icon="tabler:trash" className="w-7 h-7" />
        </button>
      </div>,
    },
  ];

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    package_id: '',
    id_card: '',
    house_photo: '',
    sales_id: user?.id
  })

  const resetForm = () => {
    setForm({
      name: '',
      phone: '',
      address: '',
      package_id: '',
      id_card: '',
      house_photo: '',
    })
    setSrcHouseImage('')
    setSrcIdCard('')
  }
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleDelete = async (id) => {
    setIsLoading(true)
    await deleteCustomer(id)
    fetchData()
    setIsLoading(false)
    showAlert('success', 'Customer has been deleted')
  }

  const handleCreate = async () => {
    setIsLoading(true)
    form.package_id = parseInt(form.package_id)
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('phone', form.phone)
    formData.append('address', form.address)
    formData.append('package_id', form.package_id)
    formData.append('sales_id', form.sales_id)
    if (form?.id_card) {
      formData.append('id_card', form?.id_card, form?.id_card.name)
    }
    if (form.house_photo) {
      formData.append('house_photo', form.house_photo, form.house_photo.name)
    }
    const res = await createCustomer(formData)
    fetchData()
    setIsLoading(false)
    showAlert('success', 'Customer has been created')
  }

  const handleEdit = async (id) => {
    setIsLoading(true)
    form.package_id = parseInt(form.package_id)
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('phone', form.phone)
    formData.append('address', form.address)
    formData.append('package_id', form.package_id)
    if (form?.id_card) {
      formData.append('id_card', form?.id_card, form?.id_card.name)
    }
    if (form.house_photo) {
      formData.append('house_photo', form.house_photo, form.house_photo.name)
    }
    const res = await updateCustomer(id, formData)
    fetchData()
    setIsLoading(false)
    showAlert('success', 'Customer updated successfully')
  }
  const handleHousePhoto = async (e) => {
    let reader = new FileReader()
    reader.onloadend = () => {
      setSrcHouseImage(reader.result)
    }
    reader.readAsDataURL(e.target.files[0])
    const file = e.target.files[0]
    setForm({
      ...form,
      house_photo: file
    })
  }
  const handleIdCard = async (e) => {
    let reader = new FileReader()
    reader.onloadend = () => {
      setSrcIdCard(reader.result)
    }
    reader.readAsDataURL(e.target.files[0])
    const file = e.target.files[0]
    setForm({
      ...form,
      id_card: file
    })
  }


  return (
    <div>
      <h1 className="text-4xl font-semibold text-secondary">
        List of Customers
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
        <div className="w-full max-w-4xl modal-box">
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
          <div className="grid grid-cols-2 gap-4">
            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input type="text" placeholder="Type here" className="w-full input input-bordered" name='name'
                onChange={handleChange}
                value={form.name}
              />
            </label>
            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">phone</span>
              </div>
              <input type="text" placeholder="Type here" className="w-full input input-bordered" name='phone'
                onChange={handleChange}
                value={form.phone}
              />
            </label>
            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">Id Card</span>
              </div>
              {srcIdCard && <img src={srcIdCard} alt="" className='my-3 max-h-52 rounded-xl' />}
              <input accept=".jpg,.jpeg,.png" type="file" className="w-full file-input file-input-bordered" onChange={handleIdCard} />

            </label>
            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">House Photo</span>
              </div>
              {srcHouseImage && <img src={srcHouseImage} alt="" className='my-3 max-h-52 rounded-xl' />}
              <input accept='.jpg,.jpeg,.png' type="file" className="w-full file-input file-input-bordered " onChange={handleHousePhoto} />
            </label>
            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">Package</span>
              </div>
              <select name='package_id' onChange={
                handleChange
              } value={form.role_id
              } className="w-full select select-bordered">
                {
                  packages.map((role, index) => (
                    <option key={index} value={role?.id}>{role.name}</option>
                  ))
                }
              </select>
            </label>
            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">Address</span>
              </div>
              <textarea className="textarea textarea-bordered" placeholder="Bio" name='address'
                onChange={handleChange} value={form.address}
              ></textarea>
            </label>

          </div>
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
        <div className="w-full max-w-4xl modal-box">
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
          <div className="grid grid-cols-2 gap-4">
            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input type="text" placeholder="Type here" className="w-full input input-bordered" name='name'
                onChange={handleChange}
                value={form.name}
              />
            </label>
            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">phone</span>
              </div>
              <input type="text" placeholder="Type here" className="w-full input input-bordered" name='phone'
                onChange={handleChange}
                value={form.phone}
              />
            </label>
            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">Id Card</span>
              </div>
              {srcIdCard && <img src={srcIdCard} alt="" className='my-3 max-h-52 rounded-xl' />}
              <input accept=".jpg,.jpeg,.png" type="file" className="w-full file-input file-input-bordered" onChange={handleIdCard} />

            </label>
            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">House Photo</span>
              </div>
              {srcHouseImage && <img src={srcHouseImage} alt="" className='my-3 max-h-52 rounded-xl' />}
              <input accept='.jpg,.jpeg,.png' type="file" className="w-full file-input file-input-bordered " onChange={handleHousePhoto} />
            </label>
            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">Address</span>
              </div>
              <textarea className="textarea textarea-bordered" placeholder="Bio" name='address'
                onChange={handleChange} value={form.address}
              ></textarea>
            </label>

          </div>
          <div className="my-1 divider"></div>
          <div className="flex justify-end">
            <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-200" onClick={() => {
              document.getElementById('my_modal_edit').close()
              resetForm()
            }}>Close</button>
            <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-yellow-500 rounded-lg border border-gray-200 hover:bg-yellow-600  focus:z-10 focus:ring-4 focus:ring-gray-200" onClick={() => {
              document.getElementById('my_modal_edit').close()
              handleEdit(selectedData?.id)
              resetForm()
            }}>Submit</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="my_modal_info" className="modal">
        <div className="w-full max-w-4xl modal-box">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Icon icon="tabler:info-circle" className="w-12 h-12 p-1.5 text-blue-500 rounded-full bg-blue-50 " />
              <p className='text-lg font-semibold'>Customer details</p>
            </div>
            <button className="" onClick={() => {
              document.getElementById('my_modal_info').close()
            }}>
              <Icon icon="tabler:x" className="text-red-500 duration-300 ease-in-out w-7 h-7 hover:scale-125" />
            </button>
          </div>
          <div className="flow-root mt-5">
            <dl className="text-sm divide-y divide-gray-100">
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Name</dt>
                <dd className="text-gray-700 sm:col-span-2">{selectedData?.name}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Phone</dt>
                <dd className="text-gray-700 sm:col-span-2">{selectedData?.phone}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Address</dt>
                <dd className="text-gray-700 sm:col-span-2">{selectedData?.address}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">House Photo</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  <img src={selectedData?.house_photo} alt="" className='my-3 max-h-28 rounded-xl' />
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Id Card</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  <img src={selectedData?.id_card} alt="" className='my-3 max-h-28 rounded-xl' />
                </dd>
              </div>
            </dl>
          </div>
          <div className="my-1 divider"></div>
          <h1 className='my-4 text-xl font-semibold'>Subscription Details</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm bg-white divide-y-2 divide-gray-200">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                    Package
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                    Price
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                    Added By
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                    Verified By
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 font-medium text-center text-gray-900 whitespace-nowrap">
                    {selectedData?.subscription[0]?.package.name}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
                    {formatToCurrency(selectedData?.subscription[0]?.package.price)}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      <div className={`h-2.5 w-2.5 rounded-full ${selectedData?.subscription[0]?.status == 'active' ? 'bg-green-500' : selectedData?.subscription[0]?.status == 'inactive' ? 'bg-red-500 animate-pulse ' : 'bg-yellow-500 animate-pulse '} me-2`}></div> {selectedData?.subscription[0]?.status}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
                    {selectedData?.subscription[0]?.sales?.name}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
                    {selectedData?.subscription[0]?.user_id ? selectedData?.subscription[0]?.user?.name : 'Not verified yet'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

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
            By deleting this employee,you will lose all the data and it can't be recovered.
          </p>
          <div className="my-1 divider"></div>
          <div className="flex justify-end">
            <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-200" onClick={() => {
              document.getElementById('my_modal_delete').close()
            }}>Close</button>
            <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-red-500 rounded-lg border border-gray-200 hover:bg-red-600  focus:z-10 focus:ring-4 focus:ring-gray-200" onClick={() => {
              document.getElementById('my_modal_delete').close()
              handleDelete(selectedData?.id)
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

export default Customer
