'use strict';
//  סדר הפוך**

// Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section

//**  ES6 enhanced object literals
// computing property names

// const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri'];
// const openingHours = {
//   [weekdays[3]]: {
//     open: 12,
//     close: 22,
//   },
//   [weekdays[4]]: {
//     open: 11,
//     close: 23,
//   },
//   [`day-${2 + 4}`]: {
//     open: 0, // Open 24 hours
//     close: 24,
//   },

//=🔽
const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 12 + 12,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // **ES6 enhanced object literals
  openingHours, //~=stamshem:openingHours,אם רוצים לקרוא למאפיין בשם אחר

  order: function (startIndex, mainIndex) {
    return [this.starterMenu[startIndex], this.mainMenu[mainIndex]];
  },

  //** ES6 enhanced object literals
  // **אפשר בהצהרה גם להוריד את המילה פונקציה ואת הנקודותיים

  // **🔽ניתן לקבל את הארוגמנטים בסדר שונה ממה שנשלח אבל חשוב לשמור על שמות המאפיינים
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your declicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

////////////////////////////////////////////////
// // String Methods Practice

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
const f = flights.split('+');
for (let i of f) {
  const [a, b, c, d] = i.split(';'); //.join(' ').replaceAll('_', ' '));
  console.log(
    `${a.includes('Delayed') ? '🔴' : ' '}${a.replaceAll('_', ' ')} from ${b
      .slice(0, 3)
      .toUpperCase()} to ${c.slice(0, 3).toUpperCase()} (${d.replace(
      ':',
      'h'
    )})`.padStart(50, '.')
  );
}
🔴 Delayed Departure from FAO to TXL (11h25)
             Arrival from BRU to FAO (11h45)
  🔴 Delayed Arrival from HEL to FAO (12h05)
           Departure from FAO to LIS (12h30)

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
    '_',
    ' '
  )} ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})`.padStart(36);
  console.log(output);
}
///////////////////////////////////////
// Working With Strings - Part 3

// Split and join
console.log('a+very+nice+string'.split('+')); // ['a', 'very', 'nice', 'string']
console.log('Jonas Schmedtmann'.split(' ')); //['Jonas', 'Schmedtmann']

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' '); //~to string
console.log(newName); //Mr. Jonas SCHMEDTMANN

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    //namesUpper.push(n[0].toUpperCase() + n.slice(1));//=🔽
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+')); //המספר מייצג את כמות התווים שתיהיה לי לאחר ההוספה
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

const maskCreditCard = function (number) {
  const str = number + ''; //=string(number)
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(64637836)); //****7836
console.log(maskCreditCard(43378463864647384)); //*************7384
console.log(maskCreditCard('334859493847755774747')); //*****************4747

// Repeat
const message2 = 'Bad waether... All Departues Delayed... ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`);
};
planesInLine(5);
planesInLine(3);//There are 3 planes in line 🛩🛩🛩
planesInLine(12);

///////////////////////////////////////
// Working With Strings - Part 2

const airline = 'TAP Air Portugal';

console.log(airline.toLowerCase()); //tap air portugal
console.log(airline.toUpperCase()); //TAP AIR PORTUGAL

// Fix capitalization in name
const passenger = 'jOnAS'; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect); ////Jonas

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();//מוריד רווחים ואנטר וכו
const normalizedEmail = loginEmail.toLowerCase().trim(); //שתי הפעולות במכה
console.log(normalizedEmail); //hello@jonas.io
console.log(email === normalizedEmail);

// replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS); //288.97$

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate')); // only first
//console.log(announcement.replaceAll('door', 'gate')); // all =🔽
console.log(announcement.replace(/door/g, 'gate')); //regular expression g =global
//All passengers come to boarding gate 23. Boarding gate 23!

// Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320')); //true(case sensitive)
console.log(plane.includes('Boeing')); //false
console.log(plane.startsWith('Airb')); //true

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the NEW ARirbus family');
}

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();

  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

/////////////////////////////////////
Working With Strings - Part 1
const airline = 'TAP Air+Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal')); //8
console.log(airline.indexOf('portugal')); //-1
// **המתודה פועלת אך לא משנה את המחרוזת המקורית
console.log(airline.slice(4));
console.log(airline.slice(4, 7)); //כולל ערך התחלתי לא כולל ערך סופי המחרוזת יהיה 7-4

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat 😬');
  else console.log('You got lucky 😎');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');
