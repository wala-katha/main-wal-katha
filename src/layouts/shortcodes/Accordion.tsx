import React, { useState, useId } from "react";

const Accordion = ({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const [show, setShow] = useState(false);
  
  // ⚡ 👑 HYDRATION & SEO FIX: SSR සහ Client දෙකටම එකම ස්ථිර ID එකක් ලබාදීම
  const uniqueId = useId();

  return (
    <div 
      className={`mb-4 overflow-hidden rounded-xl border border-neutral-800/60 bg-[#0a0b0d]/80 transition-all duration-300 ${
        show ? "border-[#01AD9F]/40 shadow-lg shadow-[#01AD9F]/5" : ""
      } ${className || ""}`}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-[#F8F8FF] transition-all duration-200 hover:bg-neutral-800/30"
        onClick={() => setShow(!show)}
        aria-expanded={show}
        aria-controls={`accordion-panel-${uniqueId}`}
        id={`accordion-btn-${uniqueId}`}
      >
        {/* Title එක Dark Theme එකේ කැපී පෙනීමට සහ Highlight වීමට */}
        <span className={`text-[16px] tracking-wide transition-colors duration-200 ${show ? "text-[#01AD9F]" : "text-neutral-200"}`}>
          {title}
        </span>
        
        {/* Smooth Rotation Icon */}
        <svg
          className={`h-4 w-4 text-neutral-400 transition-transform duration-300 ${
            show ? "rotate-180 text-[#01AD9F]" : ""
          }`}
          viewBox="0 0 512 512"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M505.755,123.592c-8.341-8.341-21.824-8.341-30.165,0L256.005,343.176L36.421,123.592c-8.341-8.341-21.824-8.341-30.165,0 s-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251l234.667-234.667 C514.096,145.416,514.096,131.933,505.755,123.592z"
          ></path>
        </svg>
      </button>
      
      {/* 🧠 SMART SEO CRAWLING PANEL: වැසී තිබුණත් Google Bot එකට කියවිය හැකි පරිදි සකසා ඇත */}
      <div
        id={`accordion-panel-${uniqueId}`}
        role="region"
        aria-labelledby={`accordion-btn-${uniqueId}`}
        className={`transition-all duration-300 ease-in-out ${
          show 
            ? "max-h-[2000px] opacity-100 border-t border-neutral-800/40 px-5 py-4" 
            : "max-h-0 opacity-0 pointer-events-none overflow-hidden"
        }`}
      >
        <div className="prose prose-invert max-w-none text-[15px] leading-relaxed text-neutral-300 selection:bg-[#01AD9F]/30 selection:text-[#01AD9F]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
