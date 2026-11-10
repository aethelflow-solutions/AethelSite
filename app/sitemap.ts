import type { MetadataRoute } from "next";

const BASE_URL = "https://aethelflow.com";

/**
 * Hreflang alternates targeting main Gulf (GCC) countries, India, and global English
 * - en-AE: United Arab Emirates (Dubai, Abu Dhabi)
 * - en-SA: Saudi Arabia (Riyadh, Jeddah)
 * - en-QA: Qatar (Doha)
 * - en-KW: Kuwait (Kuwait City)
 * - en-BH: Bahrain (Manama)
 * - en-OM: Oman (Muscat)
 */
function buildRegionalAlternates(path: string = "") {
  const fullUrl = `${BASE_URL}${path}`;
  return {
    languages: {
      "x-default": fullUrl,
      "en-US": fullUrl,
      "en-IN": fullUrl,
      "en-AE": fullUrl,
      "en-SA": fullUrl,
      "en-QA": fullUrl,
      "en-KW": fullUrl,
      "en-BH": fullUrl,
      "en-OM": fullUrl,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: buildRegionalAlternates(""),
    },
    {
      url: `${BASE_URL}/features`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: buildRegionalAlternates("/features"),
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: buildRegionalAlternates("/about"),
    },
  ];
}
