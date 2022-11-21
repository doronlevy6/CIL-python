///////////////////////////////////////
// Exporting and Importing in ES6 Modules

// Importing module

//{ addToCart, totalPrice as price, tq } from '
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 5);

// console.log(price, tq);

console.log('Importing module');

// console.log(shippingCost);

// ייבוא באופן אחר
// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// add -  בעזרתו נייבא את ייצוא הדיפולט שבמודול הייצוא היתרון שלו שלו צריך סוגרים מסולסלות

// ייבוא של דיפולט ושם ביחד
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// אפשר לייבא דיפולט ושמות ביחד אבל זה לא מומלץ
// console.log(price);

import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart); //imports are not copies of the export.
//They are instead like a live connection,they point to some place in the memory

// ///////////////////////////////////////
// // Top-Level Await (ES2022)
/*
//** בגלל שזה מחוץ לפטנקצית א-סינק זה מעכב את ריצת הקוד
// console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  //   console.log(data);
  return { title: data.at(-1).title, text: data.at(-1).body }; // לקבלת האיבר האחרון במערך
};

// לא טוב

const lastPost = getLastPost();
console.log(lastPost); // לא מקבלים את האובייקט שרצינו אלא נקבל חזרה פרומיס
// כי קריאה לאסינק  תחזיר תמיד  פרומיס כי ברגע שאנחנו
//  עושים קונסול לוג לפונקציה המידע עוד לא התקבל

// // Not very clean-פתרון
// lastPost.then(last => console.log(last));

// פתרון טוב
const lastPost2 = await getLastPost();
console.log(lastPost2);

// אם אנחנו שמים טופ-לבל אוויט בקובץ שאנו מייבאים אז
//  הוא היות והקוד של הקובץ הזה קץ ראשון אז הוא יעכב את הקובץ שמייבא מלרוץ עד שהוא יסתיים לכן צריך לשים לב לזה במיוחד באוויט טופלבל
*/
// ///////////////////////////////////////
// // The Module Pattern- הדרך הישנה
// עןשים את זה באיפי מכיוון שאנו רוצים שזה יבוצע רק פעם אחת
/*
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (sipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    //כל מה שבפונקציה יהיה פרטי לכן אנו מחזירים אובייקט בעל מאפיינים ומתודות של כל מה שאנו רוצים שיהיה פבליק
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost, 'pp'); //undifined -כי לא החזרנו אותו

//אע"פ הפונקציה יצאה לפועל רק פעם אחת וכל מה שעשתה זה להחזיר אובייקט ואנחנו בחל זאת מצליחחם לעשות מניפולציות על הדתא שבתוך הפונקציה
// והסיבה שיש לנו גישה אל כל המאפיינים  שהפונקציה החזירה היא קלוז'ר
// closures,  allow a function to have access to all the variables that were present at its birthplace
*/
// ///////////////////////////////////////
// // CommonJS Modules-- worked only on node.js
// Export
// export.addTocart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(
//     `${quantity} ${product} added to cart (sipping cost is ${shippingCost})`
//   );
// };

// // Import
// const { addTocart } = require('./shoppingCart.js');
// ///////////////////////////////////////
// // Introduction to NPM
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// import { cloneDeep } from 'lodash-es'; // הפרסל יימצא אותו

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state); //משבט את האובייקט אבל כשמשנים את המקורי זה גם משנה את השיבוט
const stateDeepClone = cloneDeep(state); // שמשנים את המקורי השיבוט לא משתנה

state.user.loggedIn = false;
console.log(stateClone); // ...false

console.log(stateDeepClone); //... true

//  מונע טעינה מחדש של הדף בכל שינוי של המודולים
if (module.hot) {
  module.hot.accept();
}

// דוגמאות לאיך זה מומר לגרסה 5
class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}
const jonas = new Person('Jonas');

console.log('Jonas' ?? null);

console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));

import 'core-js/stable';
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// Polifilling async functions
import 'regenerator-runtime/runtime';

///////////////////////////
/*
קיצורי טרמינל

ctal+ l -/ claer
dir
cd(chang directory):
אחרי הסידי אפשר להתחיל לרשום שם של תיקיה ולהשלים עם טאב  
.. up
../.. up 2 level
mkdir "stamshem" - יצירת תיקיה
rmdir (remove directory)- מחיקת תיקייה
יצירת קובץ

type NUL > 'filename' -> type NUL > index.html
אפשר ליצור כמה קבצים במכה ע"י הפרדה ע"י רווח

del index.html  מחיקת קובץ

העברת קובץ לתיקייה אחרת
mv index.html ../       מעביר לתיקיית הורה

חץ למעלה
מעתיק את הפעולה הקודמת
***********************

יבוא מודולים


npm init ->  אז זה שואל שאלות טיוצר קובץ פקג' 
package.json

mpm i "nameofmodule" -  העלאת מודל

אחכ אם מוחק את המודלולים רק עושה
npm i 
ואז זה אוטמטית מעלה את המודולים שכתובים בפקג'


נוצרת תיקקיה חדש node_modules


ייבוא חבילה 
npn i leaflet

התקנת פרסל
npm install parcel-bundler --save-dev

מחיקת פרסל
npm uninstall parcel

npx parcel index.html

אפשר גם פשוט לכתוב את זה בקובץ הפקג' ולהריץ
npm run start
*/
