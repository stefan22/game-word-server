const fs = require('fs');
const data = fs.readFileSync('./data.json', 'utf-8');
const fileWords = JSON.parse(data);
const { words } = fileWords;

let lastWord;
let selectedWord;
const randFn = () => Math.floor(Math.random() * words.length);

//if new random word equals last word -> get another - closure
const getWord = () => {
  function isWord() {
    let rand = randFn();
    let value = lastWord !== rand ? rand : randFn();
    selectedWord = words[value];
    return selectedWord;
  }

  return (lastWord = isWord());
};

module.exports = getWord;
