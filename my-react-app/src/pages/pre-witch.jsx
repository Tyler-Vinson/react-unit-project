import "./../pre-slender.css";
import { Link } from "react-router-dom";
import doorClosed from "../assets/doorclosed.png";
import doorOpen from "../assets/three-doors-center-open-static-frame.png";
import blairLogo from "../assets/blair logo.jpeg";
import witchTotem from "../assets/witch totem.jpeg";

export default function PreWitch() {
  return (
    <main className="pre-mall-page">
      <section className="pre-mall-section pre-mall-intro pre-mall-intro-plain">
        <div className="pre-mall-intro-copy">
          <h1>The Blair Witch Project</h1>
          <h2>Released in 1999</h2>
        </div>
        <p>
          The Blair Witch Project is a 1999 American supernatural horror film
          that popularized the Blair Witch legend.
          <br />
          It is also the first found-footage horror film to gain widespread
          attention, which led to the creation of the found footage genre in
          horror cinema.
        </p>
      </section>

      <section className="pre-mall-section">
        <h3 className="pre-mall-section-title">Photos and video</h3>
        <div className="pre-mall-media">
          <div className="pre-mall-photos">
            <figure className="pre-mall-photo-card">
              <img src={blairLogo} alt="The Blair Witch" />
              <figcaption>Photo of the Witch</figcaption>
            </figure>
            <figure className="pre-mall-photo-card">
              <img src={witchTotem} alt="Blair Witch totem" />
              <figcaption>Article on the Witch phenomenon</figcaption>
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
          to="/witch-page"
          aria-label="Enter the Blair Witch room"
          style={{ "--tilt": "-2deg" }}
        >
          <span className="door-label">Enter the room</span>
          <span className="door-stage">
            <img
              className="door-closed"
              src={doorClosed}
              alt="Door to the Blair Witch room"
            />
            <img
              className="door-open"
              src={doorOpen}
              alt=""
              aria-hidden="true"
            />
          </span>
        </Link>
      </section>
    </main>
  );
}
