import Link from "next/link";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: <FaLinkedin />,
  },
  {
    href: "https://twitter.com",
    label: "Twitter",
    icon: <FaTwitter />,
  },
  {
    href: "https://facebook.com",
    label: "Facebook",
    icon: <FaFacebook />,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
      role="contentinfo"
    >
      <div className="text-black py-10 px-6 max-w-4xl mx-auto">
        {/* Divider Line */}
        <hr className="w-full border-t border-gray-300 mb-6" />

        <div className="text-center space-y-4">
          {/* Company Name + Rights */}
          <p className="text-sm font-medium">
            © {currentYear} Aethel Flow Solutions Pvt. Ltd. All Rights Reserved.
          </p>

          {/* Address */}
          <address className="text-sm text-gray-600 not-italic">
            9-4-136/19,20 &amp; 21/A, Shareef Residency 3rd floor, 7 tombs Road,
            <br />
            Tolichowki, Hyderabad, Telangana
          </address>

          {/* Contact Info */}
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              Email:{" "}
              <a
                href="mailto:contact@aethelflow.com"
                className="hover:text-blue-600 transition-colors underline-offset-2 hover:underline"
              >
                contact@aethelflow.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a
                href="tel:+919022511316"
                className="hover:text-blue-600 transition-colors"
              >
                +91 9022511316
              </a>
              {" / "}
              <a
                href="tel:+918328901076"
                className="hover:text-blue-600 transition-colors"
              >
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
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
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
