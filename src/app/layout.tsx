import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "QuietWorld — A subscription for what comes next.",
  description:
    "End-of-life insurance, rebuilt as one simple $25/month subscription. Funeral, legal, debt, and transportation — all included, so your family never has to plan a funeral on the worst week of their life.",
  openGraph: {
    title: "QuietWorld — $25 a month. For what comes next.",
    description:
      "End-of-life insurance, rebuilt as one simple subscription. Funeral, legal, debt, transportation — all included.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} h-full`}
    >
      <body className="min-h-full">
        {children}
        {/* Lottie web component player (free, no API key required) */}
        <Script
          src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js"
          type="module"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
