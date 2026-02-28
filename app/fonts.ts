import localFont from "next/font/local";
import { Playfair_Display } from 'next/font/google';

export const satoshi = localFont({
  src: [
    { path: "../public/fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});