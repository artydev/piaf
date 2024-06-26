import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import Footer from "@/components/footer/footer";
import NoSsr from "@/components/NoSsr";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "¨PIAF",
  description: "Task Force IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <NoSsr>
          <div id="container">
            <Navbar />
            <div className="content">
              <Sidebar />
              <div className="main">
                {children}
              </div>
            </div>
            <Footer />
          </div>
        </NoSsr>
      </body>
    </html>
  );
}
