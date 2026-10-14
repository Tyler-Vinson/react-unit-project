import { Link } from 'react-router-dom'

const MainRoom = () => (
  <main>
    <div id="text">
      <h1 id="text-title">The Abandoned Internet Museum</h1>
      <p id="credit">Designed by: Tyler Vinson and Germaine Reed</p>
      <p id="description">
        Explore the abandoned Valley View Mall in a first-person 3D experience.
      </p>
      <Link className="mall-entry-link" to="/3d">
        Enter the mall
      </Link>
    </div>
  </main>
)

export default MainRoom