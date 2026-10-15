import "../pre-slender.css"
import { Link } from "react-router-dom"
import doorClosed from "../assets/doorclosed.png"

export default function PreSlender() {
  return (
    <main className="pre-mall-page">
      <Link className="pre-mall-back-link" to="/three-doors" aria-label="Return to the three doors">
        <img src={doorClosed} alt="Return to the three doors" />
      </Link>
      <section className="pre-mall-intro">
        <div className="pre-mall-intro-copy">
          <h1>Slender Man</h1>
          <h2>Created in 2009</h2>
        </div>
        <p>
          Slender Man is a fictional supernatural character that originated as an internet Creepypasta.
          <br />
          The character is depicted as a tall, faceless figure in a black suit, often associated with stalking,
          abduction, and psychological horror. This is the first creepypasta to gain widespread non-internet
          attention, due to the stabbing incident involving two young girls in 2014.
        </p>
      </section>
      <div className="pre-mall-photos">
        <figure className="pre-mall-photo-card">
          <img src="../assets/pre-slender-photo1.jpg" alt="Slender Man" />
          <figcaption>Photo of Slender Man</figcaption>
        </figure>
        <figure className="pre-mall-photo-card">
          <img src="../assets/pre-slender-photo2.jpg" alt="Slender Man" />
          <figcaption>USA Today article on the stabbing incident</figcaption>
        </figure>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/N1pOO3CHA24?si=uLyr2_BKOpwbJt_T"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <Link className="pre-mall-door-link" to="/three-doors" aria-label="Explore the mall">
        <span className="door-frame">
          <img className="door" src={doorClosed} alt="Explore the mall" />
        </span>
        <span className="pre-mall-door-label">Explore the mall</span>
      </Link>
    </main>
  )
}