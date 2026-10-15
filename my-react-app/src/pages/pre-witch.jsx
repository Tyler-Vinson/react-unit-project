
export default function PreWitch() {
  return (
    <>
      <div>
        <h1>The Blair Witch Project</h1>
        <h2>Created in 1999</h2>
        <p>The Blair Witch project is a 1999 American supernatural horror film that popularized the Blair Witch legend.<br /> It is also the first found footage horror film to gain widespread attention. Which lead to the creation of the found footage genre in horror cinema.</p>
      </div>
      <div className="pre-witch-photos">
        <img src="../assets/pre-witch-photo1.jpg" alt="The Blair Witch" 
        style={{ display: 'block', marginBottom: '8px' }}/>
        <p style={{ margin: 0 }}>Photo of the Witch</p>
        <img src="../assets/pre-witch-photo2.jpg" alt="Witch" 
        style={{ display: 'block', marginBottom: '8px' }}/>
        <p style={{ margin: 0 }}>Article on the Witch phenomenon</p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/N1pOO3CHA24?si=uLyr2_BKOpwbJt_T"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        
      </div>
    </>
  )}