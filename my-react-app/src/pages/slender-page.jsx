import "../slender-page.css"

const SKETCHFAB_MODEL_UID = '0d250c25826d4286bcee8dd8faf3c472'

export default function SlenderPage() {
  return (
    <main className="slender-page">
      <h1>3D Recreation of Slender Man</h1>
      <h2>Created by The Lister on Sketchfab</h2>
      <section className="slender-model" aria-labelledby="slender-model-heading">
        <h2 id="slender-model-heading">Explore the 3D model</h2>
        <div className="slender-model-frame">
          <iframe
            title="Slender Man (Slender The Arrival) 3D model"
            src={`https://sketchfab.com/models/${SKETCHFAB_MODEL_UID}/embed`}
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
          />
        </div>
      </section>
    </main>
  )
}