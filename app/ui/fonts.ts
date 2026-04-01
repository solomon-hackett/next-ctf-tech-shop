import { Bitcount, Oswald, Inter } from "next/font/google";

export const bitcount = Bitcount({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-bitcount",
  fallback: ["monospace"],
});

export const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-oswald",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
});
