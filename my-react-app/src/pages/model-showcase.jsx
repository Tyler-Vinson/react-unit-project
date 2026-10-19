import "../model-showcase.css"

// Replace these placeholders when the model details are finalized.
const MODEL_NAME = "Model name"
const MODEL_DESIGNER = "Designer name"
const MODEL_DESCRIPTION = "Add a description of this non-map model here."
const MODEL_EMBED_URL = ""

export default function ModelShowcase() {
  return (
    <main className="model-showcase">
      <section className="model-showcase-copy" aria-labelledby="model-showcase-title">
        <h1 id="model-showcase-title">{MODEL_NAME}</h1>
        <h3>Designed by {MODEL_DESIGNER}</h3>
        <p>{MODEL_DESCRIPTION}</p>
      </section>

      <section className="model-showcase-viewer" aria-labelledby="model-showcase-viewer-title">
        <h2 id="model-showcase-viewer-title">Explore the model</h2>
        {MODEL_EMBED_URL ? (
          <div className="model-showcase-frame">
            <iframe
              title={`${MODEL_NAME} interactive model`}
              src={MODEL_EMBED_URL}
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="model-showcase-placeholder" role="status">
            <p>The interactive model will appear here once its embed URL is added.</p>
          </div>
        )}
      </section>
    </main>
  )
}
