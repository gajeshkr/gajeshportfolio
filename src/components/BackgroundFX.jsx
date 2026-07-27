// Purely decorative — a fixed layer behind all content that adds an
// animated gradient mesh, a faint dot-grid, and film-grain noise so the
// page doesn't read as flat black.
export default function BackgroundFX() {
  return (
    <div className="bg-fx" aria-hidden="true">
      <div className="bg-blob b1" />
      <div className="bg-blob b2" />
      <div className="bg-blob b3" />
      <div className="bg-grid" />
      <div className="bg-noise" />
    </div>
  )
}
