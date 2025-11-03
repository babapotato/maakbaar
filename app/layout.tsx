import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marie & Max — Portfolio",
  description: "Clean, minimal portfolio of Marie & Max. Work, bios, and contact.",
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


