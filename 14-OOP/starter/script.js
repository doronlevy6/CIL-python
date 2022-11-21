'use strict';

///////////////////////////////////////
// Constructor Functions and the new Operator

const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
  // Never to this!
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const jonas = new Person('Jonas', 1991);

console.log('jonas', jonas);
/// ארבעה דברים מתרחשים כאשר יוצרים קונסטרקטור

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);

console.log(jonas instanceof Person); //True

// יצירת פונקציה סטטית
Person.hey = function () {
  console.log('Hey there 👋');
  console.log(this);
};
Person.hey();
Person.d = 'p';
// console.log(jonas.d); //XX
// jonas.hey(); //XX לא עובד כי זה כמו סטטיק מתוד ואין לאובייקט גישה לפונקציה כי היא לא בפרוטוטייפ
///////////////////////////////////////
// Prototypes

console.log('person:', Person);
console.log('Person.prototype :', Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// jonas.calcAge();
// matilda.calcAge();
//לכל מופע יש גישה למאפיינים והמתודות של הפרוטוטייפ שלו
//והפרוטוטייפ של ג'ונה הוא פרסון.פרוטוטייפ

console.log(jonas.__proto__);
console.log(Person.prototype);

console.log(jonas.__proto__ === Person.prototype); //True
//**הפרוטוטייפ של  אובייקט ג'ונה הוא למעשה המאפיין פרוטוטייפ של פרסון (שהוא פונקציית הקונסטרקטור)

console.log(Person.prototype.isPrototypeOf(jonas)); //True
console.log(Person.prototype.isPrototypeOf(matilda)); //TRue
console.log(Person.prototype.isPrototypeOf(Person)); //**False

//**פרסון.פרוטוטייפ הוא לא הפרוטוטייפ של פרסון אלא רק פרוטוטייפ של האובייקטים המקושרים אליו

// // .prototyeOfLinkedObjects

Person.prototype.species = 'Homo Sapiens';
console.log(jonas, matilda.species);

console.log(jonas.hasOwnProperty('firstName')); //True
console.log(jonas.hasOwnProperty('species')); //False( כי הא לא בתוך 
// האובייקט אלא רק יש גישה אליו  כי הוא  מאפיין בפרוטוטיים)

///////////////////////////////////////
// Prototypal Inheritance on Built-In Objects

console.log(jonas.__proto__);
// Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__);

console.log(jonas.__proto__.__proto__.__proto__);

console.log(Person.prototype.constructor); // ~pointback to Person itself
console.dir(Person.prototype.constructor); // ~pointback to Person itself

const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); //True

console.log(arr.__proto__.__proto__); // נראה את כל המתודות של אובייקט בגלל שארר._פרוטו_ הוא אובייקט

// הוספנו מתודה למאפיין "פרופרטי" של הקונסטרקטור של מערך
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1); //אפשר לראות את שרשרת הפרוטוטיים

console.dir(x => x + 1);


///////////////////////////////////////
// Coding Challenge #1


// 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
// 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

// DATA CAR 1: 'BMW' going at 120 km/h
// DATA CAR 2: 'Mercedes' going at 95 km/h

// GOOD LUCK 😀



// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);

// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// bmw.accelerate();



///////////////////////////////////////
// ES6 Classes

// Class expression

// const PersonCl = class {

//   }

// Class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    // המילה קונסטקטור חשובה
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  //// Instance methods-ישוייכו לפרוטוטייפ
  //// all the Methods outside the contructor  will be added to .prototype property and not in the objects themself
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Heyb ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  //!! כל פעם שנפעיל שנקרא לקונסטרקטור הוא יפעיל את הסעטער הזה
  // Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    //** 🔼בגלל שהשם של הסעטר הוא זהה לשם המאפיין אז צריך להכניס את הערך  למשתנה (הקונוונקציה היא להוסיף קו תחתון)בשם אחר
    // אחרת יהיה לופ כי הסעטטר מתייחס אל המאפיין שהוא מצידו שוב קוקר לסטטר וחלילה
    else alert(`${name} is not a full name!`);
  }
  // בשלב הזה המאפיין החדש (עם הקו התחתון ) יכיל את  הערך הנכון והמאפיין המקורי יהיה
  // אנדיפיינד מפני שכל פעם שניסיו להכניס לו ערך הוא רק קרא לסטטר שבאותו שם אך לעצמו למעשה לא הוזן כלוםץ על מנת לסדר זאת נוסיף את 🔽הגעטטר להלן והא יעניק למאפיין המקורי את אותו ערך של  המאפיין החדש

  get fullName() {
    return this._fullName;
  }

  //** סטטיק- מתודה שקשורה לקונסטרקטור עצמו בלבד והאובייקטים לא יורשים אותה
  // כמו Array.from, Number.parseFloat

  // יצירת סטטיק מתוד בתוך הקלאס
  // // Static method
  static hey() {
    console.log('Hey there 👋');
    console.log(this);
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);

