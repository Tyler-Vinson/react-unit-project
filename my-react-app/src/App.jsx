import { useEffect, useRef, useState } from 'react'
import './App.css'

const SKETCHFAB_API_URL =
  'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js'
const MODEL_UID = '7w7pAfrCfjovwykkEeRFLGw5SXS'

let sketchfabScriptPromise

function loadSketchfabScript() {
  if (window.Sketchfab) {
    return Promise.resolve()
  }

  if (!sketchfabScriptPromise) {
    sketchfabScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = SKETCHFAB_API_URL
      script.async = true
      script.onload = resolve
      script.onerror = () => {
        sketchfabScriptPromise = undefined
        reject(new Error('The Sketchfab viewer API could not be loaded.'))
      }
      document.head.appendChild(script)
    })
  }

  return sketchfabScriptPromise
}

function App() {
  const iframeRef = useRef(null)
  const viewerRef = useRef(null)
  const [status, setStatus] = useState('Click “Load model” to start the viewer.')
  const [isLoading, setIsLoading] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    return () => {
      viewerRef.current?.stop?.()
      viewerRef.current = null
    }
  }, [])

  const loadModel = async () => {
    if (isLoading || isReady) {
      return
    }

    setIsLoading(true)
    setStatus('Loading the Sketchfab viewer…')

    try {
      await loadSketchfabScript()

      const client = new window.Sketchfab(iframeRef.current)
      client.init(MODEL_UID, {
        success: (api) => {
          viewerRef.current = api
          api.start()
          api.addEventListener('viewerready', () => {
            setIsLoading(false)
            setIsReady(true)
            setStatus('Viewer ready.')
          })
        },
        error: () => {
          setIsLoading(false)
          setStatus('Sketchfab could not load this model. Please try again.')
        },
      })
    } catch (error) {
      setIsLoading(false)
      setStatus(error.message)
    }
  }

  return (
    <main className="viewer-page">
      <section className="viewer-card" aria-labelledby="viewer-title">
        <div className="viewer-heading">
          <p className="eyebrow">Interactive 3D</p>
          <h1 id="viewer-title">Sketchfab viewer</h1>
          <p className="description">
            Load the model directly in this React app using the Sketchfab Viewer API.
          </p>
        </div>

        <div className="viewer-frame">
          <iframe
            className={isReady ? '' : 'hidden'}
            ref={iframeRef}
            title="Sketchfab 3D model"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
            src=""
          />
          {!isReady && (
            <div className="viewer-placeholder" aria-live="polite">
              <span className="placeholder-icon" aria-hidden="true">
                ◇
              </span>
              <span>{status}</span>
            </div>
          )}
        </div>

        <div className="viewer-controls">
          <p className="status" aria-live="polite">
            {status}
          </p>
          <button type="button" onClick={loadModel} disabled={isLoading || isReady}>
            {isLoading ? 'Loading…' : isReady ? 'Model loaded' : 'Load model'}
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
