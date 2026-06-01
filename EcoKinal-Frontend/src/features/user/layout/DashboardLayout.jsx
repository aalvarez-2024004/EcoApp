import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { css as dashboardStyles } from '../../../Styles/DashboardPage'
import ProfileModal from '../components/ProfileModal'

export default function DashboardLayout() {
  const [showEditModal, setShowEditModal] = useState(false)

  return (
    <>
      <style>{dashboardStyles}</style>
      <div className="db-layout">
        <Sidebar onEditProfile={() => setShowEditModal(true)} />
        <main className="db-main-content">
          <Outlet />
        </main>
        {showEditModal && (
          <ProfileModal onClose={() => setShowEditModal(false)} />
        )}
      </div>
    </>
  )
}