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
    <footer className="w-full mt-24">
      {/* Full width ultra-glass container */}
      <div
        className="w-full rounded-none p-12 text-white relative overflow-hidden"
        style={{
          WebkitBackdropFilter: "blur(22px) saturate(200%)",
          backdropFilter: "blur(22px) saturate(200%)",
        }}
      >
        {/* Full-width glass gradient background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              "black",
            borderTop: "1px solid rgba(255, 255, 255, 0.18)",
            boxShadow: "0 -10px 40px rgba(0, 0, 0, 0.7) inset",
          }}
        />

        {/* Content center */}
        <div className="max-w-6xl mx-auto text-center space-y-6">
          {/* Company Name */}
          <p className="text-sm font-medium tracking-wide">
            © {currentYear} Aethel Flow Solutions Pvt. Ltd. All Rights Reserved.
          </p>

          {/* Address */}
          <address className="text-sm text-gray-300 not-italic leading-normal">
            9-4-136/19,20 &amp; 21/A, Shareef Residency 3rd Floor, 7 Tombs Road,
            Tolichowki, <br />
            Hyderabad, Telangana
          </address>

          {/* Contact Info */}
          <div className="text-sm text-gray-300 space-y-1">
            <p>
              Email:{" "}
              <a
                href="mailto:contact@aethelflow.com"
                className="hover:text-blue-400 transition-colors underline-offset-2 hover:underline"
              >
                contact@aethelflow.com
              </a>
            </p>

            <p>
              Phone:{" "}
              <a href="tel:+919022511316" className="hover:text-blue-400">
                +91 9022511316
              </a>{" "}
              /{" "}
              <a href="tel:+918328901076" className="hover:text-blue-400">
                +91 8328901076
              </a>
            </p>
          </div>

          {/* Social Icons */}
          <nav aria-label="Social media links" className="pt-2">
            <ul className="flex justify-center gap-8 text-2xl">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${link.label}`}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
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
