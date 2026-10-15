import "../pre-mall.css"
import { Link } from "react-router-dom"
import kanepixels from "../assets/kane parsons.jpeg"
import valleyMall from "../assets/valley-mall.jpeg"
import viewOutside from "../assets/view-outside.jpg"
import eldestView from "../assets/eldest-view.jpeg"
import doorClosed from "../assets/doorclosed.png"

export default function PreMall() {
  return (
    <>
      <div>
        <img src={valleyMall} alt="Valley View Center" />
        <h1>Valley View Center</h1>
        <h2>Demolished in 2023</h2>
        <p>The Valley View Center was a shopping mall located in the United States. It was demolished in 2023 after years of decline. <br /> This mall is known for serving as the setting for one of director Kane Parsons’s YouTube series. Parsons is known for pioneering the “liminal spaces” genre, and some would say that his success with the series eventually led to his 2026 film, Backrooms.</p>
      </div>
      <div className="pre-mall-photos">
        <img src={kanepixels} alt="kane parsons" 
        style={{ display: 'block', marginBottom: '8px' }}/>
        <p style={{ margin: 0 }}>Photo of Kane Parsons</p>
        <img src={viewOutside} alt="Valley View Center entrance" 
        style={{ display: 'block', marginBottom: '8px' }}/>
        <p style={{ margin: 0 }}>Photo of Valley View Center entrance</p>
        <img src={eldestView} alt="Valley View Center" 
        style={{ display: 'block', marginBottom: '8px' }}/>
        <p style={{ margin: 0 }}>The Rolling giant from Kane Parsons’s The oldest view</p>
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
            <img className="door" src={doorClosed} alt="Closed museum door" />
          </span>
        </Link>
      </div>
    </>
  )
}