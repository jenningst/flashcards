const uuidv4 = require('uuid/v4');

function seedMockPack(pack, n = 1) {
  const filter = uuidv4(); // generate a filter
  const name = uuidv4(); // generate a name
  const modes = ['REVIEW_MODE', 'WRITE_MODE']; // TODO: remove hard-coding
  const mode = modes[getRandomInt(0, 1)]; // generate a random mode
  let numToSeed = getRandomInt(1, n || pack.length - 1); // generate a random number of cards
  
  let cards = [];
  for (let i = 0; i < numToSeed; i++) {
    let card = getRandomElement(pack, pack.length - 1);
    card.id = uuidv4();
    cards.push(card);
  }
 
  return { mode, name, filter, cards };
};

function getRandomElement(arr, ceiling) {
  return arr[getRandomInt(0, ceiling)];
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export { seedMockPack };