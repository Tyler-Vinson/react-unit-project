import 'App.css'
import { BrowserRouter,  Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import MainRoom from './pages/main-room'
import OldPhotos from './pages/old-photos'
import ThreeD from './pages/3d'
import Modern from './pages/modern'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/main-room" element={<MainRoom />} />
        <Route path="/old-photos" element={<OldPhotos />} />
        <Route path="/3d" element={<ThreeD />} />
        <Route path="/modern" element={<Modern />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App