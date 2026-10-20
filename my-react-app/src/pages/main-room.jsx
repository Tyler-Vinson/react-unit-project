import { Link } from 'react-router-dom'
import doorClosed from '../assets/doorclosed.png'
import doorOpen from '../assets/three-doors-center-open-static-frame.png'

const MainRoom = () => (
  <main className="main-room">
    <div id="text">
      <h1 id="text-title">The Abandoned Internet Museum</h1>
      <p id="credit">Designed by Tyler Vinson and Germaine Reed</p>
      <p id="description">
        Step into a virtual museum showcasing important moments in internet horror history, both known and unknown.
      </p>
    </div>
    <Link
      className="door-link"
      to="/three-doors"
      aria-label="Open the museum door"
      style={{ '--tilt': '1.5deg' }}
    >
      <span className="door-stage">
        <img className="door-closed" src={doorClosed} alt="Closed museum door" />
        <img className="door-open" src={doorOpen} alt="" aria-hidden="true" />
      </span>
    </Link>
  </main>
)

export default MainRoom