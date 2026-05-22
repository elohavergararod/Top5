import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ListsProvider } from './context/ListsContext'
import Navbar from './components/Navbar'
import LoadingSpinner from './components/LoadingSpinner'

const Home = lazy(() => import('./pages/Home'))
const NewList = lazy(() => import('./pages/NewList'))
const ListDetail = lazy(() => import('./pages/ListDetail'))
const EditList = lazy(() => import('./pages/EditList'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ListsProvider>
          <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950">
            <Navbar />
            <main className="flex-1">
              <Suspense fallback={<LoadingSpinner message="Loading page…" />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/new" element={<NewList />} />
                  <Route path="/list/:id" element={<ListDetail />} />
                  <Route path="/list/:id/edit" element={<EditList />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </ListsProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App