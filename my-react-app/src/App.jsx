import ThreeDViewer from './pages/3d'
import Overview from './pages/overview'
import MainRoom from './pages/main-room'
import Modern from './pages/modern'
import OldPhotos from './pages/old-photos'
import MusicPlayer from './components/navbar/music'

const routes = {
  '/': Overview,
  '/3d': ThreeDViewer,
  '/about': MainRoom,
  '/main-room': MainRoom,
  '/modern': Modern,
  '/Modern': Modern,
  '/old-photos': OldPhotos,
  '/OldPhotos': OldPhotos,
}

function App() {
  const Page = routes[window.location.pathname] ?? Overview

  return (
    <>
      <nav aria-label="Primary navigation">
        <a href="/">Home</a>
        <a href="/3d">3D statues</a>
        <a href="/about">About</a>
        <a href="/old-photos">Old photos</a>
        <a href="/modern">Modern</a>
        <MusicPlayer />
      </nav>
      <Page />
    </>
  )
}

export default App
