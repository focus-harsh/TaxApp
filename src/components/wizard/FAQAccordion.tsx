"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    question: "Which tax regime should I choose?",
    answer: "Our calculator automatically recommends the best regime for you based on the 'You Save' amount. Generally, if you have low investments (under ₹1.5L), the New Regime is better due to lower tax rates. If you have significant investments, home loan interest, and HRA, the Old Regime might save you more."
  },
  {
    question: "Are these calculations accurate for FY 2025-26?",
    answer: "Yes, all calculations are strictly based on the latest Union Budget announcements for Financial Year 2025-26 (Assessment Year 2026-27), including the revised standard deduction of ₹75,000 in the New Regime."
  },
  {
    question: "Can I switch regimes next year?",
    answer: "Yes, salaried individuals can switch between the Old and New tax regimes every year. You are not locked into your choice."
  },
  {
    question: "Is my financial data safe?",
    answer: "100% safe. This calculator runs entirely in your browser. We do not store, track, or share any of your salary or personal details."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-16 pt-12 border-t border-slate-200">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900">Common Doubts</h3>
      </div>
      
      <div className="space-y-4">
        {FAQS.map((faq, index) => (
          <div 
            key={index} 
            className={`border rounded-2xl transition-all duration-300 overflow-hidden ${openIndex === index ? 'border-blue-200 bg-blue-50/30' : 'border-slate-200 bg-white hover:border-slate-300'}`}
          >
            <button 
              className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className={`font-semibold text-base ${openIndex === index ? 'text-blue-900' : 'text-slate-800'}`}>
                {faq.question}
              </span>
              <svg 
                className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-blue-500' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-blue-100/50 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
