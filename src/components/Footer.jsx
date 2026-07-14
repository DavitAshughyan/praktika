const socials = [
  { name: "Email", icon: "mail.png" },
  { name: "Facebook", icon: "facebook.png" },
  { name: "Twitter", icon: "twitter.png" },
  { name: "Behance", icon: "behance.png" },
  { name: "Dribbble", icon: "dribbble.png" },
  { name: "Instagram", icon: "instagram.png" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="copyright">John Smith</div>

          <div className="socials">
            {socials.map((social) => (
              <a href="#" key={social.name}>
                <img src={`/img/${social.icon}`} alt={social.name} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
