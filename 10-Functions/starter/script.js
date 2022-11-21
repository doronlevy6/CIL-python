'use strict';
/*
///////////////////////////////////////
// Default Parameters
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers //אפשר לשים כל ביטוי בברירת המחדל רק חשוב שהביטוי שהפרמטרים שבביטוי יהיו מוגדרים קודם
) {
  // ES5 // ~defa
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum, //flightNum:flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);

createBooking('LH123', 2);
createBooking('LH123', 5);

createBooking('LH123', undefined, 1000); //אם רוצים לדלג על פרמטר מסוים אז נגדיר אותו כאנדיפיינד

*/
///////////////////////////////////////
// How Passing Arguments Works: Values vs. Reference
// const flight = 'LH234';
// const jonas = {
//   name: 'Jonas Schmedtmann',
//   passport: 24739479284,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 24739479284) {
//     //alert('Checked in');
//   } else {
//     //alert('Wrong passport!');
//   }
// };

// checkIn(flight, jonas);
// console.log(flight); // string --> "LH234"
// console.log(jonas); //object-->"Mr. Jonas Schmedtmann"

// // Is the same as doing...
//!!
// // const flightNum = flight;// משתנה חדש בעל אותו ערך
// // const passenger = jonas;//משתנה חדש בעל אותו ערך רק שהערך שלו זה למעשה  רפרנס שמצביע על הכתובת שבה נמצאים כל שדות האובייקט וערכיהם

// // לכן שמשנים את הערך של השדות הם משתנים בשני האובייקטים כי שניהם מצביעים לאותה כתובת
// //בקבוצה זו נמנים 3 סוגים: Object, Array ו-Function.
// //בג.ס העברת הארגומנטים לפונקציה היא ע"י ערך בלבד רק שהערך בהעברת אובייקט הוא הכתובת שלו בזיכרון
//!!
// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 100000000000);
// };

// newPassport(jonas);
// checkIn(flight, jonas);
// console.log(jonas.passport); //~משתנה רנדומלי
// /*
///////////////////////////////////////
// Functions Accepting Callback Functions

//לענ"דהפונקצית קולבק מוכרזת באופן רגיל לגמרי רק שמעבירים אותה בקוד ללא סוגריים כי לא רוצים שהיא תתבצע עד שהפונקציה העליונה תקרא לה
// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase(); // **ה:ג'י מחליף את כל הסימנים הזהים למה שבין ה/ /
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };
// //!! לענ"ד כשהפונקציה ה"עליונה" קוראת ל:קולבקפאנקשין רק אז היא מתבצעת
// // Higher-order function
// const transformer = function (str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`); //פה מתבצעת הקריאה לפונקצית קולבק

//   console.log(`Transformed by: ${fn.name}`); //לפונקציות יש לפעמים  גם מתודות  וגם פרופרטי
// };

// transformer('JavaScript is the best!', upperFirstWord); //~callback function
// transformer('JavaScript is the best!', oneWord);

// // JS uses callbacks all the times//examples
// const high5 = function () {
//   console.log('👋');
// };
// document.body.addEventListener('click', high5); //האדאיוונטךיסנר הוא הפונ' העליונה
// ['Jonas', 'Martha', 'Adam'].forEach(high5); //פוראיצ' היא הפונקציה העליונה

///////////////////////////////////////
// Functions Returning Functions /// הסבר טוב לנושא

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greeterHey = greet('Hey');
// greeterHey('Jonas');
// greeterHey('Steven');

// Challenge
// const greetArr = greeting => name => console.log(`${greeting} ${name}`);

// greetArr('Hi')('Jonas');

///////////////////////////////////////
// // The call and apply Methods
//chnging the value of
// // //!! בכדי לאפשר למתודה באובייקט מסויים לעבוד גם על אובייקטים אחרים

// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   // book: function() {}
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };

// lufthansa.book(239, 'Jonas Schmedtmann');
// lufthansa.book(635, 'John Smith');
// console.log(lufthansa);

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const book = lufthansa.book;

// // Does NOT work // **~its not a method ,its a regular function so the this keyward points to undefined
// // book(23, 'Sarah Williams');

// // Call method

// // ~** the first argument = what the "this" keward point to
// //** book is function so it is in fact an object so the "call" is a method

// book.call(eurowings, 23, 'Sarah Williams');
// console.log(eurowings);

// book.call(lufthansa, 239, 'Mary Cooper');
// console.log(lufthansa);

// const swiss = {
//   airline: 'Swiss Air Lines',
//   iataCode: 'LX',
//   bookings: [],
// };

