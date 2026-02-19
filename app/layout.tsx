import "./globals.css";

import type { Metadata } from "next";
import { Noto_Nastaliq_Urdu } from "next/font/google";

const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic", "latin"],
  variable: "--font-urdu",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rekhta Main Fikr",
  description: "قرآن کی آیات پر اردو میں خیالات",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ur" className={notoNastaliq.variable}>
      <body className="min-h-screen bg-stone-50 text-stone-900 antialiased">
        {children}
      </body>
    </html>
  );
}