//!! אע"פ שמחרוזת זה :פרימיטיב עובד עליה מתודה כי ברגע שמפעילים את המתודה מאחורי הקלעים זה נהפך לאובייקט מסוג מחרוזת שיש  וכל  מיקום של תו הוא שדה והתו עצמו הוא ערך של השדה וכן יש לאובייקט מתודות מוכנות
console.log(new String('jonas')); //String {'jonas'}
console.log(typeof new String('jonas')); //object

console.log(typeof new String('jonas').slice(1)); //string

///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀


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
*/
/////////////////////////
// באיזה מבנה נתוניים להשתמש במצגת השיעורים התאורטים
//עמוד 121
///////////////////////////////////////
// Maps: Iteration

// ** עדיף להכניס כך את הנתונים,מערך של מערכים, אבל אם מכניסים תוך כדי התוכנית אז עדיף:סט
//!! למעשה מפה זה מערך של מערכים זוגיים
//!! כמו שראינו באובייקט שעשו עליו את הפונקציה אנטריס
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question); //Map(7) {'question' => 'What is the best programming language in the world?', 1 => 'C', 2 => 'Java', 3 => 'JavaScript', 'correct' => 3, …}

//**וזה למעשה אותו מבנה של מתודה אנטריס של אובייקט
// ולכן קל לעשות המרה של אובייקט למפה**

// // Convert object to map
console.log(Object.entries(openingHours)); //[Array(2), Array(2), Array(2)]
const hoursMap = new Map(Object.entries(openingHours)); //Map(3) {'thu' => {…}, 'fri' => {…}, 'sat' => {…}}
console.log(hoursMap);

//!!  אובייקט הוא לא איטראבל לכן צריך להפעיל עליו מתודה :אנטריס ואז יהיה לנו מערך שנוכל לרוץ עליו
//!! Object.keys(Objectname)
//אבל מפה היא כן ולכן אפשר להריץ עליה לולאה!!
//!! וכן להפעיל עליה מתודה ישירות כגון
//!! mapname.keys()
// // Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

// const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);

console.log(question.get(question.get('correct') === answer));

// // Convert map to array //** וכל מיני דוגמאות שונות */

// //!! הדפסת מפה
console.log(question); //Map(7) {'question' => 'What is the best programming language in the world?', 1 => 'C', 2 => 'Java', 3 => 'JavaScript', 'correct' => 3, …}
// //!! זהה לגמרי למעט שהוא איטרטור🔽
console.log(question.entries()); // **MapIterator** {'question' => 'What is the best programming language in the world?', 1 => 'C', 2 => 'Java', 3 => 'JavaScript', 'correct' => 3, …}
// //!! רצף של מערכים זוגיים
console.log(...question); //(2) ['question', 'What is the best programming language in the world?'] (2) [1, 'C'] (2) [2, 'Java'] (2) [3, 'JavaScript'] (2) ['correct', 3] (2) [true, 'Correct 🎉'] (2) [false, 'Try again!']
// //!! רצף של מערכים זוגיים בתוך מערך
console.log([...question]); //[Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2)]
// //** וכן כל המתודות של אובייקט גם קיימות במפה

console.log([question.keys()]); //[MapIterator]
console.log(question.keys()); //MapIterator {'question', 1, 2, 3, 'correct', …}
console.log([...question.keys()]); //['question', 1, 2, 3, 'correct', true, false]
console.log(...question.keys()); //question 1 2 3 correct true false

console.log([...question.values()]); //(7) ['What is the best programming language in the world?', 'C', 'Java', 'JavaScript', 3, 'Correct 🎉', 'Try again!']

///////////////////////////////////////
// Maps: Fundamentals
//!! כמו אובייקט רק שאפשר לשים במפתחות שלו  סוגים נוספים של משתנים למעט סטרינג

//!! הכי קל זה לאתחל אותו ריק ואז להוסיף לו נתונים עם מתודה :סט

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
//!!המתודה :סט לא רק מעדכנת את המפה אלא גם מחזירה אותה
console.log(rest.set(2, 'Lisbon, Portugal')); //{'name' => 'Classico Italiano', 1 => 'Firenze, Italy', 2 => 'Lisbon, Portugal'}
//!! בגלל שמתודה סט מחזירה את המפה אז אפשר לשרשר אותה
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');
console.log(rest);
console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

//example
const time = 8; //We are closed :(
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories')); //true
rest.delete(2); //מחיקה
// // rest.clear();

