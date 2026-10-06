import { useEffect, useState } from 'react'
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
const basePrefix = basePath.replace(/\/+$/, '')

function toAppPath(rawPath) {
  const normalized = rawPath.replace(/\/+$/, '') || '/'

  if (normalized === basePrefix || normalized === '/') {
    return '/'
  }

  return normalized.startsWith(`${basePrefix}/`)
    ? normalized.slice(basePrefix.length) || '/'
    : normalized
}

function withBasePath(path) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${basePath}${cleanPath.slice(1)}`
}

function App() {
  const [currentPath, setCurrentPath] = useState(() =>
    toAppPath(window.location.pathname),
  )

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(toAppPath(window.location.pathname))
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (event, path) => {
    event.preventDefault()
    const destination = withBasePath(path)

    if (window.location.pathname !== destination) {
      window.history.pushState({}, '', destination)
      setCurrentPath(path)
    }
  }

  const Page = routes[currentPath] ?? Overview

  return (
    <>
      <nav aria-label="Primary navigation">
        <a href={withBasePath('/')} onClick={(event) => navigate(event, '/')}>Home</a>
        <a href={withBasePath('/3d')} onClick={(event) => navigate(event, '/3d')}>3D statues</a>
        <a href={withBasePath('/about')} onClick={(event) => navigate(event, '/about')}>About</a>
        <a href={withBasePath('/old-photos')} onClick={(event) => navigate(event, '/old-photos')}>Old photos</a>
        <a href={withBasePath('/modern')} onClick={(event) => navigate(event, '/modern')}>Modern</a>
        <MusicPlayer />
      </nav>
      <Page />
    </>
  )
}

export default App
