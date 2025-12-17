import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { CssBaseline } from "@mui/material";
import ThemeRegistry from "./themeRegistry";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Aethel Flow - AI & Automation Solutions",
    template: "%s | Aethel Flow",
  },
  description:
    "Aethel Flow harnesses AI and automation to streamline workflows, spark innovation, and empower businesses with seamless, intelligent solutions.",
  keywords: ["AI", "automation", "workflow", "digital transformation", "RPA"],
  authors: [{ name: "Aethel Flow Solutions Pvt. Ltd." }],

  /** OPEN GRAPH (WhatsApp / LinkedIn / Facebook) */
  openGraph: {
    title: "Aethel Flow - AI & Automation Solutions",
    description:
      "Streamline workflows with intelligent AI and automation solutions.",
    url: "https://aethelflow.com",
    siteName: "Aethel Flow",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://aethelflow.com/og-image.png", // MUST be absolute
        width: 1200,
        height: 630,
        alt: "Aethel Flow - AI & Automation Solutions",
      },
    ],
  },

  /** TWITTER (good practice, same image) */
  twitter: {
    card: "summary_large_image",
    title: "Aethel Flow - AI & Automation Solutions",
    description:
      "Streamline workflows with intelligent AI and automation solutions.",
    images: ["https://aethelflow.com/og-image.png"],
  },

  /** FAVICONS (browser only) */
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      {
        url: "/apple-touch-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#692ac8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased">
        <ThemeRegistry>
          <CssBaseline />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
