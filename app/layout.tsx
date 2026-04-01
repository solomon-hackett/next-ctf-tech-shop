import type { Metadata } from "next";
import NavBar from "@/app/ui/navbar";
import Footer from "@/app/ui/footer";
import { inter } from "@/app/ui/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Tech Haven",
    template: "%s | Tech Haven",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-full flex flex-col gap-20 bg-white`}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
