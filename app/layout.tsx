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
  openGraph: {
    title: "Aethel Flow - AI & Automation Solutions",
    description:
      "Streamline workflows with intelligent AI and automation solutions.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: [
      { url: "/circularLogo.png" }
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
