// Exporting module
console.log('Exporting module');

// Blocking code
// דוגמא לבלוק שמעכב את הריצה של הקובץ המייבא אותו בגלל שהא-וויט טופ לבל מעכב את הריצה

// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finish fetching users');

const shippingCost = 10;
export const cart = [];

// אקספורט צריך תמיד להיות ברמה העליונה של המודול אם הוא יהיה בתוך בלוק זה לא יעבוד

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

// ייצוא דיפולט
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
