import { useEffect, useState } from 'react'
import ThreeDViewer from './pages/3d'
import Overview from './pages/overview'
import MainRoom from './pages/main-room'
import Modern from './pages/modern'
import OldPhotos from './pages/old-photos'
import MusicPlayer from './components/navbar/music'

const basePath = import.meta.env.BASE_URL || '/react-unit-project/'
const basePrefix = basePath.replace(/\/+$/, '')

function getInitialPath() {
  const storedRoute = sessionStorage.getItem('route')
  if (storedRoute) {
    sessionStorage.removeItem('route')
    return storedRoute
  }

  const queryRoute = new URLSearchParams(window.location.search).get('route')
  if (queryRoute) {
    return queryRoute
  }

  const rawPath = window.location.pathname || '/'
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

const routes = {
  '/': Overview,
  '/3d': ThreeDViewer,
  '/main-room': MainRoom,
  '/about': Overview,
  '/old-photos': OldPhotos,
  '/modern': Modern,
}

function App() {
  const [currentPath, setCurrentPath] = useState(getInitialPath)

  useEffect(() => {
    const handlePopState = () => setCurrentPath(getInitialPath())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (event, path) => {
    event.preventDefault()
    const target = withBasePath(path)
    const normalizedTarget = target.replace(/\/+$/, '') || '/'

    if (window.location.pathname !== normalizedTarget) {
      window.history.pushState({}, '', normalizedTarget)
    }

    setCurrentPath(path)
  }

  const Page = routes[currentPath] ?? Overview

  return (
    <>
      <nav aria-label="Primary navigation">
        <a href={withBasePath('/')} onClick={(event) => navigate(event, '/')}>Home</a>
        <a href={withBasePath('/3d')} onClick={(event) => navigate(event, '/3d')}>3D statues</a>
        <a href={withBasePath('/main-room')} onClick={(event) => navigate(event, '/main-room')}>Main room</a>
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
