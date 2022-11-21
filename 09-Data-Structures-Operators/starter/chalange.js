'use strict';
/*
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);
/*


//coding chalange 4


//coding chalange 3
//1
const events = new Set([...gameEvents.values()]);
console.log(events); //{'⚽️ GOAL', '🔁 Substitution', '🔶 Yellow card', '🔴 Red card'}
//2
gameEvents.delete(64);
console.log(gameEvents);
//3
const noOfEvent = gameEvents.size;
console.log(`An event happened on Average ,every ${90 / noOfEvent} minutes`);
//4
for (const [minute, event] of gameEvents.entries()) {
  const half = minute <= 45 ? 'FIRST' : 'SECONED';
  console.log(`[${half} HALF]  ${minute} : ${event}`);
}
//// coding chalange 2

// //1
// for (const [index, playerName] of game.scored.entries()) {
//   console.log(`Goal no ${index + 1}: ${playerName}`);
// }

//2
// const values = Object.values(game.odds);
// let sum = 0;
// for (const i of values) sum += i;
// console.log(sum / values.length);

// //3
// for (const [key, value] of Object.entries(game.odds)) {
//   const teamString = key === 'x' ? 'draw' : 'victory ' + game[key];
//   console.log(`odd of  ${teamString} : ${value}`);
// }

// 4
// const scores = {};

// for (let goaler of game.scored) //adding values
//   scores[goaler] ? (scores[goaler] += 1) : (scores[goaler] = 1);

// for (const [i, j] of Object.entries(scores)) //printing
//   console.log(i + ' : ' + j + ' goals');

////coding chalnge 1
/*
//1
const [players1, players2] = game.players;
//console.log(players1, players2);
//2)
const [gk, ...fieldplayers] = players1;
console.log(gk, fieldplayers);
//3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);
//4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);
//5
const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);
//6
const printGoals = function (...numberOfPlaerys) {
  console.log(
    `${numberOfPlaerys} \n and  ${game.scored.length} goals were scoared`
  );
};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
//printGoals('Davies', 'Muller');
// printGoals(...game.scored);
//7
game.odds.team1 < game.odds.team2 &&
  console.log('team 1 is more likely to win');
game.odds.team1 > game.odds.team2 &&
  console.log('team 2 is more likely to win');

// team1 < team2 && console.log('Team 1 is more likely to win');
// team1 > team2 && console.log('Team 2 is more likely to win');
*/
