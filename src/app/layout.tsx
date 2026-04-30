import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import { LocaleProvider } from "./components/LocaleProvider";
import SiteHeader from "./components/SiteHeader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export const metadata: Metadata = {
  title: "John-Kristian G. Ruud - Portfolio",
  description: "John-Kristian G. Ruud - Frontend utvikler og grafisk designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <LocaleProvider>
          <SiteHeader />
          {children}
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
