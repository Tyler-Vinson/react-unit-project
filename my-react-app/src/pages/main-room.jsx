import { Link } from "react-router-dom";

const MainRoom = () => (
  <main>
    <div id="text">
      <h1 id="text-title">The Abandoned Internet Museum</h1>
      <p id="credit">Designed by: Tyler Vinson and Germaine Reed</p>
      <p id="description">Explore a curated collection of historical statue scans. Ranging from Michelangelo to Rodin.</p>
    </div>
    <Link to="/3d">
        <img className="button"src="assets/doorclosed.png" alt="photo of door closed"/>
    </Link>
    <Link to="/3d">
        <button type="button">Explore the Museum</button>
    </Link>
  </main>
    
)

export default MainRoom