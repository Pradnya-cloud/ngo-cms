import { Link } from 'react-router-dom';

const footerLinks = {
  about: [
    { label: 'Our Story', path: '/about' },
    { label: 'Mission & Values', path: '/about#values' },
    { label: 'Leadership', path: '/about#leadership' },
    { label: 'Annual Reports', path: '/media#reports' },
    { label: 'Careers', path: '/get-involved#careers' },
  ],
  programs: [
    { label: 'Education', path: '/our-work#education' },
    { label: 'Healthcare', path: '/our-work#healthcare' },
    { label: 'Environment', path: '/our-work#environment' },
    { label: 'Community Development', path: '/our-work#community' },
    { label: 'Emergency Relief', path: '/our-work#relief' },
  ],
  getInvolved: [
    { label: 'Volunteer', path: '/get-involved#volunteer' },
    { label: 'Donate', path: '/donate' },
    { label: 'Fundraise', path: '/get-involved#fundraise' },
    { label: 'Corporate Partnerships', path: '/get-involved#partnerships' },
    { label: 'Advocacy', path: '/get-involved#advocacy' },
  ],
  connect: [
    { label: 'Contact Us', path: '/contact' },
    { label: 'Newsletter', path: '/contact#newsletter' },
    { label: 'Press & Media', path: '/media' },
    { label: 'FAQ', path: '/contact#faq' },
    { label: 'Privacy Policy', path: '/privacy' },
  ],
};

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )},
  { name: 'Twitter', href: 'https://twitter.com', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
    </svg>
  )},
  { name: 'Instagram', href: 'https://instagram.com', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )},
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )},
  { name: 'YouTube', href: 'https://youtube.com', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )},
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-ivory" role="contentinfo">
      <div className="container-page mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-heading text-2xl font-bold text-ivory mb-6" aria-label="S.P.R.I.N.T. Home">
              <svg className="w-8 h-8 text-madder" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M16 2L4 8v16l12 6 12-6V8L16 2zm0 2.5L25.5 9 16 14.5 6.5 9 16 4.5zM6 10.5l9 4.5v11l-9-4.5V10.5zm11 15.5v-11l9-4.5v11l-9 4.5z"/>
              </svg>
              <span>S.P.R.I.N.T.</span>
            </Link>
            <p className="text-ivory/70 max-w-xs text-base leading-relaxed mb-6">
              Empowering communities through sustainable development, education, and healthcare initiatives worldwide.
            </p>
            <div className="flex gap-4" role="list" aria-label="Social media links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-ivory/70 hover:text-ivory ${social.name === 'YouTube' && 'hover:text-red-400'}`}
                  aria-label={social.name}
                  role="listitem"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <nav aria-labelledby="footer-about-heading">
            <h3 id="footer-about-heading" className="font-heading text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.about.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-ivory/70 hover:text-madder transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-programs-heading">
            <h3 id="footer-programs-heading" className="font-heading text-lg font-semibold mb-4">Our Work</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.programs.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-ivory/70 hover:text-madder transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-involved-heading">
            <h3 id="footer-involved-heading" className="font-heading text-lg font-semibold mb-4">Get Involved</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.getInvolved.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-ivory/70 hover:text-madder transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-connect-heading">
            <h3 id="footer-connect-heading" className="font-heading text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.connect.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-ivory/70 hover:text-madder transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 md:mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-ivory/50 text-sm">
              © {currentYear} S.P.R.I.N.T. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-ivory/50">
              <Link to="/privacy" className="hover:text-madder transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-madder transition-colors">Terms of Service</Link>
              <Link to="/accessibility" className="hover:text-madder transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;