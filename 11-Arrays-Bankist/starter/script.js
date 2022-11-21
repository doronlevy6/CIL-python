'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; // ** innerHTML (property) ->overwriting
  // ** אם רוצים רק להוסיף עדיף insert AdjacentHTML (method)

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html); // ** אם היינו עושים :ביפור אנד אז כל הערכים היו מהסוף להתחלה כי כל ערך יהיה לפני האחרון
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

//calcDisplayBalance(account1);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
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
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
// !! בטפסים שמקישים אנטר על אחד השדות זה שולח את הטופס
//!!whenever you work with elements with unwanted default behavior, just call the preventDefault() method to get rid of this.

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('p');
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ''; //** assiments oprator work from right to left

    inputLoginPin.blur(); //בכדי שהעכבר לא יהיה בשדה

    // // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
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

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23) // **בפיינד אינדקס אפשר להכניס תנאים מורכבים

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
// **  LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


/////////////////////////////////////////////////
// Simple Array Methods

let arr = ['a', 'b', 'c', 'd', 'e']; // ** (start,end)

// SLICE  //* לא משנה את המערך המקורי
console.log(arr.slice(2));
console.log(arr.slice(2, 4)); //['d', 'e']
console.log(arr.slice(-2)); //['d', 'e']
console.log(arr.slice(-1)); //['e']
console.log(arr.slice(1, -2)); //['b', 'c']
console.log(arr.slice()); //['a', 'b', 'c', 'd', 'e']
console.log([...arr]); //['a', 'b', 'c', 'd', 'e']
console.log(arr); //~['a', 'b', 'c', 'd', 'e']

//// SPLICE // ** משנה את המערך המקורי

console.log(arr.splice(2)); // ** אותו דבר כמו סלייס רק שגוזר את הערכים האלה מהמערך המקורי
console.log(arr); // ['a', 'b']
arr = ['a', 'b', 'c', 'd', 'e'];
arr.splice(-1);
console.log(arr); //['a', 'b', 'c', 'd']
arr.splice(1, 2); // ארגומנט ראשון מאיזה נק לחתוך ארגומנט שני כמה ערכים סה"כ לחתוך
console.log(arr); //['a', 'd']

//// REVERSE   // ** משנה את המערך המקורי
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f']; //
console.log(arr2.reverse()); //['f', 'g', 'h', 'i', 'j']
console.log(arr2); //['f', 'g', 'h', 'i', 'j']

//// CONCAT
const letters = arr.concat(arr2);
console.log(letters); //['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
console.log([...arr, ...arr2]);//['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

//// JOIN
console.log(letters.join(' - '));


///////////////////////////////////////
// The new at Method   // משתמשים בו בעיקר לקבל את הערך האחרון במערך
const arr = [23, 11, 64];
console.log(arr[0]); //23
console.log(arr.at(0)); //23

// getting last array element

console.log(arr[arr.length - 1]); //64
console.log(arr.slice(-1)[0]); //64

console.log(arr.at(-1)); //64


// עובד גם על מחרוזות
console.log('jonas'.at(0)); //j
console.log('jonas'.at(-1)); //s


///////////////////////////////////////
// Looping Arrays: forEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('---- FOREACH ----'); // אומרים למתודה :פוראיץ' מה לעשות בכל ערך -חייב להיות פונקציה.
// זה למעשה פונקציה עליונה-פוראיץ' ופונקצית קולבק - מה שבסוגריים

movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...
// ** אי אפשר לעשות ברייק בפוראיץ' זה רץ עד הסוף

///////////////////////////////////////
// forEach With Maps and Sets
// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  // הערך השני הוא גם ואליו
  // שכותבים _ זה אומר שזה ערך שלא משתמשים בו
  console.log(`${value}: ${value}`);
});

///////////////////////////////////////
// // Coding Challenge #1


// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

// 1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
// 4. Run the function for both test datasets

// HINT: Use tools from all lectures in this section so far 😉

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// GOOD LUCK 😀


const julias = [3, 5, 2, 12, 7];
const Kates = [4, 1, 15, 8, 3];
// const julias = [9, 16, 6, 8, 3];
// const Kates = [10, 5, 6, 1, 4];
checkDogs(julias, Kates);

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  // dogsJulia.slice(1, 3);
  const dogs = dogsJuliaCorrected.concat(dogsKate); **concate
  console.log(dogs);

  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);


///////////////////////////////////////
// The map Method
const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);
// אותה תוצאה 🔽
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (
    mov,
    i,
    arr // ** אמנם לא צריך פה תא :ארר אבל ניתן לקבל אותו כפרמטר
  ) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);


///////////////////////////////////////
// The filter Method
const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);


///////////////////////////////////////
// The reduce Method
console.log(movements);

