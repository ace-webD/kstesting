import { Geist, Geist_Mono, Jomhuria } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Hero";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jomhuria = Jomhuria({
  variable: "--font-jomhuria",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kuruksastra'26",
  description: "",
  icons: {
    icon: "/favicon.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jomhuria.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
