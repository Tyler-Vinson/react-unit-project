import doorClosed from '../assets/doorclosed.png'
import {Link} from 'react-router-dom'

const MainRoom = () => (
  <main className="main-room">
    <div id="text">
      <h1 id="text-title">The Abandoned Internet Museum</h1>
      <p id="credit">Designed by: Tyler Vinson and Germaine Reed</p>
      <p id="description">
        Explore the abandoned Valley View Mall in a first-person 3D experience.
      </p>
    </div>
    <Link
      className="door-link"
      to="/three-doors"
      aria-label="Open the museum door"
    >
      <span className="door-frame">
        <img className="door" src={doorClosed} alt="Closed museum door" />
      </span>
    </Link>
  </main>
)

export default MainRoom