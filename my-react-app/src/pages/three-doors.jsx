import { Link } from 'react-router-dom'
import leftDoor from '../assets/door-left-reference.png'
import centerPanel from '../assets/door-center-panel.png'
import rightDoor from '../assets/door-right-reference.png'
import roomImage from '../assets/room-without-pillars.png'

const ThreeDoors = () => (
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
        >
          <span className="door-opening" aria-hidden="true" />
          <img className="room-door-panel" src={leftDoor} alt="" />
        </Link>
      </div>
      <div className="room-door room-door-center">
        <Link
          className="room-door-link"
          to="/pre-slender"
          aria-label="Explore Slender Man"
        >
          <span className="door-opening" aria-hidden="true" />
          <img className="room-door-panel" src={centerPanel} alt="" />
        </Link>
      </div>
      <div className="room-door room-door-right">
        <Link
          className="room-door-link"
          to="/pre-witch"
          aria-label="Explore The Blair Witch Project"
        >
          <span className="door-opening" aria-hidden="true" />
          <img className="room-door-panel" src={rightDoor} alt="" />
        </Link>
      </div>
    </div>
  </main>
)

export default ThreeDoors
