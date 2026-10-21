import "../slender-page.css"
import "../pre-mall.css"

const SKETCHFAB_MODEL_UID = 'd6b0f6b38d6943bbaffdd6572b9c6eb6'

export default function WitchPage() {
  return (
    <main className="slender-page witch-bg">
      <h1>3D Recreation of the Witch</h1>
      <h2>Created by myrthevdmeulen on Sketchfab</h2>
      <section className="slender-model" aria-labelledby="slender-model-heading">
        <h2 id="slender-model-heading">Explore the 3D model</h2>
        <div className="slender-model-frame">
          <iframe
            title="The Witch 3D model"
            src={`https://sketchfab.com/models/${SKETCHFAB_MODEL_UID}/embed`}
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
          />
        </div>
      </section>
    </main>
  )
}