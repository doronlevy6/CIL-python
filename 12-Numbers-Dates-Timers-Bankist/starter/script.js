'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 120;

  // Call the timer every second
  // בכדי שהקריאה לפונקציה תחל מיד ולא בהשהייה של שנייה  אז קראנו לה בתוך הפונקציה וגם קראנו לה אח"כ ע"י סטינרבל
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer; // בכדי לכבות טיימר מיוזר אחר

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', // "long" ->  Augustייתן את זה במילים
      // "2-digit"->08
      year: 'numeric',
      // weekday: 'long',
    };
    const locale = navigator.language;
    console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// LECTURES
//!!

///////////////////////////////////////
// Converting and Checking Numbers
console.log(23 === 23.0); //true

// Base 10 - 0 to 9. 1/10 = 0.1. 3/10 = 3.3333333
// Binary base 2 - 0 1

console.log(0.1 + 0.2); //0.30000000000000004
console.log(0.1 + 0.2 === 0.3); //false

// // Conversion
console.log(Number('23')); //=🔽
console.log(+'23');

// Parsing
//** מחזיר מספר רק עם הוא בהתחלה
console.log(Number.parseInt('30px', 10)); //30
console.log(Number.parseInt('e23', 10)); //NaN

console.log(Number.parseInt('  2.5rem  ')); //2
console.log(Number.parseFloat('  2.5rem  ')); //2.5

// ** הפונקציות האלו הן גם גלובליות כך שאפשר לקרוא להם בלי ההאובייקט נאמבר אבל מקובל בכל זאת לרשום אותו
console.log(parseFloat('  2.5rem  ')); //2.5

// // Check if value is NaN

console.log(Number.isNaN(20)); //false
console.log(Number.isNaN('20')); //false
console.log(Number.isNaN(+'20X')); //true- because its a string that we try to convert to number
console.log(Number.isNaN(23 / 0)); //false:Infinity

// // Checking if value is number

console.log(Number.isFinite(20)); //true
console.log(Number.isFinite('20')); //false
console.log(Number.isFinite(+'20X')); //false
console.log(Number.isFinite(23 / 0)); //false

//** if we use int
console.log(Number.isInteger(23)); //true
console.log(Number.isInteger(23.0)); //true
console.log(Number.isInteger(23 / 0)); //false

///////////////////////////////////////
// // Math and Rounding
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, '23', 11, 2)); //23
console.log(Math.max(5, 18, '23px', 11, 2)); //NaN

console.log(Math.min(5, 18, 23, 11, 2));

console.log(Math.PI * Number.parseFloat('10px') ** 2); //314.1592653589793

console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
// 0...1 -> 0...(max - min) -> min...max
console.log(randomInt(10, 20));

// // Rounding integers
console.log(Math.round(23.3)); //23
console.log(Math.round(23.9)); //24

console.log(Math.ceil(23.3)); //24
console.log(Math.ceil(23.9)); //24

console.log(Math.floor(23.3)); //23
console.log(Math.floor('23.9')); //23

console.log(Math.trunc(23.3)); //23

console.log(Math.trunc(-23.3)); //-23
console.log(Math.floor(-23.3)); //-24

// // Rounding decimals
// ** מ5 מעגל כלפי מעלה ומתחת ל5 כלפי מטה
//  לשים לב שהמתודה החזירה מחרוזת
const x = (2.7).toFixed();
console.log(x, typeof x); //3 , string
console.log((2.7).toFixed(3)); //2.700
console.log((2.345).toFixed(2)); //2.35

console.log(+(2.345).toFixed(2)); //3.5

///////////////////////////////////////
// The Remainder Operator
console.log(5 % 2);
console.log(5 / 2); // 5 = 2 * 2 + 1

console.log(8 % 3);
console.log(8 / 3); // 8 = 2 * 3 + 2

console.log(6 % 2);
console.log(6 / 2);

console.log(7 % 2);
console.log(7 / 2);

const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

//NodeList
//** you can actually call the .forEach() method directly on a NodeList. There's no need to convert it to an Array first.(Other available methods are: .item(), .keys(), .values() and .entries())

console.log(...document.querySelectorAll('.movements__row'));
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    // 0, 2, 4, 6
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    // 0, 3, 6, 9
    if (i % 2 === 1) row.style.backgroundColor = 'blue';
  });
});

///////////////////////////////////////
// Numeric Separators

// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter); //287460000000

const price = 345_99;
console.log(price);

const transferFee1 = 15_00; //1500
const transferFee2 = 1_500; //1500

// ** אי אפשר לשים קו תחתון שלא בין ספרות
// const PI = 3._1415;// XX
const PI = 3.1415;
console.log(PI); //3.145

console.log(Number('230000')); //230000
console.log(Number('230_000')); //NaN
console.log(parseInt('230_000')); //230

