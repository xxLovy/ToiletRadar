import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/layout/Header";
import MainFooter from "@/components/layout/MainFooter";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IBSLover - Find Your Comfort Zone',
  description: 'Find and share public toilets near you',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="h-full m-0 overflow-hidden bg-gray-50">
        <ReduxProvider>
          <Header />
          <main>
            {children}
          </main>
          <MainFooter />
        </ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
};

export default Layout;

