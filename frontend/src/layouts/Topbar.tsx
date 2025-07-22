export default function Topbar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b bg-white shadow-sm">
      <h2 className="text-lg font-semibold">Welcome to Assetto</h2>
      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
        👤
      </div>
    </header>
  )
}
