import "../pre-slender.css"
import slenderman from '../assets/slenderman.webp'
import slenderHeadshot from '../assets/Slender headhot.png'
import { Link } from "react-router-dom"
import doorClosed from '../assets/doorclosed.png'

export default function PreSlender() {
  return (
    <>
      <div>
        <h1>Slender Man</h1>
        <h2>Created in 2009</h2>
        <p>Slender Man is a fictional supernatural character that originated as an internet Creepypasta <br /> The character is depicted as a tall, faceless figure in a black suit, often associated with stalking, abduction, and psychological horror. This is the first creepypasta to gain widespread non-internet attention, due to the stabbing incident involving two young girls in 2014.</p>
      </div>
      <div className="pre-slender-photos">
        <img src={slenderman} alt="Slender Man" 
        style={{ display: 'block', marginBottom: '8px' }}/>
        <p style={{ margin: 0 }}>Photo of Slender Man.</p>
        <img src={slenderHeadshot} alt="Slender Man" 
        style={{ display: 'block', marginBottom: '8px' }}/>
        <p style={{ margin: 0 }}>USA Today article on the stabbing incident.</p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/N1pOO3CHA24?si=uLyr2_BKOpwbJt_T"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
                <Link
          to="/slender-page"
          className="door-link"
          aria-label="Enter the Slender Man page"
        >
          <span className="door-frame">
            <img className="door" src={doorClosed} alt="Closed door to the Slender Man page" />
          </span>
        </Link>
        
      </div>
    </>
  )}