console.log(jessica);



jessica.calcAge();
console.log(jessica.age); //41

console.log(jessica.__proto__ === PersonCl.prototype); //true

// אפשר גם כך
PersonCl.prototype.greet = function () {
  console.log(`Heya ${this.fullName}`);
};

jessica.greet();

// // 1. Classes are NOT hoisted(מונף) // ** אע"פ שניתן להשתמש בפונקציה לפני הדקלרשיין שלה בקלאס אי אפשר

// // 2. Classes are first-class citizens//אפשר להעביר אותם לפונקציות וכן להחזירם

// // 3. Classes are executed in strict mode

// const walter = new PersonCl('Walter White', 1965);
PersonCl.hey();

///////////////////////////////////////
// Setters and Getters
// כשרוצים לפנות לפעולה מסויימת כמאפיין
//** למעשה כשעושים סטטר באותו שם של המאפיין אז כל פעם שננכניס ערך למאפיין ישירות הוא יקרא לסטטר ויתבצע הקוד בסטטר בלבלד מבלי להכניס ערך למאפיין המקורי(אלא אם הסטטר מכניס אליו ערך)
const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);

account.latest = 50; // =accoount.latest(50)  רק שכאן זה לא יעבוד כי זה לא מוגדר כפונקציה אלא כמאפיין בגלל הסט/גט
console.log(account.movements);

// הגטטר והסעטטר הם למעשה מתודות שמיוצרות בפרוטוטייפ
// אם נעשה מופע של הקלאס אז הדפדפן יראה לנו, בטעות, 
כאילו המתודה שייכות למופע (הוא עושה זאת כנראה כי כך נראית ההתנהגות של המתודה
  אבל אם למעשה הוא לא מתודה של המופע אלא רק של הפרוטוטייפ של הקלאס והא רק יורש ממנה את הפרוטוטייפ
  (ניתן לראות דוגמא טובה בשאלה ששאלתי שנקראית 214 6:08)

///////////////////////////////////////
// Object.create
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    // זה יכול להיות בכל שם**
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto); // אנו שותלים למופע "סטיבן" כמאפיין פרוטוטייפ את האובייקט פרסוןפרוטו

console.log(steven);

//console.log(Object.hasOwn(steven, 'calceage'));~ false
console.log(Object.hasOwn(PersonProto, 'calceage')); //~ false

