"use client"
import { NavLink, useLocation } from "react-router-dom"
import { motion } from "framer-motion"

const navItems = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/library", label: "My Library" },
  { path: "/reviews", label: "Reviews" },
  { path: "/social", label: "Social" },
]

export default function Navigation() {
  const location = useLocation()

  return (
    <nav className="relative">
      <div className="flex justify-around bg-muted p-1 px-1 rounded-lg">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === "/dashboard" && location.pathname === "/")

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`relative px-16 py-3 text-sm font-medium transition-colors rounded-md ${
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-background shadow-lg rounded-md"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
