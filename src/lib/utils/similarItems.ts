// similar products / posts
const similarItems = (currentItem: any, allItems: any, slug: string) => {
  // 1. ස්වයංක්‍රීය නිවැරදි කිරීම (Auto-Fix): දත්ත හිස් හෝ වැරදි නම් බිඳ වැටෙන්නේ නැතිව හිස් Array එකක් ලබා දේ
  if (!currentItem?.data || !Array.isArray(allItems)) {
    return [];
  }

  let categories: string[] = [];
  let tags: string[] = [];

  // Categories ආරක්ෂිතව ලබා ගැනීම
  if (Array.isArray(currentItem.data.categories)) {
    categories = currentItem.data.categories;
  }

  // Tags ආරක්ෂිතව ලබා ගැනීම
  if (Array.isArray(currentItem.data.tags)) {
    tags = currentItem.data.tags;
  }

  // 2. Categories අනුව Filter කිරීම (ආරක්ෂිතව)
  const filterByCategories = allItems.filter((item: any) => {
    if (!item?.data?.categories || !Array.isArray(item.data.categories)) return false;
    return categories.some((category) => item.data.categories.includes(category));
  });

  // 3. Tags අනුව Filter කිරීම (ආරක්ෂිතව)
  const filterByTags = allItems.filter((item: any) => {
    if (!item?.data?.tags || !Array.isArray(item.data.tags)) return false;
    return tags.some((tag) => item.data.tags.includes(tag));
  });

  // එකම ලිපිය දෙපාරක් එකතු වීම වැළැක්වීම (Merge & De-duplicate)
  const mergedItems = [...new Set([...filterByCategories, ...filterByTags])];

  // දැනට කියවන ලිපිය (Current Post) ලැයිස්තුවෙන් ඉවත් කිරීම
  const filterBySlug = mergedItems.filter((item: any) => item.slug !== slug);

  // 4. පින්තූරයේ පෙනෙන සුපිරි Layout එකට ගැළපෙන ලෙස උපරිම ප්‍රතිඵල ගණන 6කට සීමා කිරීම 
  // (වෙනත් ෆයිල් වෙනස් කිරීමට අවශ්‍ය නොවේ, පරස්පරතා මඟහැරේ)
  return filterBySlug.slice(0, 6);
};

export default similarItems;
