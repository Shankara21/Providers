import React, { useEffect, useState } from 'react'
import { login } from '../services/Api/auth'
import { useAlert } from '../context/AlertProvider'

const Login = () => {
  const { showAlert } = useAlert()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      window.location.href = '/home'
      showAlert('You are already logged in', 'error')
    }
  }, [])
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleLogin = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    const res = await login(form)
    if (!res.isSuccess) {
      // setIsError(true)
      // setErrorMessages(res.message)
      setTimeout(() => {
        // setIsError(false)
        // setErrorMessages(null)
      }, 3000)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      showAlert('success', 'Login Success')
      window.location.href = '/home'
    }
  }
  return (
    <>
      {/* component */}
      <div className="bg-white ">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage:
                "url('/login-image.jpeg')"
            }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-5xl font-bold text-white">Providers</h2>
                <p className="max-w-xl mt-3 text-gray-300">
                  Melangkah ke Depan dengan Teknologi Terdepan: Layanan Internet Berkualitas Tinggi yang Memberdayakan Keterhubungan Tanpa Batas, Membuka Peluang Baru untuk Kemajuan dan Kreativitas.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <img src="/opt-logo.png" alt="" className='h-32 mx-auto' />
                <p className="mt-3 text-gray-500 ">
                  Sign in to access your account
                </p>
              </div>
              <div className="mt-8">
                <form onSubmit={handleLogin}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm text-gray-600 "
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleChange}
                      value={form.email}
                      placeholder="Your Email"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-600 "
                      >
                        Password
                      </label>
                    </div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={handleChange}
                      value={form.password}
                      placeholder="Your Password"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mt-6">
                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-xl hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>


  )
}

export default Login
