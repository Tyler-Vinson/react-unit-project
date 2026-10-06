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

const basePath = import.meta.env.BASE_URL || '/'

function toAppPath(rawPath) {
  const normalized = rawPath.replace(/\/+$/, '') || '/'

  if (normalized === basePath.replace(/\/+$/, '')) {
    return '/'
  }

  const basePrefix = basePath.replace(/\/+$/, '')
  return normalized.startsWith(basePrefix)
    ? normalized.slice(basePrefix.length) || '/'
    : normalized
}

function withBasePath(path) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${basePath}${cleanPath.slice(1)}`
}

function App() {
  const Page = routes[toAppPath(window.location.pathname)] ?? Overview

  return (
    <>
      <nav aria-label="Primary navigation">
        <a href={withBasePath('/')}>Home</a>
        <a href={withBasePath('/3d')}>3D statues</a>
        <a href={withBasePath('/about')}>About</a>
        <a href={withBasePath('/old-photos')}>Old photos</a>
        <a href={withBasePath('/modern')}>Modern</a>
        <MusicPlayer />
      </nav>
      <Page />
    </>
  )
}

export default App
