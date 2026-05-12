import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SciTOX Custom App Scaffold",
  description: "Draft V1 route scaffold. Public copy, claims, and owner data require review.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
