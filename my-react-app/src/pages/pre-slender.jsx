import "../pre-slender.css"
import { Link } from "react-router-dom"
import doorClosed from "../assets/doorclosed.png"
import doorOpen from "../assets/three-doors-center-open-static-frame.png"
import slenderman from "../assets/slenderman.webp"
import slenderHeadshot from "../assets/Slender headhot.png"

export default function PreSlender() {
  return (
    <main className="pre-mall-page">
      <section className="pre-mall-section pre-mall-intro pre-mall-intro-plain">
        <div className="pre-mall-intro-copy">
          <h1>Slender Man</h1>
          <h2>Created in 2009</h2>
        </div>
        <p>
          Slender Man is a fictional supernatural character that originated as an internet Creepypasta.
          <br />
          The character is depicted as a tall, faceless figure in a black suit, often associated with stalking,
          abduction, and psychological horror. This is the first Creepypasta to gain widespread non-internet
          attention, due to the stabbing incident involving two young girls in 2014.
        </p>
      </section>

      <section className="pre-mall-section">
        <h3 className="pre-mall-section-title">Photos and video</h3>
        <div className="pre-mall-media">
          <div className="pre-mall-photos">
            <figure className="pre-mall-photo-card">
              <img src={slenderman} alt="Slender Man" />
              <figcaption>Original edited photo of Slender Man</figcaption>
            </figure>
            <figure className="pre-mall-photo-card">
              <img src={slenderHeadshot} alt="USA Today article about Slender Man" />
              <figcaption>USA Today article on the stabbing incident</figcaption>
            </figure>
          </div>
          <div className="pre-mall-video">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/N1pOO3CHA24?si=uLyr2_BKOpwbJt_T"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <section className="pre-mall-next">
        <Link
          className="door-link"
          to="/slender-page"
          aria-label="Enter the Slender Man room"
          style={{ '--tilt': '1.2deg' }}
        >
          <span className="door-label">Enter the room</span>
          <span className="door-stage">
            <img className="door-closed" src={doorClosed} alt="Door to the Slender Man room" />
            <img className="door-open" src={doorOpen} alt="" aria-hidden="true" />
          </span>
        </Link>
      </section>
    </main>
  )
}