import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MusicPlayer from './components/navbar/music'
import MainRoom from './pages/main-room'
import OldPhotos from './pages/old-photos'
import Modern from './pages/modern'
import MallExplorer from './pages/mall'
import ThreeDoors from './pages/three-doors'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<MainRoom />} />
        <Route path="/main-room" element={<MainRoom />} />
        <Route path="/three-doors" element={<ThreeDoors />} />
        <Route path="/old-photos" element={<OldPhotos />} />
        <Route path="/modern" element={<Modern />} />
        <Route path="/3d" element={<MallExplorer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App