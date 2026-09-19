import { Link } from "react-router-dom";
import { org, navLinks } from "../../data/content";
import StitchDivider from "../ui/StitchDivider";

export default function Footer() {
  return (
    <footer className="bg-indigo-deep text-ivory mt-24">
      <div className="container-page pt-4">
        <StitchDivider color="text-marigold/60" />
      </div>
      <div className="container-page py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <p className="font-display text-xl font-semibold">{org.name}</p>
          <p className="mt-3 text-sm text-ivory/70 leading-relaxed">{org.shortDesc}</p>
        </div>

        <div>
          <p className="eyebrow !text-marigold-light mb-3">Navigate</p>
          <ul className="space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-ivory/75 hover:text-marigold-light transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow !text-marigold-light mb-3">Get Involved</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/get-involved#volunteer" className="text-ivory/75 hover:text-marigold-light transition-colors">Volunteer</Link></li>
            <li><Link to="/get-involved#partner" className="text-ivory/75 hover:text-marigold-light transition-colors">Partner with Us</Link></li>
            <li><Link to="/get-involved#fundraise" className="text-ivory/75 hover:text-marigold-light transition-colors">Fundraise</Link></li>
            <li><Link to="/donate" className="text-ivory/75 hover:text-marigold-light transition-colors">Donate</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow !text-marigold-light mb-3">Reach Us</p>
          <ul className="space-y-2 text-sm text-ivory/75">
            <li>{org.address}</li>
            <li><a href={`tel:${org.phone}`} className="hover:text-marigold-light transition-colors">{org.phone}</a></li>
            <li><a href={`mailto:${org.email}`} className="hover:text-marigold-light transition-colors">{org.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="container-page py-5 border-t border-ivory/10 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-ivory/50">
        <p>© {new Date().getFullYear()} {org.name}. All rights reserved.</p>
        <p>Registered NGO · 12A &amp; 80G certified</p>
      </div>
    </footer>
  );
}
