import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";
import content from "@/content.json";

export const metadata: Metadata = {
  title: `${content.personal.name} — ${content.personal.title}`,
  description: content.personal.bio,
  keywords: ["Backend Developer", "ML Engineer", "Portfolio", "Python", "FastAPI", "Machine Learning"],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: `${content.personal.name} — ${content.personal.title}`,
    description: content.personal.tagline,
    type: "website",
    siteName: `${content.personal.name} Portfolio`,
  },
  other: {
    "theme-color": "#050a07",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning>
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
        <BackToTop />
      </body>
    </html>
  );
}
