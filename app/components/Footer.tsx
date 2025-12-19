import Link from "next/link";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const SOCIAL_LINKS: SocialLink[] = [
  { href: "https://linkedin.com", label: "LinkedIn", icon: <FaLinkedin /> },
  { href: "https://twitter.com", label: "Twitter", icon: <FaTwitter /> },
  { href: "https://facebook.com", label: "Facebook", icon: <FaFacebook /> },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-24 mb-5 px-4 md:px-6 bg-white">
      <div
        className="relative overflow-hidden rounded-[30px] py-12 px-6 md:px-10 text-white max-w-11xl mx-auto"
        style={{ backgroundColor: "#1B1A1A" }}
      >
        {/* overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/30 backdrop-blur-[1.5px] rounded-[30px]"
        />

        {/* content */}
        <div className="relative z-10 text-center space-y-6">
          <p className="text-sm font-large tracking-wide">
            © {currentYear} Aethel Flow Solutions Pvt. Ltd. All Rights Reserved.
          </p>

          <address className="text-sm text-gray-300 not-italic leading-relaxed">
            9-4-136/19,20 &amp; 21/A, Shareef Residency 3rd Floor,
            <br />
            7 Tombs Road, Tolichowki, Hyderabad, Telangana
          </address>

          <div className="text-sm text-gray-300 space-y-1">
            <p>
              Email:{" "}
              <a
                href="mailto:contact@aethelflow.com"
                className="hover:text-white transition underline-offset-4 hover:underline"
              >
                contact@aethelflow.com
              </a>
            </p>

            <p>
              Phone:{" "}
              <a href="tel:+917416656592" className="hover:text-white">
                +91 7416656592
              </a>
            </p>
          </div>

          <nav aria-label="Social media links" className="pt-4">
            <ul className="flex justify-center gap-8 text-2xl">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${link.label}`}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
