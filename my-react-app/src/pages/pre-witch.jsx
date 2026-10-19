import "./../pre-slender.css"
import { Link } from "react-router-dom"
import doorClosed from "../assets/doorclosed.png"
import blairLogo from "../assets/blair logo.jpeg"
import witchTotem from "../assets/witch totem.jpeg"

export default function PreWitch() {
  return (
    <main className="pre-mall-page">
      <section className="pre-mall-intro">
        <div className="pre-mall-intro-copy">
          <h1>The Blair Witch Project</h1>
          <h2>Released in 1999</h2>
        </div>
        <p>
          The Blair Witch Project is a 1999 American supernatural horror film that popularized the Blair Witch
          legend.
          <br />
          It is also the first found-footage horror film to gain widespread attention, which led to the creation
          of the found footage genre in horror cinema.
        </p>
      </section>
      <div className="pre-mall-photos">
        <figure className="pre-mall-photo-card">
          <img src={blairLogo} alt="The Blair Witch" />
          <figcaption>Photo of the Witch</figcaption>
        </figure>
        <figure className="pre-mall-photo-card">
          <img src={witchTotem} alt="Blair Witch totem" />
          <figcaption>Article on the Witch phenomenon</figcaption>
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
      <div className="pre-mall-door-links">
        <Link
          className="pre-mall-door-link"
          to="/model-showcase"
          aria-label="Explore the model"
        >
          <span className="door-frame">
            <img className="door" src={doorClosed} alt="Door to the model showcase" />
          </span>
          <span className="pre-mall-door-label">Explore the model</span>
        </Link>
      </div>
    </main>
  )
}
