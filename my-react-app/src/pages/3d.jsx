import { useEffect, useRef, useState } from 'react'
import '../App.css'

const SKETCHFAB_API_URL =
  'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js'

// Keep this source list limited to approved historical statue scans.
const STATUE_SCANS = [
  {
    uid: '1660078e985a4f04933e0b9f35d6e5f4',
    title: 'Horse statue',
    creator: 'Ege',
    category: 'historical-statue',
  },
  {
    uid: '113c62426b6f4bc9bb4c7b80e50321d5',
    title: 'Statue of the girl',
    creator: '3dhdscan',
    category: 'historical-statue',
  },
  {
    uid: '8cd02b742a77411ba47829d87463194d',
    title: 'Ramesses II statue',
    creator: 'Mohamed Abdelaziz',
    category: 'historical-statue',
  },
  {
    uid: '2bb7891bcdd44d0dbab14f97ef02f431',
    title: 'Ancient Singha stone statue',
    creator: 'Sakchai.Sompila',
    category: 'historical-statue',
  },
  {
    uid: '69071d2b9b3c4263893b8e9a82d7bdc7',
    title: 'Statue of Mary Magdalene',
    creator: '10Bit Scans',
    category: 'historical-statue',
  },
]

const HISTORICAL_STATUE_SCANS = STATUE_SCANS.filter(
  (scan) => scan.category === 'historical-statue',
)

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

function ThreeDViewer() {
  const iframeRef = useRef(null)
  const viewerRef = useRef(null)
  const renderCarouselRef = useRef(null)
  const activeScanUidRef = useRef(null)
  const [selectedScanIndex, setSelectedScanIndex] = useState(0)
  const [status, setStatus] = useState('Click “Load model” to start the viewer.')
  const [isLoading, setIsLoading] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const selectedScan = HISTORICAL_STATUE_SCANS[selectedScanIndex]

  useEffect(() => {
    return () => {
      viewerRef.current?.stop?.()
      viewerRef.current = null
    }
  }, [])

  useEffect(() => {
    const carousel = renderCarouselRef.current

    if (carousel) {
      carousel.scrollTo({
        left: selectedScanIndex * carousel.clientWidth,
        behavior: 'smooth',
      })
    }
  }, [selectedScanIndex])

  if (!selectedScan) {
    return (
      <main className="viewer-page">
        <section className="viewer-card" aria-labelledby="viewer-title">
          <div className="viewer-heading">
            <p className="eyebrow">Historical statue scans</p>
            <h1 id="viewer-title">No historical statues available</h1>
            <p className="description">
              There are currently no approved historical statue scans to display.
            </p>
          </div>
        </section>
      </main>
    )
  }

  const selectScan = (index) => {
    viewerRef.current?.stop?.()
    viewerRef.current = null
    activeScanUidRef.current = null
    setSelectedScanIndex(index)
    setIsLoading(false)
    setIsReady(false)
    setStatus('Click “Load model” to start the viewer.')
  }

  const handleRenderScroll = (event) => {
    const slideWidth = event.currentTarget.clientWidth
    const nextIndex = Math.round(event.currentTarget.scrollLeft / slideWidth)

    if (nextIndex !== selectedScanIndex && HISTORICAL_STATUE_SCANS[nextIndex]) {
      selectScan(nextIndex)
    }
  }

  const loadModel = async () => {
    if (isLoading || isReady) {
      return
    }

    setIsLoading(true)
    setStatus('Loading the Sketchfab viewer…')
    activeScanUidRef.current = selectedScan.uid

    try {
      await loadSketchfabScript()

      const client = new window.Sketchfab(iframeRef.current)
      client.init(selectedScan.uid, {
        success: (api) => {
          if (activeScanUidRef.current !== selectedScan.uid) {
            api.stop?.()
            return
          }
          viewerRef.current = api
          api.start()
          api.addEventListener('viewerready', () => {
            if (activeScanUidRef.current !== selectedScan.uid) {
              return
            }
            api.setBackground?.({ color: [0.93, 0.88, 0.78] })
            setIsLoading(false)
            setIsReady(true)
            setStatus('Viewer ready.')
          })
        },
        error: () => {
          if (activeScanUidRef.current !== selectedScan.uid) {
            return
          }
          setIsLoading(false)
          setStatus('Sketchfab could not load this model. Please try again.')
        },
      })
    } catch (error) {
      if (activeScanUidRef.current !== selectedScan.uid) {
        return
      }
      setIsLoading(false)
      setStatus(error.message)
    }
  }

  return (
    <main className="viewer-page">
      <section className="viewer-card" aria-labelledby="viewer-title">
        <div className="viewer-heading">
          <p className="eyebrow">Historical statue scans</p>
          <h1 id="viewer-title">{selectedScan.title}</h1>
          <p className="description">
            Created by {selectedScan.creator}.
          </p>
          <p className="statue-list-label">Scroll to view different statue scans</p>

        </div>

        <div
          className="render-carousel"
          ref={renderCarouselRef}
          onScroll={handleRenderScroll}
          aria-label="Historical statue renders"
        >
          {HISTORICAL_STATUE_SCANS.map((scan, index) => (
            <div className="render-slide" key={scan.uid}>
              {index === selectedScanIndex ? (
                <>
                  <iframe
                    key={scan.uid}
                    className={isReady ? '' : 'hidden'}
                    ref={iframeRef}
                    title={`${scan.title} 3D render`}
                    allow="accelerometer; gyroscope; autoplay; fullscreen; xr-spatial-tracking"
                    src={null}
                  />
                  {!isReady && (
                    <div className="viewer-placeholder" aria-live="polite">
                      <span className="placeholder-icon" aria-hidden="true">
                        ◇
                      </span>
                      <span>{status}</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="render-slide-label">
                  <span>{scan.title}</span>
                  <small>Scroll to view this render</small>
                </div>
              )}
            </div>
          ))}
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
export default ThreeDViewer