//אפשר להשתמש באובייקטים ומערכים כשדות מפתח במפה
const rest = new Map();
const arr = [1, 2];
rest.set(arr, 'Test');
console.log(rest); //Map(1) {Array(2) => 'Test'}
console.log(rest.get(arr)); //Test
console.log(rest.size);//1

//**אבל אם היינו עושים את ש תי הפקודות שלעיל  כך זה לא היה עובד
// בגלל ששני המערכים לקמן הם לא אותו אובייקט ב:היפ
console.log(rest.get([1,2])) gives undefined. why? בשאלה הזו במערכת  יש תשובה
//rest.set([1, 2], 'Test');
//console.log(rest.get([1,2]));

// דוגמא לעבודה עם DOM
rest.set(document.querySelector('h1'), 'Heading'); //הכנסו את הכותרת שתיהיה מפתח במפה
console.log(rest);
///////////////////////////////////////
// // Sets
//!! בד"כ עדיף לעבוד עם מערך, השימוש העיקרי שלו הוא להשאיר אלמנטים שלא חוזרים על עצמם
!!( אם צריך לשנות ערכים וכו עדיף להמיר למערך)
!!  only with iterable
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet); //Set(3) {'Pasta', 'Pizza', 'Risotto'}
// !! מחרוזת גם ניתנת להמרה כ:סט כי היא גם :איטראבל
console.log(new Set('Jonas')); //Set(5) {'J', 'o', 'n', 'a', 's'}

console.log(ordersSet.size); //3
console.log(ordersSet.has('Pizza')); //true
console.log(ordersSet.has('Bread')); //false

ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
//ordersSet.clear(); //Set(0) {size: 0}
console.log(ordersSet); //Set(3) {'Pasta', 'Pizza', 'Garlic Bread'}
// !!  אי אפשר לשלוף נתונים ואין חשיבות לסדר
for (const order of ordersSet) console.log(order);

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = new Set(staff);// {'Waiter', 'Chef', 'Manager'}
// !!המרה למערך
const staffUnique = [...new Set(staff)]; // ['Waiter', 'Chef', 'Manager']

console.log(staffUnique);

console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
); //3

console.log(new Set('jonasschmedtmann').size); //11


///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

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

//// coding chalange 2

//1
for (const [index, playerName] of game.scored.entries()) {
  console.log(`Goal no ${index + 1}: ${playerName}`);
}

// 2
const values = Object.values(game.odds);
let sum = 0;
for (const i of values) sum += i;
console.log(sum / values.length);

//3
for (const [key, value] of Object.entries(game.odds)) {
  const teamString = key === 'x' ? 'draw' : 'victory ' + game[key];
  console.log(`odd of  ${teamString} : ${value}`);
}

// 4
const scores = {};

for (let goaler of game.scored) //adding values
  scores[goaler] ? (scores[goaler] += 1) : (scores[goaler] = 1);

for (const [i, j] of Object.entries(scores)) //printing
  console.log(i + ' : ' + j + ' goals');
///////////////////////////////////////
// Looping Objects: Object Keys, Values, and ntries:

//!! צריך לקבל מהאובייקט מערך בכדי שיהיה ניתן לרוץ עליו
Object.keys(objectname)// מחזיר מערך של המפתחות
Object.value(objectname)
Object.entries(objectname);// מחזיר מערך של מערכים בעלי שני משתנים(שדה וערך)

// Property NAMES
const properties = Object.keys(openingHours); //
console.log(properties); // ['thu', 'fri', 'sat']

let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

// Property VALUES
const values = Object.values(openingHours);
console.log(values);
console.log(Object.keys(values[0])); //{open, close}

// Entire object
const entries = Object.entries(openingHours); //(key,value)
console.log(entries);
for (const [x, y] of entries) {
  console.log(x, y);
}
// // [key, value]
for (const [day, { open, close }] of entries) {
  // בכדי להבין את אופן הקליטה יש לראות הסבר בobject destcutering
  console.log(`On ${day} we open at ${Object.keys(b)[0]} and close at ${b}`);
}

//////////////////////////////////////
// // Optional Chaining
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open); //undefind~בגלל שאין ביום שני ערך

// console.log(restaurant.openingHours.mon.open); //~ERROR

// WITH optional chaining
console.log(restaurant.openingHours.mon?.open); //~return value only if the expression befor ?. is defined
console.log(restaurant.openingHours?.mon?.open);

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}
// ** תזכורת: אם רוצים להשתמש בשם של משתנה באותו מקום של מאפיין אז צריך לשים זאת בסוגריים מרובעות
// ~restaurant.openingHours[0]?.open=restaurant.openingHours.mon?.open

// Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// Arrays
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
// const users = [];

console.log(users[0]?.name ?? 'User array empty');

//▽את זה היינו צריכים לעשות לולא ה:אופציונל צ'אינינג

if (users.length > 0) console.log(users[0].name);
else console.log('user array empty');

///////////////////////////////////////
// The for-of Loop
//+**stamarray.entries()**


const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

//for (const item of menu) console.log(item);

//!!  stamarray.entries()  -> (index, element)
// !! מערך של ערכים מסוג   מערך בעל שני משתנים אינדקס  ואלמנט ▽
for (const item of menu.entries()) {
  console.log(item);
}
console.log(menu.entries()); //~Array Iterator {}
console.log([...menu.entries()]); //~[Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2)];

// **אותו דבר רק ש אופן הזה אני קולט באופן ישיר את המשתנים בנפרד ולא כמערך ערך▽

for (const [i, el] of menu.entries()) {
  //~i=item[0];el=item[1]
  console.log(`${i + 1}: ${el}`);
}


//** ~we can use continue/breake
///////////////////////////////////////
///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/
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

*/
// 1.
const [players1, players2] = game.players;
console.log(players1, players2);

// 2.
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// 3.
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4.
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Periscic'];

// 5.
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

// 6.
const printGoals = function (...players) {
  console.log(players);
  console.log(`${players.length} goals were scored`);
};

// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// printGoals('Davies', 'Muller');
printGoals(...game.scored);

// 7.
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');


///////////////////////////////////////
//Logical Assignment Operators


const rest1 = {
  name: 'Capri',
  // numGuests: 20,  //case no 1
  numGuests: 0, //case no 2
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// OR assignment operator

rest1.numGuests = rest1.numGuests || 10; //{name: 'Capri', numGuests: 20}
rest2.numGuests = rest2.numGuests || 10; //{name: 'La Piazza', owner: 'Giovanni Rossi', numGuests: 10}

// OR assignment operator// =🔽
// **מכניס ערך למשתנה אם הוא פולסי

rest1.numGuests ||= 10; // 1-20 ;2-10
rest2.numGuests ||= 10; //1-10;2-10

// nullish assignment operator (null or undefined)
// **מכניס ערך למשתנה אם הוא נוליש כלומר נול או אנדיפיינד
rest1.numGuests ??= 10; // 1-20 ;2-0
rest2.numGuests ??= 10; //1-10;2-10

// AND assignment operator
!!הכנסת ערך למשתנה אם הוא טרוסי

rest1.owner = rest1.owner && '<ANONYMOUS>';   //{name: 'Capri', numGuests: 0, owner: **undefined}
rest2.owner = rest2.owner && '<ANONYMOUS>';  //{name: 'La Piazza', owner: '<ANONYMOUS>'}

=🔽 כמעט זהה ראה כוכבית

rest1.owner &&= '<ANONYMOUS>'; //{name: 'Capri', numGuests: 0}
rest2.owner &&= '<ANONYMOUS>'; //{name: 'La Piazza', owner: '<ANONYMOUS>'}

console.log(rest1);
console.log(rest2);


///////////////////////////////////////
// The Nullish Coalescing(מתלכד) Operator(??)
//לתיקון הבעיה בפרק הקודם
//**11**
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests); //10

// Nullish: only "null" and "undefined" are nullish(NOT 0 or '')
//!!// פועל כמו || רק שרואה רק את נול ואנדיפיינד כפולסי. 
!!ואת 0 ו'' כ:טרוסי ולכןיחזיר אותם אם הם ראשונים ,ימשיך את הסיבוב  רק אם הערכים :נול ו אנדיפיינד
//!! שלא כמו || שימשיך הלאה בכל :פולסי
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect); //0

///////////////////////////////////////
// Short Circuiting (&& and ||)


console.log('---- OR ----');
//!!מחזיר את ה:טרוסי הראשון או אם כולם :פולסי אז את האחרוןמביהם
//!!יעיל לשימוש להשמת ערך ברירת מחדל


// Use ANY data type, return ANY data type, short-circuiting
console.log(3 || 'Jonas'); //3
console.log('' || 'Jonas'); //jonas
console.log(true || 0); //true
console.log(undefined || null); //null//בגלל שהערך הראשון הוא :פולסי אז הוא ממשיך לאפשרות הבאה ומחזיר אותה אע"פ שגם היא : פולסי

