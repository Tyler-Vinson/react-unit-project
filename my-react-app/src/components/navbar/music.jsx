import { useEffect, useRef } from 'react'
import musicFile from '../../assets/sound/ES_Enchante Madame.mp3'

function MusicPlayer() {
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    audio.volume = 0.35
    const startMusic = () => {
      audio.play()
        .then(() => {
          window.removeEventListener('pointerdown', startMusic)
          window.removeEventListener('keydown', startMusic)
        })
        .catch((error) => {
          console.error('Unable to play background music.', error)
        })
    }

    audio.play().catch(() => {
      window.addEventListener('pointerdown', startMusic)
      window.addEventListener('keydown', startMusic)
    })

    return () => {
      audio.pause()
      window.removeEventListener('pointerdown', startMusic)
      window.removeEventListener('keydown', startMusic)
    }
  }, [])

  return <audio ref={audioRef} src={musicFile} loop preload="auto" aria-hidden="true" />
}

export default MusicPlayer