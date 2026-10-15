import { Link } from 'react-router-dom'
import doorClosed from '../assets/doorclosed.png'
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
        {/* Replace this placeholder destination when the left door's room is ready. */}
        <Link
          className="room-door-link"
          to="/pages/pre-mall"
          aria-label="Left door destination placeholder"
        >
          <span className="door-opening" aria-hidden="true" />
          <img className="room-door-panel" src={leftDoor} alt="" />
        </Link>
      </div>
      <div className="room-door room-door-center">
        {/* Replace this placeholder destination when the center door's room is ready. */}
        <Link
          className="room-door-link"
          to="/pages/pre-slender"
          aria-label="Center door destination placeholder"
        >
          <span className="door-opening" aria-hidden="true" />
          <img className="room-door-panel" src={centerPanel} alt="" />
        </Link>
      </div>
      <div className="room-door room-door-right">
        {/* Replace this placeholder destination when the right door's room is ready. */}
        <Link
          className="room-door-link"
          to="/pages/pre-witch"
          aria-label="Right door destination placeholder"
        >
          <span className="door-opening" aria-hidden="true" />
          <img className="room-door-panel" src={rightDoor} alt="" />
        </Link>
      </div>
    </div>
    <Link className="exit-door-link" to="/" aria-label="Return to the front page">
      <img className="exit-door" src={doorClosed} alt="Exit door" />
    </Link>
  </main>
)

export default ThreeDoors
