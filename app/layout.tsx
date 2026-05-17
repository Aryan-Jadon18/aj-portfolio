import type { Metadata, Viewport } from "next";
import { Chakra_Petch, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

const display = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});
const body = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aryan Singh Jadon — Mission Engineer · Software · Cloud · AI",
  description:
    "Aryan Singh Jadon — Software Engineer at Capgemini. Backend systems, automation, scalable architectures, Gen-AI integration. Portfolio in deep space.",
  metadataBase: new URL("https://aryanjadon.dev"),
  openGraph: {
    title: "Aryan Singh Jadon — Software Engineer",
    description: "Backend · Cloud · Gen-AI. Building scalable systems for the future.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Singh Jadon — Software Engineer",
    description: "Backend · Cloud · Gen-AI. Building scalable systems for the future.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000308",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${body.variable}`}>
      <body className="is-loading">{children}</body>
    </html>
  );
}
