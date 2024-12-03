import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export default function Checkout() {
	const user = useSelector((state) => state.user)
	return (
		<section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
  <div className="mx-auto max-w-2xl px-4 2xl:px-0">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">Cảm ơn bạn đã đặt hàng</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">Đơn hàng của bạn <a href="#" className="font-medium text-gray-900 dark:text-white hover:underline">#7564804</a> sẽ được giao tới trong 24h làm việc.Vui lòng kiểm tra email để xem trạng thái đơn hàng.</p>
      <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
          <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Ngày đặt</dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{new Date().toLocaleDateString('vi-VI')}</dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Phương thức thanh toán</dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">COD</dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Tên</dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{user.usr_name}</dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Địa chỉ</dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">Hà nội</dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Số điện thoại</dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{user.usr_phone || "099999999"} </dd>
          </dl>
      </div>
      <div className="flex items-center space-x-4">
          <NavLink to="/" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Quay về trang chủ</NavLink>
      </div>
  </div>
</section>
	)
}
