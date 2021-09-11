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
    .split(/(?<!mr?s?|Mr?s?|[dDjJsS]r)[.!?]/)
    .map(str => str.trim())
    .filter(Boolean);
}

export const getWords = sentence => sentence.split(" ").filter(s => s);

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

  const totalSentences = [...getSentences(excerpt)];
  const totalWords = totalSentences.reduce((words, sentence) => {
    return words.concat(getWords(sentence));
  }, []);
  const totalAdverbs = getAdverbs(totalWords);
  const adverbPercentage =
    ((totalAdverbs / totalWords.length) * 100).toFixed(2) + "%";
  const totalSyllables = totalWords.reduce((syllables, word) => {
    return syllables + getSyllables(word);
  }, 0);
  const grade = (
    0.39 * (totalWords.length / totalSentences.length) +
    11.8 * (totalSyllables / totalWords.length) -
    15.59
  ).toFixed(2);

  return {
    sentences: totalSentences.length,
    words: totalWords.length,
    adverbs: totalAdverbs,
    adverbPercentage,
    syllables: totalSyllables,
    grade
  };
};
