import useScrollReveal from "../hooks/useScrollReveal.js";

export default function Contact() {
  const ref = useScrollReveal();

  return (
    <section id="contact" className="contact animate" ref={ref}>
      <div className="container">
        <div className="contact-content">
          <div className="contact-left">
            <h2>Get in touch</h2>

            <p>
              Let's work together. Submit your details in this form and I
              will get back to you ASAP.
            </p>
          </div>

          <div className="contact-right">
            <form>
              <input type="text" placeholder="Name" />

              <input type="email" placeholder="Email address" />

              <input type="text" placeholder="Budget (optional)" />

              <textarea placeholder="Describe your project..."></textarea>

              <button type="submit">Send inquiry</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
