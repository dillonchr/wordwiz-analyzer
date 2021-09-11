
const nonAdverbs = [
    "ally",
    "anomaly",
    "apply",
    "assembly",
    "belly",
    "bely",
    "bubbly",
    "bully",
    "burly",
    "chilly",
    "comely",
    "comply",
    "costly",
    "courtly",
    "cuddly",
    "curly",
    "dally",
    "dastardly",
    "deadly",
    "deathly",
    "disorderly",
    "doily",
    "dragonfly",
    "early",
    "family",
    "filly",
    "fly",
    "folly",
    "friendly",
    "frilly",
    "ghastly",
    "golly",
    "goodly",
    "gravelly",
    "grisly",
    "gully",
    "heavenly",
    "hilly",
    "holly",
    "holy",
    "homely",
    "homily",
    "hourly",
    "imply",
    "jelly",
    "jolly",
    "kindly",
    "leisurely",
    "likely",
    "lily",
    "lively",
    "lonely",
    "lovely",
    "lowly",
    "mannerly",
    "mealy",
    "measly",
    "melancoly",
    "moly",
    "monopoly",
    "multiply",
    "oily",
    "only",
    "orderly",
    "pearly",
    "pebbly",
    "ply",
    "rally",
    "rely",
    "reply",
    "sally",
    "scaly",
    "shapely",
    "sickly",
    "silly",
    "sly",
    "sly",
    "spritely",
    "squiggly",
    "stately",
    "steely",
    "supply",
    "surly",
    "tally",
    "timely",
    "ugly",
    "unlikely",
    "weekly",
    "whirly",
    "wily",
    "wobbly",
    "wordly",
    "wrinkly",
    "yearly"
];

export default nonAdverbs.map((word) => new RegExp(`\\b${word}\\b`, "i"));
