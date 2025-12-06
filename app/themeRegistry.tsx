"use client";

import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import { useState , type ReactNode} from "react";

interface ThemeRegistryProps {
  children: ReactNode;
}

export default function ThemeRegistry({ children } : ThemeRegistryProps ) {
  const [cache] = useState(() => createEmotionCache());

  return (
    <CacheProvider value={cache}>
      {children}
    </CacheProvider>
  );
}
