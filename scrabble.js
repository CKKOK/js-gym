const fs = require('fs');
const mappedDictionary = {};
let letterStats = {};
let linesProcessed = 0;

function reorderLettersIn(word) {
    let tmp = word.split('');
    tmp.forEach(letter => {
        if (letterStats[letter] > 0) {
            letterStats[letter]++;
        } else {
            letterStats[letter] = 1;
        };
    });
    tmp.sort((a,b) => {
        if (b < a) {
            return 1;
        } else if (a < b) {
            return -1;
        } else {
            return 0;
        }
    });
    return tmp.join('');
};

const dictionary = fs.readFileSync('./enable1.txt', 'utf-8').split('\r\n');

dictionary.forEach((word) => {
    let key = reorderLettersIn(word);
    if (mappedDictionary[key] != undefined ) {
        mappedDictionary[key].push(word);
        mappedDictionary[key][1]++;
    } else {
        mappedDictionary[key] = [word.length, 1, word];
    };
    linesProcessed++;
});

let current = {
    word: "",
    max: 0,
    anagrams: []
};

for (let key in mappedDictionary) {
    if (mappedDictionary[key][1] > current["max"]) {
        current["word"] = key;
        current["max"] = mappedDictionary[key][1];
        current["anagrams"] = mappedDictionary[key].slice(2);
    };
};
mappedDictionary["maxAnagrams"] = current;
mappedDictionary["letterStats"] = letterStats;
fs.writeFileSync('./mappedDictionary.json', JSON.stringify(mappedDictionary, null, 2));
//============================================

function getAnagramsOfLength(wordLength) {
    let result = {};
    for (let key in mappedDictionary) {
        if (mappedDictionary[key][0] === wordLength) {
            result[key] = mappedDictionary[key]
        };
    };
    return result;
};

function getWordsWithNAnagrams(numAnagrams) {
    let result = {};
    for (let key in mappedDictionary) {
        if (mappedDictionary[key][1] === numAnagrams) {
            result[key] = mappedDictionary[key]
        };
    };
    return result;
};

function getAllExactAnagramsOf(word) {
    return mappedDictionary[reorderLettersIn(word)]
};

function getAllAnagramsOf(word) {
    // need to implement nCr
    // need to implement wildcard letter
};