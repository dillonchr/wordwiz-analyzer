import nonAdverbs from "./non-adverbs.js";

export function* getSentences(excerpt) {
  for (const line of excerpt.split("\n")) {
    const clean = line.trim();
    if (clean) {
      yield getSentencesFromLine(clean);
    }
  }
}

export function getSentencesFromLine(line) {
  return line
    .split(/(?<!\bmr?s?|\bMr?s?|\b[dDjJsS]r)[.!?]/)
    .map(str => str.trim())
    .filter(Boolean);
}

export const getWords = sentence => sentence.split(" ").filter(Boolean);

export const getSyllables = word => {
  const matches = word
    .replace(/^y/i, "")
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
    .match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
};

export const getAdverbs = words => words.filter(isAdverb).length;

export function isAdverb(word) {
  return /ly\b/i.test(word) && !nonAdverbs.some(re => re.test(word));
}

export default excerpt => {
  if (!excerpt || !excerpt.length) {
    return {};
  }

  const totals = {
    sentences: 0,
    words: 0,
    syllables: 0,
    adverbs: 0
  };

  for (const line of excerpt.split("\n")) {
    for (const sentence of getSentencesFromLine(line)) {
      totals.sentences++;
      for (const word of getWords(sentence)) {
        totals.words++;
        totals.syllables += getSyllables(word);
        if (isAdverb(word)) {
          totals.adverbs++;
        }
      }
    }
  }

  const adverbPercentage =
    ((totals.adverbs / totals.words) * 100).toFixed(2) + "%";
  const grade = (
    0.39 * (totals.words / totals.sentences) +
    11.8 * (totals.syllables / totals.words) -
    15.59
  ).toFixed(2);

  return {
    sentences: totals.sentences,
    words: totals.words,
    adverbs: totals.adverbs,
    adverbPercentage,
    syllables: totals.syllables,
    grade
  };
};
