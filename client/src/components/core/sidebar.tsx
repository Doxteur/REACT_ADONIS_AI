import React from 'react'
import { Link } from 'react-router-dom'
import { Home, BarChart2, Users, Settings } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className={`w-16  bg-white shadow-lg transition-all duration-300 'translate-x-0' : '-translate-x-full '`}>
      <div className="flex items-center justify-center h-16 border-b border-green-100">
        <div className="w-8 h-8 relative overflow-hidden border-2 border-green-500 rounded-md">
          <div className="absolute inset-0 bg-white"></div>
          <div className="absolute inset-0 bg-green-500" style={{ clipPath: 'polygon(0 0, 0% 100%, 100% 0)' }}></div>
        </div>
        <span className="hidden  ml-2 text-lg font-semibold text-green-700">LeapNotes</span>
      </div>
      <nav className="mt-6">
        <SidebarLink to="/dashboard" icon={<Home />} label="Home" />
        <SidebarLink to="/dashboard/analytics" icon={<BarChart2 />} label="Analytics" />
        <SidebarLink to="/dashboard/users" icon={<Users />} label="Users" />
        <SidebarLink to="/dashboard/settings" icon={<Settings />} label="Settings" />
      </nav>
    </aside>
  )
}

interface SidebarLinkProps {
  to: string
  icon: React.ReactNode
  label: string
}

function SidebarLink({ to, icon, label }: SidebarLinkProps) {
  return (
    <Link to={to} className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200">
      <div className="w-5 h-5 text-green-600">{icon}</div>
      <span className="hidden  ml-3">{label}</span>
    </Link>
  )
}