console.log(undefined || 0 || '' || 'Hello' || 23 || null); //hello

//!! Practical example
restaurant.numGuests = 23; //
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);
//🔽=
const guests2 = restaurant.numGuests || 10;
console.log(guests2); //23
//**11**
//ואם אין בכלל ערך  במשתנה למעלה או שהוא שווה ל 0  אז נקבל 10!!

console.log('---- AND ----');
//!!מחזיר את ה:פולסי הראשון או אם כולם :טרוסי אז את ה:טרוסי האחרון
יעיל לשימוש להפעלת פונקציה בערך השני בתנאי שהערך הראשון נכון!! 
//long -circuting
console.log(0 && 'Jonas'); //0
console.log(7 && 'Jonas'); //joanas //כי ממשיך ומחזיר את הערך האחרון
console.log(7 && 'Jonas' && 0); //0
console.log('Hello' && 23 && null && 'jonas'); //null

//!! Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}
//🔽=
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

///////////////////////////////////////
// Rest Pattern and Parameters

//  בולוקח מספר ערכים ואורז אותם למשתנה מסוג מערך  נשתמש בו במקום בו היינו רוצים לכתוב מ"""משתנים""" המופרדים בפסי !!
// !! מתאים לעבודה כמשתנה לקבלת ארגומנט בהגדרת הפונקציה


// 1) Destructuring

// SPREAD, because on RIGHT side of =
const arr = [1, 2, ...[3, 4]];
*
// REST, because on LEFT side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others, typeof others); //1 2 (3) [3, 4, 5] 'object'
//!! כל מיני תוצאות של הדפסה
// console.log(...others); //3 4 5
// console.log(others); //(3) [3, 4, 5]
// console.log(`hihi ${others}`); //hihi 3,4,5
//~~~!! עלה בידנו כשהופכים מערך למחרוזת אז היא שווה למשתני המערך מופרדים מפסיק
//********************דוגמאות
const arr = [1, 2, 3, 4];
console.log(arr); ////[1, 2, 3, 4]
const x = String(arr);
console.log(x);//1, 2, 3, 4;
console.log(' ' + arr + ' '); // 1,2,3,4
//********************
console.log(`hihi ${...others}`);//Uncaught Uncaught SyntaxError: Unexpected token '...' (at script.js:190:21)


const [pizza1, , risotto1, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza1, risotto1, otherFood); //~Pizza Risotto (4) ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']
//**זה כולל את כל המשתנים אחרי האחרון ולא כולל את המשתנים שדילגנו עליהם ולכן הוא חייב להיות האחרון

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays); //{thu: {…}, fri: {…}}

// 2) Functions
const add = function (...numbers) {
  //packed the value into an array
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(numbers, numbers.length);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x); //unpacked the values -> [23, 5, 7] 3->** הארגומנט :רסט שבפונקציה אורז את זה למערך באורך שלושה איברים
//~a=23,b=5,c=7// כאילו הכנסו את הערכים לשלושה משתנים שונים
//
add(x); //[Array(3)] 1
//** הארגומנט :רסט שבפונקציה אורז את זה למשתנה אחד שמכיל מערך 
//כאילו הכנסו את המערך שלמשתנה אחד
//a=x
console.log(x); //(3) [23, 5, 7]
console.log(...x); //23 5 7

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach'); //mushrooms;
// (3) ['onion', 'olives', 'spinach']
restaurant.orderPizza('mushrooms');//mushrooms;
 //[]

///////////////////////////////////////

// The Spread Operator (...)
//!! מרחיב מערך למשתניו- נעזר בו במיקום שבו היינו רוצים לרשום """ערכים""" מופרדים בפסיק
//!!מתאים לעבודה כשליחה של פרמטר מפונקציה
//!!    x = [...arr]; x=arr  למעשה 2 הפעולות הנ"ל זהות

const arr = [7, 8, 9];
// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);//~[1, 2, 7, 8, 9]

// const newArr = [1, 2, arr];// ~ [1, 2, Array(3)]
// console.log(newArr);//~[1, 2, 7, 8, 9] (as array)

// console.log(...newArr); //~1 2 7 8 9 (as variabels value)🔽=
// console.log(1, 2, 7, 8, 9);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// // Copy array
const mainMenuCopy = [...restaurant.mainMenu]; //~['Pizza', 'Pasta', 'Risotto'] 🔽=
//const mainMenuCopy = restaurant.mainMenu;
console.log(mainMenuCopy);

