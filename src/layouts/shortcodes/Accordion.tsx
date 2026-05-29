import React, { useState, useRef } from "react";

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
  
  // SEO & Accessibility: හැම Accordion එකකටම එකිනෙකට වෙනස් ID එකක් ඔටෝ සෑදීම
  const accordionId = useRef(
    typeof window !== "undefined" ? Math.random().toString(36).substr(2, 9) : ""
  );

  return (
    <div className={`accordion ${show ? "active" : ""} ${className || ""}`}>
      <button
        className="accordion-header"
        onClick={() => setShow(!show)}
        aria-expanded={show} // SEO: ගූගල් බොට්ට මේක දැනට ඇරලාද වැහලාද තියෙන්නේ කියා පවසයි
        aria-controls={`accordion-panel-${accordionId.current}`} // බටන් එක අදාළ කන්ටෙන්ට් එකට මැප් කිරීම
        id={`accordion-btn-${accordionId.current}`}
      >
        {title}
        <svg
          className="accordion-icon"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
          aria-hidden="true" // SEO: රොබෝලාට මේ අයිකන් එක කියවීම මඟහැරීමට
        >
          <path
            fill="currentColor"
            d="M505.755,123.592c-8.341-8.341-21.824-8.341-30.165,0L256.005,343.176L36.421,123.592c-8.341-8.341-21.824-8.341-30.165,0 s-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251l234.667-234.667 C514.096,145.416,514.096,131.933,505.755,123.592z"
          ></path>
        </svg>
      </button>
      
      <div
        id={`accordion-panel-${accordionId.current}`}
        className="accordion-content"
        role="region" // SEO: මේක ඇතුළේ වෙනම කොටසක් තියෙන බව බොට්ට හැඟවීම
        aria-labelledby={`accordion-btn-${accordionId.current}`}
        aria-hidden={!show} // වැහිලා තියෙන වෙලාවට බොට්ස්ලාට සහ Screen Readers වලට හංගන්න
        style={{ display: show ? "block" : "none" }} // CSS බිඳ වැටීම් වැළැක්වීමට සුරක්ෂිත ක්‍රමය
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
