import { NavLink } from "react-router-dom"
import {
   Tag, Tags, MapPin, Truck, BarChart, FileText
} from "lucide-react"

const navItems = [
  // { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  // { name: "Assets", icon: Package, path: "/assets" },
  { name: "Categories", icon: Tag, path: "/" },
  { name: "Subcategories", icon: Tags, path: "/subcategories" },
  { name: "Branches", icon: MapPin, path: "/branches" },
  { name: "Vendors", icon: Truck, path: "/vendors" },
  { name: "Manufacturers", icon: BarChart, path: "/manufacturers" },
  { name: "GRN", icon: FileText, path: "/grn" }
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow h-full p-4 space-y-4">
      <h1 className="text-xl font-bold text-purple-600">AssetManager</h1>
      <nav className="space-y-2">
        {navItems.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive ? "bg-purple-100 text-purple-700 font-semibold" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
