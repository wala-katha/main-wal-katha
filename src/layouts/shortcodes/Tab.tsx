import React, { useId } from "react";

interface TabProps {
  name: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean; // Parent Tabs එකෙන් මේ ටැබ් එක Active ද නැද්ද කියා දැනගැනීමට
}

function Tab({ name, children, className, isActive = true }: TabProps) {
  // SEO & Accessibility සඳහා ස්ථිර අද්විතීය ID එකක් සෑදීම
  const id = useId();

  return (
    <div
      data-name={name}
      id={`tabpanel-${id}`}
      role="tabpanel" // 🧠 SEO & ACCESSIBILITY: මේක ටැබ් පැනල් එකක් බව ගූගල් බොට්ස්ලාට ස්ථිරවම පවසයි
      aria-labelledby={`tab-${id}`}
      aria-hidden={!isActive} // Active නැති වෙලාවට Screen Readers වලට හඳුනාගැනීමට
      className={`w-full transition-all duration-300 ${
        isActive 
          ? "block opacity-100 min-h-[100px]" 
          : "hidden opacity-0 pointer-events-none" // Active නැති විට මිනිස්සුන්ට හංගා, ගූගල් බොට්ට කියවීමට පහසු කරයි
      } ${className || ""}`}
    >
      {/* 🎨 PREMIUM DARK TEXT AND SELECTION CONTAINER */}
      <div className="prose prose-invert max-w-none text-[15px] leading-relaxed text-neutral-300 selection:bg-[#01AD9F]/30 selection:text-[#01AD9F]">
        {children}
      </div>
    </div>
  );
}

export default Tab;
