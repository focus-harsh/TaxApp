"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center shadow-inner">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">Your Tax Calculator</span>
          </Link>
          {!isHome && (
            <span className="hidden sm:inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20">
              FY 2025-26 UPDATED
            </span>
          )}
        </div>

        {/* Center: Nav Links (Only on Home) */}
        {isHome && (
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">How It Works</Link>
            <Link href="#regimes" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Tax Regimes</Link>
            <Link href="#calculator" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Savings Calculator</Link>
            <Link href="#resources" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Resources</Link>
            <Link href="#about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">About Us</Link>
          </nav>
        )}

        {/* Right: CTA or Save & Exit */}
        <div className="flex items-center space-x-4">
          {isHome ? (
            <Link href="/wizard" className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all">
              Start Free Calculation
            </Link>
          ) : (
            <button className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors px-4 py-2 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200">
              Save & Exit
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
