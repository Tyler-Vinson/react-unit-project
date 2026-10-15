import "../pre-mall.css"

export default function PreMall() {
  return (
    <>
      <div>
        <h1>Valley View Center</h1>
        <h2>Demolished in 2023</h2>
        <p>The Valley View Center was a shopping mall located in the United States. It was demolished in 2023 after years of decline. <br /> This mall is known for serving as the setting for one of director Kane Parsons’s YouTube series. Parsons is known for pioneering the “liminal spaces” genre, and some would say that his success with the series eventually led to his 2026 film, Backrooms.</p>
      </div>
      <div className="pre-mall-photos">
        <img src="../assets/pre-mall-photo1.jpg" alt="kane parsons" />
        <img src="../assets/pre-mall-photo2.jpg" alt="Valley View Center" />
        <img src="../assets/pre-mall-photo3.jpg" alt="Valley View Center" />
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/hTw936FtnBc?si=9KxpGwxENusNMDqU"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        
      </div>
    </>
  )}