import { isValid } from "date-fns";

// 1. දිනය අනුව අලුත්ම ලිපි මුලට එන සේ සකස් කිරීම (Sort by Date)
export const sortByDate = (array: any[]) => {
  // ස්වයංක්‍රීය නිවැරදි කිරීම (Auto-Fix): Array එකක් නොවේ නම් බිඳ වැටෙන්නේ නැතිව හිස් Array එකක් ලබා දේ
  if (!Array.isArray(array)) return [];

  return [...array].sort((a: any, b: any) => {
    // ලිපි දෙකෙහි දින ආරක්ෂිතව ලබා ගැනීම
    const dateA = a?.data?.date ? new Date(a.data.date) : null;
    const dateB = b?.data?.date ? new Date(b.data.date) : null;

    const isValidA = dateA && isValid(dateA);
    const isValidB = dateB && isValid(dateB);

    // දින දෙකම වලංගු නම්, අලුත්ම දිනය මුලට දමයි
    if (isValidA && isValidB) {
      return dateB.valueOf() - dateA.valueOf();
    }
    
    // යම් ලිපියක දිනයක් නැත්නම් හෝ වැරදි නම්, එය ස්වයංක්‍රීයව අගට තල්ලු කරයි (Auto-Fix)
    if (isValidA && !isValidB) return -1;
    if (!isValidA && isValidB) return 1;
    return 0;
  });
};

// 2. බර/වැදගත්කම අනුව සකස් කිරීම (Sort by Weight)
export const sortByWeight = (array: any[]) => {
  if (!Array.isArray(array)) return [];

  // බර (Weight) ඇතුළත් කර ඇති ලිපි
  const withWeight = array.filter(
    (item: any) => item?.data?.weight !== undefined && item?.data?.weight !== null
  );
  
  // බර ඇතුළත් කර නොමැති සාමාන්‍ය ලිපි
  const withoutWeight = array.filter(
    (item: any) => item?.data?.weight === undefined || item?.data?.weight === null
  );

  // බර කුඩාම අගයේ සිට විශාලම අගයට සකසයි (උදා: 1, 2, 3...)
  const sortedWeightedArray = withWeight.sort(
    (a: any, b: any) => Number(a.data.weight) - Number(b.data.weight)
  );

  // දෙකම එකතු කර අවසන් ලැයිස්තුව ලබා දීම
  return [...sortedWeightedArray, ...withoutWeight];
};
