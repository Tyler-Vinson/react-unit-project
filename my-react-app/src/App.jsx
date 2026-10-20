import './App.css'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import MusicPlayer from './components/navbar/music'
import MainRoom from './pages/main-room'
import ThreeDoors from './pages/three-doors'
import PreMall from './pages/pre-mall'
import PreSlender from './pages/pre-slender'
import SlenderPage from './pages/slender-page'
import PreWitch from './pages/pre-witch'
import WitchPage from './pages/witch-page'
import ModelShowcase from './pages/model-showcase'

const MallExplorer = lazy(() => import('./pages/mall'))

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Navbar />
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<MainRoom />} />
        <Route path="/main-room" element={<MainRoom />} />
        <Route path="/three-doors" element={<ThreeDoors />} />
        <Route path="/pre-mall" element={<PreMall />} />
        <Route path="/pre-slender" element={<PreSlender />} />
        <Route path="/slender-page" element={<SlenderPage />} />
        <Route path="/pre-witch" element={<PreWitch />} />
        <Route path="/witch-page" element={<WitchPage />} />
        <Route path="/model-showcase" element={<ModelShowcase />} />
        <Route
          path="/3d"
          element={
            <Suspense fallback={<div role="status">Loading 3D mall...</div>}>
              <MallExplorer />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App