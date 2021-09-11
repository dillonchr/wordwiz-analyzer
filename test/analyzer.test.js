import test from "tape";
import {
  getSentencesFromLine,
  getSyllables,
  isAdverb
} from "../src/analyzer.js";

test("syllable tests", function (t) {
  const syllableTests = [
    ["hello", 2],
    ["finalize", 3],
    ["interface", 3],
    ["through", 1],
    ["tree", 1],
    ["away", 2],
    ["car", 1],
    ["presumptive", 3],
    ["officially", 4],
    ["professional", 4],
    ["tape", 1]
  ];

  t.plan(syllableTests.length);
  for (const [word, expected] of syllableTests) {
    t.equal(getSyllables(word), expected, word);
  }
});

test("adverbs", function (t) {
  const tests = [
    ["tally", false],
    ["AlLy!!!", false],
    ["fally", true],
    ["coolly", true],
    ["folly", false]
  ];

  t.plan(tests.length);
  for (const [word, expected] of tests) {
    t.equal(isAdverb(word), expected, word);
  }
});

test("sentences", function (t) {
  const tests = [
    [
      `So this is a really long one. But really it has only a few sentences! Can you believe?...`,
      3
    ],
    ["And this one too. Mr. Gonzalez Jr. spilled beans here.", 2],
    ["Ellipses... elipses everywhere!", 2]
  ];

  t.plan(tests.length);
  for (const [input, expected] of tests) {
    t.equal(
      getSentencesFromLine(input).length,
      expected,
      input.substring(0, 16)
    );
  }
});
