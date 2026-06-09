import { format, isValid } from "date-fns";

/**
 * Astro වෙබ් අඩවිය සඳහා කළු පසුබිමට සහ SEO වලට ගැළපෙන පරිදි 
 * දිනය කොටස් වශයෙන් සහ String එකක් ලෙස ලබා දෙන ශ්‍රිතය.
 */
const dateFormat = (date: Date | string) => {
  let dateObj: Date;

  // 1. දිනයක් ලබා දී නොමැති නම් ස්වයංක්‍රීයව අද දිනය ලබා ගනී
  if (!date) {
    dateObj = new Date();
  } else {
    dateObj = typeof date === "string" ? new Date(date) : date;
  }

  // 2. ලබා දුන් දිනය වලංගු නොවේ නම් ස්වයංක්‍රීයව අද දිනයට හැරවේ
  if (!isValid(dateObj)) {
    dateObj = new Date();
  }

  // දත්ත වෙන වෙනම Format කර ගැනීම
  const day = format(dateObj, "dd");
  const month = format(dateObj, "MMM");
  const year = format(dateObj, "yyyy");

  // 3. Object එකක් ලෙස පාවිච්චි කරන තැන්වලට සහ කෙලින්ම Text එකක් ලෙස පාවිච්චි කරන තැන් දෙකටම ගැළපෙන ලෙස සකස් කිරීම
  return {
    day,
    month,
    year,
    isoString: dateObj.toISOString(),
    // මෙන්න මේ කොටස නිසා ඔයා Component එකේ කෙලින්ම පාවිච්චි කලත් [object Object] වැටෙන්නේ නැතිව දිනය ලස්සනට පෙනේවි
    toString() {
      return `${day} ${month}, ${year}`; // උදා: "09 Jun, 2026"
    }
  };
};

export default dateFormat;
