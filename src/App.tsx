import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ListsProvider } from './context/ListsContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import NewList from './pages/NewList'
import ListDetail from './pages/ListDetail'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <ListsProvider>
        <div className="min-h-screen flex flex-col bg-stone-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<NewList />} />
              <Route path="/list/:id" element={<ListDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </ListsProvider>
    </BrowserRouter>
  )
}

export default App