import { Bitcount_Grid_Double_Ink, Oswald, Inter } from "next/font/google";

export const bitcount = Bitcount_Grid_Double_Ink({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-bitcount",
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
