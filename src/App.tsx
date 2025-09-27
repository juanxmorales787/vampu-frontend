import React from "react";
import "./styles.css";

// Auto-import all files under src/assets/cats as URLs
const cats = Object.values(
  import.meta.glob("./assets/cats/*", { eager: true, as: "url" })
) as string[];

export default function App() {
  return (
    <div className="page">
      <header className="header">
        <h1>🐱 VamPU</h1>
        <p className="badge">🚧 Site under development — minting disabled for now</p>
      </header>

      <section className="gallery">
        {cats.length === 0 && (
          <p className="empty">
            No cat images found in <code>src/assets/cats</code>.
          </p>
        )}
        {cats.map((src, i) => (
          <figure
            className="card bounce"
            style={{ animationDelay: `${(i % 10) * 0.1}s` }}
            key={src}
          >
            <img src={src} alt={`cat-${i}`} loading="lazy" />
          </figure>
        ))}
      </section>

      <footer className="footer">
        <small>© {new Date().getFullYear()} VamPU — All purrs reserved.</small>
      </footer>
    </div>
  );
}

