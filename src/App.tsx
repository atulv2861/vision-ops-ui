import './App.css'
import Sidebar from './Component/Comman/Sidebar'
import Navbar from './Component/Comman/Navbar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from './Context/AppContext'

function App() {
  const { isSidebarCollapsed } = useAppContext();

  return (
    <div className="h-screen bg-gray-900">
      <Sidebar />
      <Navbar />
      <main 
        className={`pt-20 h-full overflow-auto p-6 transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {/* Main content area */}
        <Outlet/>
      </main>
    </div>
  )
}

export default App
