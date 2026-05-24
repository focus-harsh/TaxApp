import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Tax Calculator | FY 2025-26",
  description: "The simplest and most trustworthy Indian income tax calculator for salaried employees. Compare Old vs New regimes instantly.",
  openGraph: {
    title: "Your Tax Calculator",
    description: "Find out which tax regime saves you more money in 2 minutes.",
    url: "https://yourtaxcalculator.in",
    siteName: "Your Tax Calculator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('your-tax-calculator-theme');
                  let isDark = false;
                  if (stored) {
                    const parsed = JSON.parse(stored);
                    if (parsed && parsed.state) {
                      const theme = parsed.state.theme;
                      if (theme === 'dark') {
                        isDark = true;
                      }
                    }
                  } else {
                    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  }
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (_) {}
              })();
            `
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans transition-colors duration-300 dark:bg-[#0b0f19] dark:text-[#f8fafc]">
        <Header />
        <div className="flex-grow flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
