import dateFormat from "@/lib/utils/dateFormat";
import { humanize, slugify } from "@/lib/utils/textConverter";
import Fuse from "fuse.js";
import React, { useEffect, useRef, useState } from "react";
import { BiCalendarEdit, BiCategoryAlt } from "react-icons/bi";
import { IoSearchOutline, IoCloseCircleOutline, IoCloseOutline } from "react-icons/io5";

export type SearchItem = {
  slug: string;
  data: any;
  content: any;
};

interface Props {
  searchList: SearchItem[];
}

interface SearchResult {
  item: SearchItem;
  refIndex: number;
}

export default function SearchBar({ searchList }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);

  // 🧠 FAST & DYNAMIC FUZZY SEARCH (🎯 FIX: Content එකත් සර්ච් කිරීමට Keys වලට එකතු කළා)
  const fuse = new Fuse(searchList, {
    keys: ["data.title", "data.categories", "content"], // content එක දැම්මා, දැන් කතා ඇතුළේ ඒවත් සර්ච් වෙනවා
    includeMatches: true,
    threshold: 0.4, // සෙවුම් නිරවද්‍යතාවය තවත් වැඩි කිරීමට 0.4 කළා
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const handleClear = () => {
    setInputVal("");
    setSearchResults([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // URL එකෙන් Query එක කියවීම (Hydration Safe)
  useEffect(() => {
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) setInputVal(searchStr);

    setTimeout(function () {
      if (inputRef.current) {
        inputRef.current.selectionStart = inputRef.current.selectionEnd =
          searchStr?.length || 0;
      }
    }, 50);
  }, []);

  // ⚡ INSTANT SEARCH LOGIC (🎯 FIX: අකුරු 1ක් ගැහුවත් ක්ෂණිකව සර්ච් එක වැඩ කරයි)
  useEffect(() => {
    let inputResult = inputVal.length > 0 ? fuse.search(inputVal) : [];
    setSearchResults(inputResult as SearchResult[]);

    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);
      const newRelativePathQuery = window.location.pathname + "?" + searchParams.toString();
      history.pushState(null, "", newRelativePathQuery);
    } else {
      history.pushState(null, "", window.location.pathname);
    }
  }, [inputVal]);

  return (
    <div className="min-h-[50vh] px-2 select-none relative">
      
      {/* EXIT CLOSE BUTTON */}
      <div className="max-w-2xl mx-auto flex justify-end mb-4">
        <a
          href="/"
          rel="home"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.08] text-white/60 hover:text-red-400 transition-all duration-300 text-sm font-semibold tracking-wide shadow-sm"
          title="Exit search and go home"
          aria-label="Exit search and go home"
        >
          <span>Exit</span>
          <IoCloseOutline className="h-5 w-5" />
        </a>
      </div>

      {/* PREMIUM CAPSULE SEARCH BOX */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative flex items-center group">
          <div className="absolute left-4 text-[#01AD9F] filter drop-shadow-[0_0_8px_rgba(1,173,159,0.5)] transition-transform duration-300 pointer-events-none group-focus-within:scale-110">
            <IoSearchOutline className="h-6 w-6" />
          </div>

          <input
            className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-white/10 bg-white/5 text-[#F8F8FF] placeholder-white/40 outline-none transition duration-300 focus:border-[#01AD9F] focus:bg-white/[0.07] focus:shadow-[0_0_20px_rgba(1,173,159,0.15)] text-base sm:text-lg font-medium"
            placeholder="Type here to search posts..."
            type="text"
            name="search"
            value={inputVal}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
            ref={inputRef}
          />

          {inputVal.length > 0 && (
            <button
              onClick={handleClear}
              type="button"
              className="absolute right-4 text-white/40 hover:text-red-400 transition-colors duration-200 outline-none focus:text-red-400"
              title="Clear search"
              aria-label="Clear search space"
            >
              <IoCloseCircleOutline className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>

      {/* SEARCH COUNTER */}
      {inputVal.length > 0 && (
        <div className="my-8 text-center text-sm sm:text-base text-white/60 font-medium tracking-wide">
          Found <span className="text-[#01AD9F] font-bold">{searchResults?.length || 0}</span>
          {searchResults?.length === 1 ? " result" : " results"} for <span className="text-[#F8F8FF] font-semibold">'{inputVal}'</span>
        </div>
      )}

      {/* RESULTS GRID */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-10">
        {searchResults?.map(({ item }) => (
          <div key={item.slug} className="group/card flex flex-col justify-between border border-white/[0.04] bg-white/[0.01] p-4 rounded-2xl hover:border-white/10 transition duration-300">
            <div>
              {item.data.image && (
                <a
                  href={`/${item.slug}`}
                  className="rounded-xl block overflow-hidden relative aspect-video w-full bg-white/5"
                >
                  <img
                    className="group-hover/card:scale-[1.03] transition duration-500 w-full h-full object-cover"
                    src={item.data.image}
                    alt={item.data.title}
                    loading="lazy"
                    width={445}
                    height={230}
                  />
                </a>
              )}

              {/* POST METADATA */}
              <ul className="mt-5 mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-white/50">
                <li className="flex items-center font-medium">
                  <BiCalendarEdit className="mr-1.5 h-4 w-4 text-[#01AD9F]" />
                  <span>{dateFormat(item.data.date)}</span>
                </li>
                {item.data.categories && (
                  <li className="flex items-center font-medium">
                    <BiCategoryAlt className="mr-1.5 h-4 w-4 text-[#01AD9F]" />
                    <div className="flex flex-wrap gap-1">
                      {item.data.categories.map((category: string, i: number) => (
                        <a
                          key={i}
                          href={`/categories/${slugify(category)}`}
                          className="hover:text-[#01AD9F] transition duration-200"
                        >
                          {humanize(category)}
                          {i !== item.data.categories.length - 1 && ","}
                        </a>
                      ))}
                    </div>
                  </li>
                )}
              </ul>

              {/* POST TITLE */}
              <h3 className="mb-2 text-lg sm:text-xl font-bold tracking-tight">
                <a
                  href={`/${item.slug}`}
                  className="block text-[#F8F8FF] hover:text-[#01AD9F] transition duration-300 line-clamp-2 leading-snug"
                >
                  {item.data.title}
                </a>
              </h3>
            </div>

            {/* POST CONTENT EXCERPT */}
            <p className="text-white/60 text-sm line-clamp-2 mt-2 leading-relaxed">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
