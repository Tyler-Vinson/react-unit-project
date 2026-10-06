import { useEffect, useRef } from 'react'
import musicFile from '../../assets/sound/ES_Enchante Madame.mp3'

function MusicPlayer() {
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) {
      return undefined
    }

    audio.volume = 0.35
    const startMusic = () => {
      audio.play().catch(() => {})
      window.removeEventListener('pointerdown', startMusic)
      window.removeEventListener('keydown', startMusic)
    }

    audio.play().catch(() => {
      window.addEventListener('pointerdown', startMusic, { once: true })
      window.addEventListener('keydown', startMusic, { once: true })
    })

    return () => {
      audio.pause()
      window.removeEventListener('pointerdown', startMusic)
      window.removeEventListener('keydown', startMusic)
    }
  }, [])

  return <audio ref={audioRef} src={musicFile} autoPlay loop preload="auto" aria-hidden="true" />
}

export default MusicPlayer