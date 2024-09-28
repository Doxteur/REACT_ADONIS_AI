"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BadgePercent, Map, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const tabs = [
  { icon: BadgePercent, label: "Deals", path: "/deals" },
  { icon: Map, label: "Map", path: "/map" },
  { icon: User, label: "Profile", path: "/profile" },
];

function BottomNavigation() {
  const [activeTab, setActiveTab] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const currentTab = tabs.findIndex(tab => tab.path === location.pathname);
    if (currentTab !== -1) {
      setActiveTab(currentTab);
    }
  }, [location]);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around">
      {tabs.map((tab, index) => (
        <Link
          key={tab.label}
          to={tab.path}
          className={`flex flex-col items-center justify-center w-full h-full relative ${
            activeTab === index ? "text-black" : "text-gray-500"
          }`}
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
        </Link>
      ))}
    </div>
  );
}

export default BottomNavigation;
