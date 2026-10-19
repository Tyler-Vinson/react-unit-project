import { useState } from 'react'
import { Link } from 'react-router-dom'
import doorClosed from '../assets/doorclosed.png'
import openCenterDoor from '../assets/doors-center-open-transparent.png'
import roomImage from '../assets/room-without-pillars.png'
import closedLeftDoor from '../assets/three-doors-left-closed.png'
import openLeftDoor from '../assets/three-doors-left-open.png'
import closedRightDoor from '../assets/three-doors-right-closed.png'
import openRightDoor from '../assets/three-doors-right-open.png'

const ThreeDoors = () => {
  const [activeSideDoor, setActiveSideDoor] = useState(null)
  return (
    <main className="three-doors-room">
      <div className="room-scene">
        <img
          className="room-image"
          src={roomImage}
          alt="Museum hallway with three closed doors"
        />
        <div className="room-door room-door-left">
          <Link
            className="room-door-link"
            to="/pre-mall"
            aria-label="Explore Valley View Center"
            onMouseEnter={() => setActiveSideDoor('left')}
            onMouseLeave={() => setActiveSideDoor(null)}
            onFocus={() => setActiveSideDoor('left')}
            onBlur={() => setActiveSideDoor(null)}
          >
            <img
              className={`room-door-state${activeSideDoor === 'left' ? ' room-door-state-open' : ''}`}
              src={activeSideDoor === 'left' ? openLeftDoor : closedLeftDoor}
              alt=""
            />
          </Link>
        </div>
        <div className="room-door room-door-center">
          <Link
            className="room-door-link"
            to="/pre-slender"
            aria-label="Explore Slender Man"
            onMouseEnter={() => setActiveSideDoor('center')}
            onMouseLeave={() => setActiveSideDoor(null)}
            onFocus={() => setActiveSideDoor('center')}
            onBlur={() => setActiveSideDoor(null)}
          >
            <span className="door-opening" aria-hidden="true" />
            <img
              className={`room-door-panel${activeSideDoor === 'center' ? ' room-door-center-open' : ''}`}
              src={activeSideDoor === 'center' ? openCenterDoor : doorClosed}
              alt=""
            />
          </Link>
        </div>
        <div className="room-door room-door-right">
          <Link
            className="room-door-link"
            to="/pre-witch"
            aria-label="Explore The Blair Witch Project"
            onMouseEnter={() => setActiveSideDoor('right')}
            onMouseLeave={() => setActiveSideDoor(null)}
            onFocus={() => setActiveSideDoor('right')}
            onBlur={() => setActiveSideDoor(null)}
          >
            <img
              className={`room-door-state${activeSideDoor === 'right' ? ' room-door-state-open' : ''}`}
              src={activeSideDoor === 'right' ? openRightDoor : closedRightDoor}
              alt=""
            />
          </Link>
        </div>
      </div>
      <Link className="exit-door-link" to="/" aria-label="Return to the front page">
        <img className="exit-door" src={doorClosed} alt="Exit door" />
      </Link>
    </main>
  )
}

export default ThreeDoors