///////////////////////////////////////
// Working with BigInt
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(4838430248342043823408394839483204n);
console.log(BigInt(48384302)); // המתודה עובדת רק עם מספרים קטנים "יחסית

// Operations
console.log(10000n + 10000n); //20000n
console.log(36286372637263726376237263726372632n * 10000000n);
362863726372637263762372637263726320000000n;
// console.log(Math.sqrt(16n));//X

const huge = 20289830237283728378237n;
const num = 23;
//console.log(huge * num); //X
console.log(huge * BigInt(num)); //V

// Exceptions ****
console.log(20n > 15); //true
console.log(20n === 20); //false
console.log(20n == 20); //True

console.log(typeof 20n); //bigint
console.log(20n == '20');

console.log(huge + ' is REALLY big!!!');

// Divisions
console.log(11n / 3n); //3n
console.log(10 / 3);

///////////////////////////////////////
// Creating Dates

// Create a date

const now = new Date();
console.log(now); //Thu Sep 29 2022 09:12:26 GMT+0300 (שעון ישראל (קיץ))
console.log(now);
//** parse the time automatically
console.log(new Date('Aug 02 2020 18:05:41')); //Sun Aug 02 2020 18:05:41 GMT+0300 (שעון ישראל (קיץ))
console.log(new Date('2020-06-25T18:49:59.371Z'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5)); // ** החודש מתחיל ב0 - Thu Nov 19 2037 15:23:05 GMT+0200 (שעון ישראל (חורף))

console.log(new Date(2037, 10, 31)); // **auto corecction -Tue Dec 01 2037 00:00:00 GMT+0200 (שעון ישראל (חורף))

// ** ניתן להכניס אלפיות שנייה לאחר תאריך הבסיס
console.log(new Date(0)); //Thu Jan 01 1970 02:00:00 GMT+0200 (שעון ישראל (חורף))

console.log(new Date(3 * 24 * 60 * 60 * 1000)); // = שלושה ימים לאחר זמן הבסיס -נותנים את ההפרש באלפיות
//Sun Jan 04 1970 02:00:00 GMT+0200 (שעון ישראל (חורף))

// // Working with dates
const future = new Date(2037, 10, 12, 15, 23);
console.log(future); //Thu Nov 19 2037 15:23:00 GMT+0200 (שעון ישראל (חורף))
console.log(future.getFullYear()); //2037
console.log(future.getMonth()); //10
console.log(future.getDate()); //19 - היום בחודש
console.log(future.getDay()); //4 ** יום ראשון בשבוע מתחיל ב0
console.log(future.getHours()); //15
console.log(future.getMinutes()); //23
console.log(future.getSeconds()); //00
console.log(future.toISOString()); //2037-11-12T13:23:00.000Z
console.log(future.getTime()); //2141644980000  //timestamp
//הופכיים🔽🔼
console.log(new Date(2142256980000)); //Thu Nov 19 2037 17:23:00 GMT+0200 (שעון ישראל (חורף))

console.log(Date.now()); // מחזיר טיימסטמפ לעכשיו//1664434039617

future.setFullYear(2040); //Mon Nov 12 2040 15:23:00 GMT+0200 (שעון ישראל (חורף))
console.log(future);

///////////////////////////////////////
// Operations With Dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future); // Thu Nov 19 2037 15:23:00 GMT+0200 (שעון ישראל (חורף))
console.log(+future); //2142249780000

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24); // המרה מאלפיות ל

const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1); //10

/////////////////
// ~~~Internationalizing Date (Intl)

const now = new Date();
const x = new Intl.DateTimeFormat('de-DE').format(now);
console.log(new Date()); //Thu Sep 29 2022 12:42:51 GMT+0300 (שעון ישראל (קיץ))
console.log(x); //29.9.2022

///////////////////////////////////////
// Internationalizing Numbers (Intl)
// ** iso language code table- לינק למציאת הקודים

const num = 3884764.23;

//  **  בסטייל כותבים מאיזה סוג מבין הפרופרטי להלן יהיו היחידות שלנו
const options = {
  style: 'currency', // "unit" // "percent"
  unit: 'celsius', // mile-per-hour
  currency: 'EUR',

  // useGrouping: false, // ** מדפיס ללא הפרדת פסיקים
};

console.log('US:      ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria:   ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);

///////////////////////////////////////
// // Timers
// ** לא צריך להפעיל פונקציה זו היא פועלת לבד ע"פ הזמן שבאלפיות שניה
setTimeout(() => console.log('pp'), 1000);

// setTimeout

// אם רוצים להעביר נתונים לפונקציה אז מעבירים את הארגומנטים אחרי ארגומנט הזמן**
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
  3000,
  ...ingredients //"olive","spanich"
);
console.log('Waiting...');

// לביטול הטיימאווט
if (ingredients.includes('spinach123')) clearTimeout(pizzaTimer);

// setInterval
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 1000);
