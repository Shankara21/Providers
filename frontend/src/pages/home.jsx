import React, { useEffect, useState } from 'react'
import { getStats } from '../services/Api/stats'

const Home = () => {
  const [stats, setStats] = useState({})
  useEffect(() => {
    fetchStats()
  }, [])
  const fetchStats = async () => {
    const res = await getStats()
    setStats(res.data)
  }
  return (
    <div className=''>
      <section className="">
        <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Telah dipercaya oleh lebih dari 1000+ pelanggan
            </h2>
            <p className="mt-4 text-gray-500 sm:text-xl">
              Kami selalu berusaha memberikan layanan terbaik untuk pelanggan, dan kami akan terus berusaha untuk memberikan layanan terbaik.
            </p>
          </div>
          <div className="mt-8 ">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 ">
              <div className="flex flex-col px-4 py-8 text-center bg-blue-100 rounded-lg shadow-xl">
                <dt className="order-last text-lg font-medium text-gray-400">
                  Total Packages
                </dt>
                <dd className="text-4xl font-extrabold text-secondary md:text-5xl">
                  {stats.packages}
                </dd>
              </div>
              <div className="flex flex-col px-4 py-8 text-center bg-blue-100 rounded-lg shadow-xl">
                <dt className="order-last text-lg font-medium text-gray-400">
                  Total Subscriptions
                </dt>
                <dd className="text-4xl font-extrabold text-secondary md:text-5xl">
                  {stats.subscriptions}
                </dd>
              </div>
              <div className="flex flex-col px-4 py-8 text-center bg-blue-100 rounded-lg shadow-xl">
                <dt className="order-last text-lg font-medium text-gray-400">
                  Total Customers
                </dt>
                <dd className="text-4xl font-extrabold text-secondary md:text-5xl">
                  {stats.customers}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>


    </div>
  )
}

export default Home
