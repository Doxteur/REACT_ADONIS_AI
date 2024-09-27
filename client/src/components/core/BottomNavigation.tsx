"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Home, Search, Bell, User } from "lucide-react"

const tabs = [
  { icon: Home, label: "Home" },
  { icon: Search, label: "Search" },
  { icon: Bell, label: "Notifications" },
  { icon: User, label: "Profile" },
]

function BottomNavigation() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around">
      {tabs.map((tab, index) => (
        <button
          key={tab.label}
          className={`flex flex-col items-center justify-center w-full h-full relative ${
            activeTab === index ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => setActiveTab(index)}
        >
          <tab.icon className="w-6 h-6" />
          <span className="text-xs mt-1">{tab.label}</span>
          {activeTab === index && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500"
              layoutId="activeTab"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
        </button>
      ))}
    </div>
  )
}

export default BottomNavigation
