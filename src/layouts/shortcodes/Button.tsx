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
      className={`btn mb-4 me-4 hover:text-white no-underline ${
        style === "outline" ? "btn-outline-primary" : "btn-primary"
      }`}
    >
      {label}
    </a
  );
};

export default Button;
