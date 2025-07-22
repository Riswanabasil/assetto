import Sidebar from "./Sidebar"
import Topbar from "./Topbar"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-4 bg-gray-50 overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