// accumulator -> SNOWBALL

// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0); //         **הפרמטר השני הוא הערך ההתחלתי של ה :אקיומולטור

const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);

///////////////////////////////////////
// // Coding Challenge #2



// Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

// 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
// 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
// 4. Run the function for both test datasets

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

// GOOD LUCK 😀


// ~ פתרון שלי
const calcAverageHumaneAge = function (ages) {
  let x = ages.map(age => (age <= 2 ? age * 2 : 16 + age * 4));
  x = x.filter(a => a > 18);
  x = x.reduce((acc, a) => acc + a, 0) / x.length;
  return x;
};
console.log(calcAverageHumaneAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumaneAge([16, 6, 10, 5, 6, 1, 4]));

// פתרון ג'ונה
const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanAges.filter(age => age >= 18);
  console.log(humanAges);
  console.log(adults);

  // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;

  const average = adults.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );

  // 2 3. (2+3)/2 = 2.5 === 2/2+3/2 = 2.5

  return average;
};
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);


///////////////////////////////////////
// The Magic of Chaining Methods
const eurToUsd = 1.1;
console.log(movements);

// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);// בכדי לבדוק האם הנתונים הפונקציה מקבלת נכונים
    return mov * eurToUsd;
  })
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

///////////////////////////////////////
// // Coding Challenge #3


// Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

// GOOD LUCK 😀

// פתרון שלי

const calcAverageHumaneAge = ages =>
  ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(a => a >= 18)
    .reduce((acc, a, i, arr) => acc + a / arr.length, 0);

console.log(calcAverageHumaneAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumaneAge([16, 6, 10, 5, 6, 1, 4]));

const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// adults.length

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);


///////////////////////////////////////
// The find Method // כמו פילטר רק שמחזיר רק   את  ערך האלמנט הראשון במערך שעונה על התנאי
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements); //[200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(firstWithdrawal); //-400

console.log(accounts); //[{…}, {…}, {…}, {…}]
// מוצא אובייקט ע"פ המאפיינים שלו
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);//{owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'jd'}


///////////////////////////////////////
// some and every // boolean
console.log(movements);

// EQUALITY
console.log(movements.includes(-130));

// SOME: CONDITION  //~**return true if there is at least one 
console.log(movements.some(mov => mov === -130)); // true

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// EVERY  // if all thr element = condition
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));


///////////////////////////////////////
// flat and flatMap
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); //[1, 2, 3, 4, 5, 6, 7, 8]

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat()); //[Array(2), 3, 4, Array(2), 7, 8]
console.log(arrDeep.flat(2)); //[1, 2, 3, 4, 5, 6, 7, 8]

// flat  //מעבירים את כל התנועות של כל החשבונות למערך אחד משטיחים וסוכמים
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// flatMap  //=🔼
const overalBalance2 = accounts
  .flatMap(acc => acc.movements) //משטיח רמה אחת
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);


///////////////////////////////////////
// Sorting Arrays  

//!! בכדי לא לשנות את הסדר המקורי כדי להוסיף :סלייס
//!! arr.slice().sort(....)
// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); //**  mutate the array
console.log(owners); //['Adam', 'Jonas', 'Martha', 'Zach'];

// Numbers
console.log(movements.sort()); //[-130, -400, -650, 1300, 200, 3000, 450, 70] ** XX בגלל שעושה את המיון על בסיס מחרוזת אז מסדר לפי סדר הספרות ולא ערך המספרים

//!! sort call backfunction
// return <= 0, A, B (keep order)
// return > 0, B, A (switch order)

// // Ascending  // כך גם נמיין מערכים המכילים מחרוזות
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements); //[-650, -400, -130, 70, 200, 450, 1300, 3000]

// // Descending
// // movements.sort((a, b) => {
// //   if (a > b) return -1;
// //   if (a < b) return 1;
// // });
movements.sort((a, b) => b - a);
console.log(movements); //[3000, 1300, 450, 200, 70, -130, -400, -650]

*
///////////////////////////////////////
// More Ways of Creating and Filling Arrays

//fill / from 

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7)); //[1, 2, 3, 4, 5, 6, 7]

//// Empty arrays + fill method

const x = new Array(7);
console.log(x); //[empty × 7]
// console.log(x.map(() => 5)); // לא עובד כי רק :פיל עובד על מערך ריק

//x.fill(1); // [1, 1, 1, 1, 1, 1, 1]
x.fill(1, 3, 5); //[empty × 3, 1, 1, empty × 2] (value,startindex,endindex)
console.log(x);

arr.fill(23, 2, 6); //[1, 2, 23, 23, 23, 23, 7]
console.log(arr);

