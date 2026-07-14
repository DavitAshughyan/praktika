import useScrollReveal from "../hooks/useScrollReveal.js";

export default function Hero() {
  const ref = useScrollReveal();

  return (
    <section className="hero animate" ref={ref}>
      <div className="container">
        <div className="hero-content">
          <h1>
            I'm John.
            <br />
            I build beautiful responsive websites.
          </h1>
          <div className="hero-buttons">
            <a href="#" className="btn">
              View Portfolio
            </a>

            <a href="#" className="btn btn-outline">
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
