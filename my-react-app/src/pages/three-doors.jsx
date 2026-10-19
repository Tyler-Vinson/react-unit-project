import { useState } from 'react'
import { Link } from 'react-router-dom'
import doorClosed from '../assets/doorclosed.png'
import leftDoor from '../assets/door-left-reference.png'
import centerPanel from '../assets/door-center-panel.png'
import rightDoor from '../assets/door-right-reference.png'
import roomImage from '../assets/room-without-pillars.png'
import closedLeftDoor from '../assets/three-doors-left-closed.png'
import openLeftDoor from '../assets/three-doors-left-open.png'
import closedRightDoor from '../assets/three-doors-right-closed.png'
import openRightDoor from '../assets/three-doors-right-open.png'

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
    <Link className="exit-door-link" to="/" aria-label="Return to the front page">
      <img className="exit-door" src={doorClosed} alt="Exit door" />
    </Link>
  </main>
)

export default ThreeDoors
