import "../pre-mall.css"
import { Link } from "react-router-dom"
import doorClosed from "../assets/doorclosed.png"
import doorOpen from "../assets/three-doors-center-open-static-frame.png"
import kanepixels from "../assets/kane parsons.jpeg"
import valleyMall from "../assets/valley-mall.jpeg"
import viewOutside from "../assets/view-outside.jpg"
import eldestView from "../assets/eldest-view.jpeg"

export default function PreMall() {
  return (
    <main className="pre-mall-page">
      <section className="pre-mall-section pre-mall-intro">
        <img className="topphoto" src={valleyMall} alt="Valley View Center" />
        <div className="pre-mall-intro-copy">
          <h1>Valley View Center</h1>
          <h2>Demolished in 2023</h2>
        </div>
        <p>The Valley View Center was a shopping mall located in the United States. It was demolished in 2023 after years of decline. <br /> This mall is known for serving as the setting for one of director Kane Parsons's YouTube series. Parsons is known for pioneering the “liminal spaces” genre, and some would say that his success with the series eventually led to his 2026 film, Backrooms.</p>
      </section>

      <section className="pre-mall-section">
        <h3 className="pre-mall-section-title">Photos</h3>
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
        </div>
      </section>

      <div className="pre-mall-video-row">
        <section className="pre-mall-section">
          <h3 className="pre-mall-section-title">Video</h3>
          <div className="pre-mall-video">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/hTw936FtnBc?si=9KxpGwxENusNMDqU"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </section>
        <div className="pre-mall-next">
          <Link
            className="door-link"
            to="/3d"
            aria-label="Enter the mall"
            style={{ '--tilt': '-1.5deg' }}
          >
            <span className="door-label">Enter the mall</span>
            <span className="door-stage">
              <img className="door-closed" src={doorClosed} alt="Closed door to the mall" />
              <img className="door-open" src={doorOpen} alt="" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </main>
  )
}