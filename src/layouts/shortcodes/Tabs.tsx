import React, { useEffect, useRef, useState } from "react";
import { marked } from "marked";

interface TabChildrenProps {
  value: string;
}

const Tabs = ({ children }: { children: React.ReactElement<TabChildrenProps> }) => {
  const [active, setActive] = useState<number>(0);
  const [defaultFocus, setDefaultFocus] = useState<boolean>(false);

  // එකම පිටුවක Tabs කට්ටල කිහිපයක් තිබුණොත් ID පැටලීම වැළැක්වීමට අද්විතීය ID එකක් සෑදීම
  const tabGroupId = useRef(Math.random().toString(36).substr(2, 9));
  const tabRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (defaultFocus) {
      //@ts-ignore
      tabRefs.current[active]?.focus();
    } else {
      setDefaultFocus(true);
    }
  }, [active]);

  const tabLinks = Array.from(
    children.props.value.matchAll(
      //@ts-ignore
      /<div\s+data-name="([^"]+)"[^>]*>(.*?)<\/div>/gs,
    ),
    (match: RegExpMatchArray) => ({ name: match[1], children: match[0] }),
  );

  const handleKeyDown = (
    event: React.KeyboardEvent<EventTarget>,
    index: number,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      setActive(index);
    } else if (event.key === "ArrowRight") {
      setActive((active + 1) % tabLinks.length);
    } else if (event.key === "ArrowLeft") {
      setActive((active - 1 + tabLinks.length) % tabLinks.length);
    }
  };

  return (
    <div className="tab my-4">
      {/* SEO/Accessibility: මුළු ලිස්ට් එකම Tab List එකක් බව හඳුන්වා දීම */}
      <ul className="tab-nav" role="tablist" aria-label="Content Tabs">
        {tabLinks.map(
          (item: { name: string; children: string }, index: number) => (
            <li
              key={index}
              className={`tab-nav-item ${index === active ? "active" : ""}`}
              role="tab"
              id={`tab-${tabGroupId.current}-${index}`}
              aria-selected={index === active ? "true" : "false"}
              aria-controls={`panel-${tabGroupId.current}-${index}`}
              tabIndex={index === active ? 0 : -1}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onClick={() => setActive(index)}
              //@ts-ignore
              ref={(ref) => (tabRefs.current[index] = ref)}
            >
              {item.name}
            </li>
          ),
        )}
      </ul>

      {/* SEO/Accessibility: Content එක වටා ඇති නිවැරදි TabPanel ව්‍යුහය */}
      {tabLinks.map((item: { name: string; children: string }, i: number) => (
        <div
          id={`panel-${tabGroupId.current}-${i}`}
          role="tabpanel"
          aria-labelledby={`tab-${tabGroupId.current}-${i}`}
          className={active === i ? "tab-content block px-5" : "hidden"}
          key={i}
          tabIndex={0}
          dangerouslySetInnerHTML={{
            __html: marked.parse(item.children),
          }}
        />
      ))}
    </div>
  );
};

export default Tabs;
