import React from 'react';

interface FooterLink {
  href: string;
  label: string;
  icon: string;
}

const links: FooterLink[] = [
  {
    href: 'https://www.linkedin.com/in/syedmustafa177/',
    label: 'LinkedIn',
    icon: '/linknedin.svg',
  },
  {
    href: 'https://github.com/Syedmustafa177',
    label: 'GitHub',
    icon: '/github.svg',
  },
  {
    href: 'https://x.com/syedmustafa177',
    label: 'X (Twitter)',
    icon: '/x.com.svg',
  },
  {
    href: 'https://syedmustafa177.github.io/Portfolio-website/',
    label: 'Portfolio',
    icon: '/portfolio.svg',
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-links">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                <img src={link.icon} alt={link.label} className="footer-link-icon" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} Syed Mustafa. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;