'use client'

import React from 'react'
import { Search } from 'lucide-react'
import { Sidebar } from './core/sidebar' // Importez le nouveau composant Sidebar

export function DashboardLayout({ children }: { children: React.ReactNode }) {


  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 to-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
         {/* Top bar */}
         <header className="flex items-center justify-between px-6 py-4 bg-gray-50 shadow-md ">
          <div className="flex items-center flex-1 px-4">
            <form className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-amber-500" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-8 pr-4 py-2 rounded-md bg-white text-gray-900 placeholder-gray-500 border  focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4">
          {children}
        </main>
      </div>
    </div>
  )
}
