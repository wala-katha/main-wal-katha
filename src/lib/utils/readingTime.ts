// content reading
const readingTime = (content: string) => {
  // 1. ස්වයංක්‍රීය නිවැරදි කිරීම (Auto-Fix): අන්තර්ගතය හිස් නම් බිඳ වැටෙන්නේ නැතිව "01 Min read" ලබා දේ
  if (!content || typeof content !== "string") {
    return {
      text: "01 Min read",
      minutes: 1,
      words: 0
    };
  }

  const WPS = 275 / 60; // Words Per Second
  let images = 0;
  const regex = /\w/;

  let words = content.split(/\s+/).filter((word) => {
    if (word.includes("<img")) {
      images += 1;
    }
    return regex.test(word);
  }).length;

  let imageAdjust = images * 4;
  let imageSecs = 0;
  let imageFactor = 12;

  let tempImages = images;
  while (tempImages) {
    imageSecs += imageFactor;
    if (imageFactor > 3) {
      imageFactor -= 1;
    }
    tempImages -= 1;
  }

  // 2. මිනිත්තු ගණන ගණනය කිරීම (අවම මිනිත්තුව 1 කි)
  let minutes = Math.ceil(((words - imageAdjust) / WPS + imageSecs) / 60);
  if (minutes < 1) minutes = 1;

  // මිනිත්තු 10 ට අඩු නම් ඉදිරියට 0 එකතු කිරීම (01, 02, 03...)
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const label = minutes < 2 ? "Min read" : "Mins read";
  const displayText = `${formattedMinutes} ${label}`;

  // 3. Astro Component එකට සහ SEO වලට අවශ්‍ය සියලුම දත්ත Object එකක් ලෙස ලබා දීම
  return {
    text: displayText, // උදා: "05 Mins read"
    minutes: minutes,   // උදා: 5 (SEO Schema වලට)
    words: words,       // ලිපියේ ඇති මුළු වචන ගණන
    // [object Object] ප්‍රශ්නය මඟහැරීමට ස්වයංක්‍රීයව Text එකක් බවට හැරවීම
    toString() {
      return displayText;
    }
  };
};

export default readingTime;
