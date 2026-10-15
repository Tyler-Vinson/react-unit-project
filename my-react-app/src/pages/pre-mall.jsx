import "../pre-mall.css"
import { Link } from "react-router-dom"

export default function PreMall() {
  return (
    <>
      <div>
        <img src="../assets/valley-mall.jpeg" alt="Valley View Center" />
        <h1>Valley View Center</h1>
        <h2>Demolished in 2023</h2>
        <p>The Valley View Center was a shopping mall located in the United States. It was demolished in 2023 after years of decline. <br /> This mall is known for serving as the setting for one of director Kane Parsons’s YouTube series. Parsons is known for pioneering the “liminal spaces” genre, and some would say that his success with the series eventually led to his 2026 film, Backrooms.</p>
      </div>
      <div className="pre-mall-photos">
        <img src="../assets/pre-mall-photo1.jpg" alt="kane parsons" />
        <img src="../assets/view-outside.jpg" alt="Valley View Center entrance" />
        <img src="../assets/eldest-view.jpeg" alt="Valley View Center" />
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/hTw936FtnBc?si=9KxpGwxENusNMDqU"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

      </div>
      <div>
        <Link
          className="door-link"
          to="/three-doors"
          aria-label="Open the museum door"
        >
          <span className="door-frame">
            <img className="door" src="../assets/door-closed.jpg" alt="Closed museum door" />
          </span>
        </Link>
      </div>
    </>
  )
}