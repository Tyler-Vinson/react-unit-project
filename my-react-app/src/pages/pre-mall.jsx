import "../pre-mall.css"
import { Link } from "react-router-dom"
import kanepixels from "../assets/kane parsons.jpeg"
import valleyMall from "../assets/valley-mall.jpeg"
import viewOutside from "../assets/view-outside.jpg"
import eldestView from "../assets/eldest-view.jpeg"
import doorClosed from "../assets/doorclosed.png"


export default function PreMall() {
  return (
    <main className="pre-mall-page">
      <Link
        className="pre-mall-back-link"
        to="/three-doors"
        aria-label="Return to the three doors"
      >
        <img src={doorClosed} alt="Return to the three doors" />
      </Link>
      <section className="pre-mall-intro">
        <img className="topphoto" src={valleyMall} alt="Valley View Center" />
        <div className="pre-mall-intro-copy">
          <h1>Valley View Center</h1>
          <h2>Demolished in 2023</h2>
        </div>
        <p>The Valley View Center was a shopping mall located in the United States. It was demolished in 2023 after years of decline. <br /> This mall is known for serving as the setting for one of director Kane Parsons's YouTube series. Parsons is known for pioneering the “liminal spaces” genre, and some would say that his success with the series eventually led to his 2026 film, Backrooms.</p>
      </section>
      <div className="pre-mall-photos">
        <figure className="pre-mall-photo-card">
          <img src={kanepixels} alt="Kane Parsons" />
          <figcaption>Photo of Kane Parsons</figcaption>
        </figure>
        <figure className="pre-mall-photo-card">
          <img src={viewOutside} alt="Valley View Center entrance" />
          <figcaption>Photo of Valley View Center entrance</figcaption>
        </figure>
        <figure className="pre-mall-photo-card">
          <img src={eldestView} alt="Valley View Center" />
          <figcaption>The Rolling Giant from Kane Parsons&apos;s <em>The Oldest View</em></figcaption>
        </figure>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/hTw936FtnBc?si=9KxpGwxENusNMDqU"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

      </div>
      <Link
        className="pre-mall-door-link"
        to="/3d"
        aria-label="Enter the mall"
      >
        <span className="door-frame">
          <img className="door" src={doorClosed} alt="Closed door to the mall" />
        </span>
        <span className="pre-mall-door-label">Enter the mall</span>
      </Link>
    </main>

  )
}