// Array.from // זה למעשה כמו מתודת : מאפ**
const y = Array.from({ length: 7 }, () => 1); //[1, 1, 1, 1, 1, 1, 1]
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1); // [1, 2, 3, 4, 5, 6, 7]
console.log(z);

//querySelectorAll- מחזיר :נוד ליסט של כל האלמנטים אבל הוא לא מערך אמיתי לכן אין לו את כל המתודות כגון מאפ או רדיוס ונוכל להפוך אותו למערך ע"יי מתודת :פרום

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );

  // =🔽
  // const movementsUI = Array.from(
  //   document.querySelectorAll('.movements__value')
  // ).map(el => Number(el.textContent.replace('€', '')));
  console.log(movementsUI);

  // אפשרות נוספת להפוך את רשימת האלמנטים למערך רק שנצטרך לעשות את  מ:מאפ בנפרד
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});

// עובד על כל איטרבל
//string,map,sets
const d = 'doron';
const dd = Array.from(d);
console.log(dd); //['d', 'o', 'r', 'o', 'n']

!!// סיכום מתודות מערכים
// theory lectures - 138
//file:///C:/Users/USER001/OneDrive%20-%20TEL-AVIV%20MUNICIPALITI/Desktop/javascript/theory-lectures-v2.pdf

///////////////////////////////////////
// Array Methods Practice

// 1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

// 2.
// const numDeposits10001 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 1001).length;

// חישוב מספר אלמנטים במערך ע"י מתודת :רידיוס
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
// פרמטר קאונט מקבל את הערך התחלתי אפס ואחכ מעלים אותו באחד כל פעם שהתנאי מתקיים
console.log(numDeposits1000);

// Prefixed ++ oeprator
let a = 10;
console.log(++a);
console.log(a);

// 3. // שימוש ברידיוס להכנסת ערך לאובייקט
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

// // **** one line doesnt working 
//כי צריך שהרדיוס יחזיר את אותו סוג משתנה של הערך ההתחלתי שלו וכאן הוא מחזיר מאפיין והמשתנה ההתחלתי הוא אובייקט
// const { deposits, withdrawals } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((sums, cur) => (sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur), {
//     deposits: 0,
//     withdrawals: 0,
//   });
console.log(deposits, withdrawals);

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitzalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitzalize(word)))
    .join(' ');

  return capitzalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

///////////////////////////////////////


// // Coding Challenge #4


// Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
// Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

// HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
// HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

// TEST DATA:
// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] }
// ];

// GOOD LUCK 😀

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
console.log('p');

//my solutions
//1
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(...dogs);
//2

//const x = dogs.find(dog => dog.owners.some(a => a === 'Sarah'));//=🔽

const x = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  `Sarha dog's is eating to ${x.curFood > x.recFood ? 'much' : 'little'}`
);

//3
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatToolittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
//
console.log(ownersEatToolittle);

//4

console.log(
  `"${ownersEatTooMuch.join(
    ' and '
  )}'s dogs eat too much!" and "${ownersEatToolittle.join(
    ' and '
  )}'s dogs eat too little!" `
);
//5
const eatExactly = dogs.some(dog => dog.curFood === dog.recFood);
console.log(eatExactly);

//6
const eatOk = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(dogs.some(eatOk));

//7
const ArrEatOK = dogs.filter(eatOk);
console.log(ArrEatOK);

//8
const dogsCopy = dogs.slice().sort((a, b) => a.recFood - b.recFood);

console.log(dogsCopy);
console.log(dogs);

///jonas solutions

// // 1.
// dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));

// // 2.
// const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
// console.log(dogSarah);
// console.log(
//   `Sarah's dog is eating too ${
//     dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
//   } `
// );

// // 3.
// const ownersEatTooMuch = dogs
//   .filter(dog => dog.curFood > dog.recFood)
//   .flatMap(dog => dog.owners);
// // .flat();
// console.log(ownersEatTooMuch);

// const ownersEatTooLittle = dogs
//   .filter(dog => dog.curFood < dog.recFood)
//   .flatMap(dog => dog.owners);
// console.log(ownersEatTooLittle);

// // 4.
// // "Matilda and Alice and Bob's dogs eat too much!"
// //  "Sarah and John and Michael's dogs eat too little!"
// console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
// console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// // 5.
// console.log(dogs.some(dog => dog.curFood === dog.recFood));

// //6
// // current > recommended * 0.9 && current < recommended * 1.1;
// const checkEatingOkay = dog =>
//   dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

// console.log(dogs.some(checkEatingOkay));

// // 7.
// console.log(dogs.filter(checkEatingOkay));

// // 8.
// // sort it by recommended food portion in an ascending order [1,2,3]
// const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
// console.log(dogsSorted);
