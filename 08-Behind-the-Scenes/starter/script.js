'use strict';
///////////////////////////////////////
// Scoping in Practice

// function calcAge(birthYear) {
//   const age = 2037 - birthYear;

//   function printAge() {
//     let output = `${firstName}, you are ${age}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       var millenial = true;
//       // Creating NEW variable with same name as outer scope's variable
//       const firstName = 'Steven';
//       !!  משתנה שונה לגמרי ממשתנה באותו שם בדרגת אב ולכן לא ישפיע על ערכו

//       // Reasssigning outer scope's variable
//       !!כן ישנה את המשתנה באותו שם בדרגת אב
//       output = 'NEW OUTPUT!';

//       const str = `Oh, and you're a millenial, ${firstName}`;
//       console.log(str);

//       function add(a, b) {
//         return a + b;
//       }
//     }
//     // console.log(str);
//     console.log(millenial);
//     // console.log(add(2, 3));
//     console.log(output);
//   }
//   printAge();

//   return age;
// }

// const firstName = 'Jonas';
// calcAge(1991);
// console.log(age);
// printAge();

///////////////////////////////////////
// //Hoisting and TDZ in Practice

// Variables
// console.log(me); // ~undifined
// // console.log(job);//~canot access
// // console.log(year);//~canot access

// var me = 'Jonas';
// let job = 'teacher';
// const year = 1991;

// // Functions
// console.log(addDecl(2, 3)); //~5
// // console.log(addExpr(2, 3));//when it const ->cannot access //when it var->"addaroow is not a function" (becouse it is now like var that undifined)
// console.log(addArrow); //-"-
// // console.log(addArrow(2, 3));//

// function addDecl(a, b) {
//   return a + b;
// }

// const addExpr = function (a, b) {
//   return a + b;
// };

// var addArrow = (a, b) => a + b;

// // Example
// console.log(undefined);
// if (!numProducts) deleteShoppingCart(); // **הפונקציה שלהלן  תתבצע בגלל שהערך של ההפרמטר הוא :אנדיפיינד

// var numProducts = 10;

// function deleteShoppingCart() {
//   console.log('All products deleted!');
// }

// var x = 1;
// let y = 2;
// const z = 3;

// console.log(x === window.x); //~true
// console.log(y === window.y); //~false
// console.log(z === window.z); //~false

// ///////////////////////////////////////
// // The this Keyword in Practice
// console.log(this);

// const calcAge = function (birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this); //~undefined
// };
// calcAge(1991);

// const calcAgeArrow = birthYear => {
//   console.log(2037 - birthYear);
//   console.log(this); //~window
// };
// calcAgeArrow(1980);

// const jonas = {
//   year: 1991,
//   calcAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);
//   },
// };
// jonas.calcAge();

// const matilda = {
//   year: 2017,
// };

// matilda.calcAge = jonas.calcAge;
// matilda.calcAge(); //~ 20 <- "this." will point matilda

// const f = jonas.calcAge;
// f(); //~undefind (f() it's only regular function that not atached to any object)

///////////////////////////////////////
// Regular Functions vs. Arrow Functions
// var firstName = 'Matilda';

// const jonas = {
//   firstName: 'Jonas',
//   year: 1991,
//   calcAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);
//   },
//   greet: () => console.log(`Hey ${this.firstName}`),
// };
// jonas.greet();
// //~' Hey undifined" -> the arrow function doesnt have this keyward so it go to the "window" object but if we defined var firstName= matilda->"hey matilda"---->!! never use "arrow function" as a method

//Solution 1
// const self = this; // self or that
// const isMillenial = function () {
//   console.log(self);
//   console.log(self.year >= 1981 && self.year <= 1996);
// };
//!! if we write only "this. " we get error becouse "this. in a regular function and is undefined
// Solution 2
//     const isMillenial = () => {
//       console.log(this);
//       console.log(this.year >= 1981 && this.year <= 1996);
//     };
//   isMillenial();
//   },
//!! its work becouse  "arrow function " use the this. fron its parent scope("jonas")

//   greet: () => {
//     console.log(this);
//     console.log(`Hey ${this.firstName}`);
//   },
// };
// jonas.greet();
// jonas.calcAge();

// // arguments keyword
// const addExpr = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };
// addExpr(2, 5);
// addExpr(2, 5, 8, 12); //** יכול לקבל יותר ערכים ממספר הארגומנטים שמוכרזים- אפשר לעבור ע"י מערך על זה/

// // var addArrow = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };
// addArrow(2, 5, 8);**~ ERROR לא יכול לקבל יותר ערכים ממספר הערכים המוצהרים

///////////////////////////////////////
// Objects vs. primitives
// let age = 30;
// let oldAge = age;
// age = 31;
// console.log(age);
// console.log(oldAge);

// const me = {
//   name: 'Jonas',
//   age: 30,
// };
// const friend = me;//** השוואת שני אובייקטים
// friend.age = 27;
// console.log('Friend:', friend);//**~jonas,27
// console.log('Me', me);//**~ jonas, 27
// !!כשיש שני אובייקים שהשוונו אז כשמשנים ערך של אחד גם של השני ישתנה

///////////////////////////////////////
// Primitives vs. Objects in Practice

// Primitive types
// let lastName = 'Williams';
// let oldLastName = lastName;
// lastName = 'Davis';
// console.log(lastName, oldLastName); //~Davis,Williams

// // Reference types
// const jessica = {
//   firstName: 'Jessica',
//   lastName: 'Williams',
//   age: 27,
// };
// const marriedJessica = jessica;
// marriedJessica.lastName = 'Davis'; // ** אפשר לשנות ערך של אובייקט אע"ם שהוא :קונסט
// console.log('Before marriage:', jessica);
// console.log('After marriage: ', marriedJessica); // אותו דבר**
// // marriedJessica = {};// ** זה לא אפשרי כי זה :קונסט ואי אפשר לשנות את כל האובייקט אם זה היה :לעט אז היה אפשרי

// // // Copying objects
// const jessica2 = {
//   firstName: 'Jessica',
//   lastName: 'Williams',
//   age: 27,
//   family: ['Alice', 'Bob'],
// };

// const jessicaCopy = Object.assign({}, jessica2); //!!יצרנו אובייקט חדש ב:היפ(ערימה)
// jessicaCopy.lastName = 'Davis';

// jessicaCopy.family.push('Mary');
// jessicaCopy.family.push('John');

// console.log('Before marriage:', jessica2);
// console.log('After marriage: ', jessicaCopy);
// */
// !! אמנם עשינו שיבוט מוצלח ששומר על הנתונים אבל הוא שטחי , כלומר הוא שומר על הנתונים הישנים כפי שראינו אבל רק ברמה אחת אבל אם אחד הערכים יהיה בעצמו אובייקט(כמו מערך) אז אם נשנה את ערך המערך של השיבוט גם הערכים של של המערך המקורי ישתנו בגלל שלשני האובייקטים יש ערך :פעמעלי שמצביע לאותו מקום בזיכרון הערימה (MEMORY HEAP)
