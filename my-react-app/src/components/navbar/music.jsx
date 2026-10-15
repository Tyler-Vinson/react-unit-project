import { useEffect, useRef, useState } from 'react'
import musicFile from '../../assets/sound/ES_Enchante Madame.mp3'

function MusicPlayer() {
  const audioRef = useRef(null)
  const buttonRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    const updatePlaying = () => setIsPlaying(!audio.paused)
    const startMusic = (event) => {
      if (event.target === buttonRef.current) {
        return
      }

      audio.play()
        .then(() => {
          window.removeEventListener('pointerdown', startMusic)
          window.removeEventListener('keydown', startMusic)
        })
        .catch((error) => {
          if (error.name !== 'AbortError') {
            console.error('Unable to play background music.', error)
          }
        })
    }

    audio.volume = 0.35
    audio.addEventListener('play', updatePlaying)
    audio.addEventListener('pause', updatePlaying)

    audio.play().catch((error) => {
      if (error.name !== 'NotAllowedError') {
        if (error.name !== 'AbortError') {
          console.error('Unable to play background music.', error)
        }
        return
      }
      window.addEventListener('pointerdown', startMusic)
      window.addEventListener('keydown', startMusic)
    })

    return () => {
      audio.pause()
      window.removeEventListener('pointerdown', startMusic)
      window.removeEventListener('keydown', startMusic)
      audio.removeEventListener('play', updatePlaying)
      audio.removeEventListener('pause', updatePlaying)
    }
  }, [])

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio.play().catch((error) => {
        if (error.name !== 'AbortError') {
          console.error('Unable to play background music.', error)
        }
      })
    } else {
      audio.pause()
    }
  }

  return (
    <>
      <button
        ref={buttonRef}
        className="music-toggle"
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        aria-pressed={isPlaying}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
          {isPlaying ? (
            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
          ) : (
            <path d="M8 5v14l11-7z" />
          )}
        </svg>
      </button>
      <audio ref={audioRef} src={musicFile} loop preload="auto" aria-hidden="true" />
    </>
  )
}

export default MusicPlayer