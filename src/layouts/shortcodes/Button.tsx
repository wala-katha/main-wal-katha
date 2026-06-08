import React from "react";

const Button = ({
  label,
  link,
  style,
  rel,
}: {
  label: string;
  link: string;
  style?: string;
  rel?: string;
}) => {
  // 1. සයිට් එක ඇතුළේ ලින්ක් එකක්ද (Internal) නැත්නම් බාහිර ලින්ක් එකක්ද (External) කියා බැලීම
  const isExternal = link.match(/^http/);

  // 2. SEO සඳහා නිවැරදි rel attributes සකස් කිරීම
  let finalRel = "noopener noreferrer";
  if (isExternal) {
    if (rel) {
      // පරිශීලකයා sponsored, nofollow වැනි දෙයක් දුන්නොත් ඒක එකතු කිරීම
      finalRel += ` ${rel}`;
    } else {
      // බාහිර ලින්ක් වලට ඩිෆෝල්ට් ලෙස nofollow යෙදීම (Link Juice බේරා ගැනීමට)
      finalRel += " nofollow";
    }
  } else {
    // සයිට් එක ඇතුළේ ලින්ක් වලට nofollow හෝ noopener අවශ්‍ය නැත
    finalRel = rel ? rel : "";
  }

  return (
    <a
      href={link}
      target={isExternal ? "_blank" : "_self"} // බාහිර ලින්ක් පමණක් අලුත් ටැබ් එකක ඇරේ
      rel={finalRel || undefined}
      role="button" // SEO & Accessibility: මේක බටන් එකක් බව සර්ච් එන්ජින් වලට තහවුරු කරයි
      className={`inline-flex items-center justify-center font-semibold tracking-wide rounded-xl px-6 py-3 text-[15px] transition-all duration-300 no-underline mb-4 me-4 select-none transform active:scale-95 cursor-pointer ${
        style === "outline"
          ? "border-2 border-[#01AD9F] text-[#01AD9F] bg-transparent hover:bg-[#01AD9F] hover:text-[#010203] hover:shadow-lg hover:shadow-[#01AD9F]/20"
          : "bg-[#01AD9F] text-[#010203] hover:bg-[#01968a] hover:shadow-lg hover:shadow-[#01AD9F]/30"
      }`}
    >
      <span>{label}</span>
      
      {/* 🧠 SMART UX: බාහිර ලින්ක් එකක් නම් පමණක් කුඩා ඊතල සලකුණක් ඔටෝමැටිකව පෙන්වීම */}
      {isExternal && (
        <svg
          className="ms-2 h-4 w-4 transition-transform duration-200 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      )}
    </a>
  );
};

export default Button;