// book.call(swiss, 583, 'Mary Cooper');
// /*
// // Apply method
// //** אותו דבר בדיוק כמומתודה  :קול רק בשונה ממנה הוא לא מקבל רשימה של פרמטרים אלא רק את הפרמטר הראשון שיחליף את :דיס ועוד פרמטר אחד שהוא למעשה מערך הכולל את שאר הארגומנטים שהפונקציה  :בוק מקבלת */
// const flightData = [583, 'George Cooper'];
// book.apply(swiss, flightData);
// console.log(swiss);
// //** אפפלי לא ככ שימושי כי אפשר ע"י המערך להשתמש בקול🔽גם  */
// book.call(swiss, ...flightData);
/*
// ///////////////////////////////////////
// The bind Method
//!!= partial application=part of the arguments of the original function are already applied
// book.call(eurowings, 23, 'Sarah Williams');

// **ע"י :ביינד אנחנו למעשה מעתיקים את המתודה ושולחים איתה גם ארגומנטים

const bookEW = book.bind(eurowings); //**now when we will execut bookEW it will be like execut book.call but with the first argument "eurowing" => bookEW(1,2)=book.call(euroWings,1,2)

const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann'); //=bookEW(23, 'Jonas Schmedtmann');
bookEW23('Martha Cooper');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlane();// אם המתודה היתה פועלת ישירות על האובייקט אז היינו מקבלים 301
//דוגמא שלא תעבוד
//document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);  ** // <button class="buy">Buy new plane 🛩</button>
// **becouse "this"  =button ; the button is the element that atteched to the  function
// דוגמא שכן תעבוד
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); //{airline: 'Lufthansa', iataCode: 'LH', bookings: Array(3), planes: 300, book: ƒ, …}
//301

//**call method will execute the function therefor  we use "bind" becouse we need to pass in a function and not to call it

//Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23); // rate=0.23 ->הפרמטר הראשון הוא ל:דיס אבל בגלל שאין בפונקציה דיס אז אנחנו שולים :נול ושאר הפרמטרים לפי סדר הארגומנטים
// =🔽
// // addVAT = value => value + value * 0.23;

//chalange =לעשות זאת אם פונקציה שמחזירה פונקציה
// לענ"ד - פונקציה שמחזירה פונקציה= כל פונקציה פנימית זה הארגומנט של הפונקציה הבא
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

/*
///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
/*
//////////// פתרון שלי
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  j: 0,
  registerNewAnswer() {
    let odaa = this.question + '\n';
    for (let i of this.options) {
      odaa += i + '\n';
    }
    const tshuva = prompt(odaa);

    this.answers[this.j] = tshuva;
    this.displayResults('s');

    this.j++;
  },

  displayResults(sora) {
    if (sora === 's') console.log(`Poll results are ${this.answers.join(',')}`);
    else console.log(this.answers);
  },
};
const x = poll.registerNewAnswer;
document.querySelector('.poll').addEventListener('click', x.bind(poll));
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 's');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });

// ** הסבר : שלחנו למעשה לפונקציה אובייקט שהוא למעשה יהווה את דיס
//אז כל קריאה לדיס תיהיה למעשה לאובייקט ששלחנו והיות ויש לו //מאפיין  אנסרס אז דיס אנסרס יפעל על הערך ששלחנו

/*
/////////////////////////////
פתרון של ג'ונה
////////////////
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // Get answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(answer);

    // Register answer
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');
  },

  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      // Poll results are 13, 2, 4, 1
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });

// [5, 2, 3]
// [1, 5, 3, 9, 6, 1]


///////////////////////////////////////
// Immediately Invoked Function Expressions (IIFE)

// ** כל פעם שאנחנו עושים פנקשיין אקספריישין אנחנו למעשה משתמשים בפונקציה אנונימוס ומכניסים אותה למשתנה

const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

// IIFE
// !!
// **  ע"י הסוגרים הפכנו את הסטייטמנט לאקספרשיין לולא זה היינו מקבלים טעות כי כמו שראינו בסטייטמנט לפונקציה חייב שיהיה שם אבל באקספרשיין היא יכולה להיות אנונימית
// https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/22648679#questions/16996828
// בגאוובסקריפט אין סטייטמנט בתוך סוגריים אז שהמנוע רואה סוגריים הוא מבין שמה שבתוכו זה לא סטייטמנט אלא אקספרשיין ולכן זה  כן יכול להיות ללא שם
//!!
(function () {
  console.log('This will never run again');
  const isPrivate = 23;
})(); // ע"י הסוגריים אנחנו קוראים לפונקציה

// console.log(isPrivate);

(() => console.log('This will ALSO never run again'))();

{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate);
console.log(notPrivate);


///////////////////////////////////////
// Closures
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

/*
///////////////////////////////////////
// More Closure Examples
// Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Re-assigning f function
h();
f();
console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
boardPassengers(180, 3);
/*

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

/*
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
*/
