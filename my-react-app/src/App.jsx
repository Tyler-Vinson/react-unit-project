import './App.css'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MusicPlayer from './components/navbar/music'
import MainRoom from './pages/main-room'
import OldPhotos from './pages/old-photos'
import Modern from './pages/modern'
import ThreeDoors from './pages/three-doors'
import PreMall from './pages/pre-mall'
import PreSlender from './pages/pre-slender'
import PreWitch from './pages/pre-witch'

const MallExplorer = lazy(() => import('./pages/mall'))

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<MainRoom />} />
        <Route path="/main-room" element={<MainRoom />} />
        <Route path="/three-doors" element={<ThreeDoors />} />
        <Route path="/pre-mall" element={<PreMall />} />
        <Route path="/pre-slender" element={<PreSlender />} />
        <Route path="/pre-witch" element={<PreWitch />} />
        <Route path="/old-photos" element={<OldPhotos />} />
        <Route path="/modern" element={<Modern />} />
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