// // Join 2 arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

//~ ** the spread poerator worked on all iterable
// // Iterables: arrays, strings, maps, sets. !!NOT objects

const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters); //~['J', 'o', 'n', 'a', 's', ' ', 'S.']
console.log(...str); //~J o n a s
// console.log(`${...str} Schmedtmann`);XX ~unespected token

// Real-world example
const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"), //~להדפיס גרש בתוך גרש** =('Let\'s make pasta! Ingredient 1?')
//   prompt('Ingredient 2?'),
//   prompt('Ingredient 3'),
// ];
console.log(ingredients);

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);//~🔽=
restaurant.orderPasta(...ingredients);

// // Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

// //!! העתקת אובייקט ושינוי ערך רק לאחד מהם
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name); //Ristorante Roma
console.log(restaurant.name); //Classico Italiano

// ///////////////////////////////////////
// // Destructuring Objects
// //!!חייבים לקרוא למשתנים שאליהם מכניסים את שמות הערכים של האובייקט בשמות שמהן אני רוצה לקחת ערך
//  **הרבה פעמים פונקציה מקבלת הרבה פרמטרים וזה מבלבל איזה פרמטרים היא קיבלה אז מה שעושים זה ששולחים לפונקציה אובייקט והפונקציה עושה לו :דיסרקטינג
//!!~By default, the object key name becomes the variable that holds the respective value

//// const {}

// כאן אנו מראים דוגמא איך אפשר שהפונקציה  תקלוט את הערכים ששלחנו  בסדר שונה מסדר הערכים המובנה באובייקט ששלחנו
//~ orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
//     console.log(
//       `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
//     );

// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via del Sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// }); //`Order received! Garlic Bread and Risotto will be delivered to Via del Sole, 21 at 22:30

// //~!! אפשר לשלוח רק חלק מהערכים בתנאי שלשאר האחרים יש ברירת מחדל, מה שלא מוגדק יהיה :אנדיפיינד
// restaurant.orderDelivery({
//   address: 'Via del Sole, 21',
//   starterIndex: 1,
// });

// restaurant.orderDelivery({
//   address: 'Via del Sole, 21',
//   starterIndex: 1,
// });

// //!!חייבים לקרוא למשתנים שאליהם מכניסים את שמות הערכים של האובייקט בשמות שמהן אני רוצה לקחת ערך
// { name, openingHours, categories }= restaurant;
// console.log(name, openingHours, categories);
// //!!אם אני רוצה ששמות המשתנים יהיו שונים משמות ערכי האובייקט
// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags);

// Default values
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// Mutating variables
// let a = 111;
// let b = 999;

// const obj = { a: 23, b: 7, c: 14 };
// // ~we cant do cost or let becouse a and b are already decleared
// //{a,b}={ a: 23, b: 7, c: 14 };// ~XX becouse JS espcts {} code block ..so the trick is to put it into parenthesis

//!!ההגדרה הבסיסית
// const obj = { a: 23, b: 7, c: 14 };
// ({ a, b } = obj);
// console.log(a, b); //~23,7

// Nested objects
// const { fri } = openingHours;
// console.log(fri); //~{"open": 11,    "close": 23}

// const {
//   fri: { open, close },
// } = openingHours;
// console.log(open, close); //~11 23

// //~assigning different variables
// const {
//   fri: { open: o, close: c },
// } = openingHours;
// console.log(o, c);

///////////////////////////////////////
// Destructuring Arrays ~implement value from array into variables
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z); //2 3 4
console.log(arr);//[2, 3, 4]

// ex-2
// השמה של חלק מהמערך

const t = [4, 5, 6];
const [x, y] = t;
console.log(x, y);//~4,5

// השמה של המערך בדילוגים

let [main, , secondary] = restaurant.categories; //** אם רוצים לשנות צריך לשנות מקונסט ללט
console.log(main, secondary); //~Italian Vegetarian

// Switching variables
const temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary);

[main, secondary] = [secondary, main];
console.log(main, secondary);

// Receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// Nested destructuring
const nested = [2, 4, [5, 6]];
const [i, , j] = nested;//2,[5,6]
const [i, , [j, k]] = nested; //2,5,6
console.log(i, j, k);

// Default values
~
const x = [2, 3, 4];
const [a, b] = x;
console.log(a, b);//2,3
~
~** const [p , q , r ] = [8, 9];//~8,9,undifined
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);/~8,9,1

