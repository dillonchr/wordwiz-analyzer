import nonAdverbs from "./non-adverbs.js";

export function getSentencesFromLine(line) {
  return line
    .split(/(?<!\bmr?s?|\bMr?s?|\b[dDjJsS]r)[.!?]/)
    .map(str => str.trim())
    .filter(Boolean);
}

export const getWords = sentence => sentence.split(" ").filter(Boolean);

export function getSyllables(word) {
  const matches = word
    .replace(/^y/i, "")
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
    .match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

export function isAdverb(word) {
  return /ly\b/i.test(word) && !nonAdverbs.some(re => re.test(word));
}

export default function (excerpt) {
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

  /*
   * forumla comes from:
   * https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests#Flesch%E2%80%93Kincaid_grade_level
   */
  const grade = (
    0.39 * (totals.words / totals.sentences) +
    11.8 * (totals.syllables / totals.words) -
    15.59
  ).toFixed(2);
  const adverbPercentage =
    ((totals.adverbs / totals.words) * 100).toFixed(2) + "%";

  return {
    ...totals,
    adverbPercentage,
    grade
  };
}
