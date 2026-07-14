import useScrollReveal from "../hooks/useScrollReveal.js";

export default function About() {
  const ref = useScrollReveal();

  return (
    <section id="about" className="about animate" ref={ref}>
      <div className="container">
        <div className="about-content">
          <div className="about-left">
            <h2>I can help.</h2>
          </div>

          <div className="about-right">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis
              cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
              commodo diam libero vitae erat. Aenean faucibus nibh et justo
              cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
              tristique posuere.
            </p>

            <div className="skills">
              <div className="skill web">
                <span>WEB DESIGN</span>
              </div>

              <div className="skill responsive">
                <span>RESPONSIVE DESIGN</span>
              </div>

              <div className="skill ui">
                <span>UI DESIGN</span>
              </div>

              <div className="skill mobile">
                <span>MOBILE APPS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