steven.name = 'Steven';
steven.birthYear = 2002;
console.log(Object.hasOwn(steven, 'name')); //True
/*
steven.calcAge();
console.log(steven);

console.log(steven.__proto__ === PersonProto); //true

// הגדרה באופן נכון יותר
const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979); // זה אמנם דומה לקונסרקטור בשיעור הקודם אך למעשה זה לא קשור
sarah.calcAge();

///////////////////////////////////////
// Coding Challenge #2

 
// 1. Re-create challenge 1, but this time using an ES6 class;
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
// 4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

// DATA CAR 1: 'Ford' going at 120 km/h

// GOOD LUCK 😀

// //////////////////////
// class CarCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//   }

//   brake() {
//     this.speed -= 5;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//   }

//   get speedUS() {
//     return this.speed / 1.6;
//   }

//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const ford = new CarCl('Ford', 120);
// console.log(ford.speedUS);
// ford.accelerate();
// ford.accelerate();
// ford.brake();
// ford.speedUS = 50;
// console.log(ford);

///////////////////////////////////////
// Inheritance Between "Classes": Constructor Functions

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;// אפשרי לעשות כך אך פחות מקובל
  // this.birthYear = birthYear;
  Person.call(this, firstName, birthYear); // אם נקרא לפרסון ישירות כפונקציה רגילה( ללא
  //  המתודה קול) אז דיס שבפונקציה פרסון יהיה אנדיפיינד
  // ,כי כך הוא מוגדר בקריאה לפונקציה רגילה
  // ע"י המתודה קולת אנו למעשה שולחים כפרמטר הראשון את
  //דיס וכרגע הוא שייך לפונקצית הקונסטרקטור סטודנט אז עכשיו שאנו קוראים לפונקציה פרסון היא תפעל כמו הפונקציה פרסון המקורית רק בהבדל אחד שבכל פעם שכתוב בה דיס הכוונה יהיה לסטודנט
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

// console.log(Person.prototype); //{calcAge: ƒ, constructor: ƒ}

// console.log(Student.prototype); //Person {}
//[[Prototype]]: Object

// דקה 13
//Student.prototype = Person.prototype;// אם היינו עושים כך אז היינו גורמים לכך שפרסון
// פרוטוטייפ יהיה הפרוטוטייפ של סטודנט ו
//console.log(Student.prototype)//{calcAge: ƒ, constructor: ƒ}
//אבל זה לא מה שאנו
// אלא רוצים  רק  שסטודנט .פ יירש מפרסון.פ

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
const mike = new Student('Mike', 2020, 'Computer Science');

console.log(mike);

mike.introduce();

mike.calcAge();

console.log(mike.__proto__);

console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student); //true
console.log(mike instanceof Person); //true - בגלל שקישרנו אותם ביחד לעיל
console.log(mike instanceof Object); //true

console.log(Student.prototype.constructor); //person אבל זו טעות כי זה צריך להיות סטודנט
//בעקבות בעיה ש מייק פרוטוטייפ הראה לנו את פרסון אז ג'ונה מנסה לתקן זאת
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor); // Student(firstName, birthYear, course)

///////////////////////////////////////
// Coding Challenge #3


// 1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
// 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
// 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
// 4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

// DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

// GOOD LUCK 😀




// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// // Link the prototypes
// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };

// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge--;
//   console.log(
//     `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`
//   );
// };

// const tesla = new EV('Tesla', 120, 23);
// tesla.chargeBattery(90);
// console.log(tesla);
// tesla.brake();
// tesla.accelerate();


///////////////////////////////////////
// Inheritance Between "Classes": ES6 Classes

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there 👋');
  }
}

class StudentCl extends PersonCl {
  // ** אם לא היינו רוצים להעביר
  // פרמטרים נוספים(מעבר למה שיש אצל האבא ) לא היינו צריכים בכלל לעשות קונסטרקטור חדש הסופר פאנקשיין היתה נקראית באופן אוטמטי כאשר היינו מעבירים את   כל הארגומנטים לקונסטרקטור
  constructor(fullName, birthYear, course) {
    // Always needs to happen first! // **אחרת המילה דיס לא תיהיה נכונה
    super(fullName, birthYear); // לא צריך להשתמש בקול מתוד
    // וכן לא צריך לציין את שם קלאס האב
    // this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.fullName}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();


///////////////////////////////////////
// Inheritance Between "Classes": Object.create
//** ע"י שיטה זו אנחנו נמנעים מלזייף קלאסים כפי שאנו עושים בשתי השיטות האחרות
// אלא רק מקשרים אובייקטים אחד לשני שחלק מהם משמשים פשוט כפרוטוטייפ לאחרים
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  // BUG in video:
  // console.log(`My name is ${this.fullName} and I study ${this.course}`);

  // FIX:
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();


///////////////////////////////////////
// Encapsulation: Protected Properties and Methods
// Encapsulation: Private Class Fields and Methods

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also the static version)

class Account {
  // 1) Public fields (instances) // הם יהיו שדות בכל המופעים (הם לא תחת פרוטוטייפ)
  // זה שווה ערך לפרופרטי שנעשה ע"י הקונסטרקטור
  locale = navigator.language;

  // // 2) Private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    // Protected property
    // this.#movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3) Public methods

  //  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    // if (this.#approveLoan(val)) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      //return this;
    }
    return this;
  }

  static helper() {
    console.log('Helper');
  }

  // 4) Private methods // כרגע לא נתמך בדפדפן מוצג כשדה פרטי ולא כמתודה פרטית
  //#approveLoan(val) {
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);
console.log(acc1.pin);

// acc1.#movements.push(250);
// acc1.#movements.push(-140);
// acc1.approveLoan(1000);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1005);
console.log(acc1.getMovements());
console.log(acc1);
Account.helper();

////console.log(acc1.#movements); //ERROR
// // console.log(acc1.#pin);
// // console.log(acc1.#approveLoan(100));

// // Chaining
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());
// בכדי שיעבוד צריך שכל מתודה תחזיר את האובייקט
//retuen this

// !! סיכום קלאס במצגת עמוד 183
///////////////////////////////////////
// Coding Challenge #4


// 1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
// 2. Make the 'charge' property private;
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

// DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

// GOOD LUCK 😀


*/
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);
// console.log(rivian.#charge);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();

console.log(rivian.speedUS);
