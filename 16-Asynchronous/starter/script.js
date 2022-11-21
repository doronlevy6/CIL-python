'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
// https://restcountries.com/v2/ - the new URL
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

///////////////////////////////////////
// Our First AJAX Call: XMLHttpRequest

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
  <article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('portugal');
getCountryData('usa');
getCountryData('germany');
getCountryData('israel');

///////////////////////////////////////
// Welcome to Callback Hell

const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const neighbour = data.borders?.[0];

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`); // חיפוש הןינק ע"פ קוד
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('portugal');
getCountryAndNeighbour('israel');

setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

///////////////////////////////////////
// Consuming Promises
// Chaining Promises
// Handling Rejected Promises
// Throwing Errors Manually

// **  then=>משמש בכדי לטפל  בהחזרה של הפרומיס כשהוא פולפיל
// כמו כן בהגשמתו הוא מפעיל  פונקציה שמקבלת ארגומנט שהוא התוצאה של הפרומיס
// מה שאנו מקבלים זה readable streaming שצריך להפעיל עליה ג'יסון מתוד
// הג'יסון מתוד מחזיר פרומיס אז גם בשבילו צריך לעשות :דן מתוד

// למה איאפשר להשתמש ישירות בריספונס וצריך להפעיל מתודת ג'סון
// !! Because you receive the response as soon as all headers have arrived. Calling .json() gets you another promise for the body of the http response that is yet to be loaded...
// פאצ' זו פונקציה שמחזירה פרומיס

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// const getCountryData = function (country) {
//   // Country 1

//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       //**  הקולבק הראשון הוא כאשר הפרומיס פולפיל וכמו כןאפשר לשים קולבק שני שיבוצע כאשר הפרומיס ריג'קט לדוגמא

//       //.then(response => respones.json(),err=>alert(err))
//       // הבעיה בזה שצריך לעשות זאת בכל מקום בו מחכים לפרומיס אפשר לעשות באמעות קטצ' בסוף השרשור
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`); // throw- מחסל מיידית את הפונקציה הנוכחית כמו :ריטרן
//       // ואז הפרומיס ריגקט וזה מקפיץ אותנו לקטץ' הנדלר
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       // const neighbour = 'dfsdfdef';

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })

//     // לשים לב שלא לעשות כך
//     //return fetch(`https://restcountries.com/v2/alpha/${neighbour}`).then(response => {.....
//     // כי זה יוצא קולבק וזה מה שאנו מנסים להמנע אלא רוצים שיהיה שרשור של פונקציות ולא קולבק  253-8:40
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`); // מעצב בקונסול בצהע אדום
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       //יבוצע תמיד בסוף הפרומיס בין אם פולפיל או ריג'קט
//       // או מבוצע למעשה כי הקטצ' הוא פרומיס
//       countriesContainer.style.opacity = 1;
//     });
// };

///// מניעת כפילויות ע"י פונקציה
// const getCountryData = function (country) {
//   // Country 1
//   getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0]);

//       const neighbour = data[0].borders[0];

//       if (!neighbour) throw new Error('No neighbour found!');

//       // Country 2

//       return getJSON(
//         `https://restcountries.com/v2/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })

//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('australia');
// });

// //getCountryData('sfhshsdh');

///////////////////////////////////////
// Coding Challenge #1

/*
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀


const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  )
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.countryName}`);

      return fetch(` https://restcountries.com/v2/name/${data.countryName}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => {
      renderCountry(data[0]);
      
    })
    .catch(err => console.error(`${err.message} 💥`));
};
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);

*/
///////////////////////////////////////
// The Event Loop in Practice
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

console.log('Test end');
/* סדר הפעולות
Test start
 Test end
 Resolved promise 1//micro-tasks queue
 Resolved promise 2
 0 sec timer //call-back
 */
///////////////////////////////////~~

//דוגמה לקולבק סינכורני

function greeting(name) {
  alert(`Hello, ${name}`);
}

function processUserInput(callback) {
  const name = prompt('Please enter your name.');
  callback(name);
}

processUserInput(greeting);
/////////////////////////////////////~

///////////////////////////////////////
// Building a Simple Promise
//promise is a special kind of object in JavaScript.
//the promise constructor takes exactly one argument ,and that is the so-called executor function.
//as soon as the promise constructor runs
//it will automatically execute this executor function
//it will do so by passing in two other arguments.

//And those arguments are the resolve and reject functions.
//שאלות שכדאי לעבור עליהן:**
//https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/22649357#questions/16783658

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)); //.catch(err => console.error(err));

// // Promisifying setTimeout
//** הפטצ' זה למעשה פונקציה שמחזירה פרומיס

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
  //אם הייתי שם ערך בריסולב אז לא הייתה שהייה כי זה היה מחזיר ערך מיידית,..~ כנראה הפרומיס בנוי כך שכשיש לו ריסלוב אז הוא מעביר אותו הלאה מיידית ??
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));
/*
//=🔼
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// **מעביר ערך מיידית

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem!')).catch(x => console.error(x));

///////////////////////////////////////

///////////////////////////////////////////////~~~~
//דוגמא של אתר מ.ד.נ

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    //resolve('foo');
  }, 300);
});

promise1.then(value => {
  console.log(value);
  // expected output: "foo"
});

console.log(promise1);
// expected output: [object Promise]

// promise1.resolve('pp').then(res => console.log(res));
////// דוגמא של ליאור לאיזה פונקציות הפונקציה אמורה לקבל

// navigator.geolocation.getCurrentPosition(
//   a
//   //err => console.error(err)
// );

function getCurrentPosition(x) {
  const a = '10000x'; // את פרמטרים הפונקציה מספקת לי
  x(a);
}

function func1(podisition) {
  console.log(podisition);
}
getCurrentPosition(func1);
*/
///////////////////////////////////////////////////////
// Promisifying the Geolocation API🔼

// navigator.geolocation.getCurrentPosition(
//   p => console.log(p),
//   e => console.log(e)
// );

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      console.log(pos);
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(` https://restcountries.com/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};

btn.addEventListener('click', whereAmI);

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀


const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
*/
///////////////////////////////////////
// Consuming Promises with Async/Await

//פונקצית אסינק רצה ברקע כמו פרומיס
//אוויט מושך מהפרומיס ערך של התוצאה כמו: דן
// שימוש בא-סינק א-וויט זה למעשה סוכר סינטטי של שימוש ב:דן מתוד

// fetch(`https://restcountries.com/v2/name/${country}`).then(res => console.log(res))
//=🔼

// const whereAmI = async function (country) {
//   const res = await fetch(`https://restcountries.com/v2/name/${country}`);
//   console.log(res);
// };

// אוויט נותן את ערך הפתרון של הפרומיס
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const whereAmI = async function () {
  // Geolocation
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;
  // Reverse geocoding
  const resGeo = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  );
  const dataGeo = await resGeo.json();
  console.log(dataGeo);
  // Country data
  const res = await fetch(
    `https://restcountries.com/v2/name/${dataGeo.countryName}`
  );

  const data = await res.json();
  console.log(data);
  renderCountry(data[0]);
};

whereAmI();
console.log('FIRST');

// //////////////////////////////////
// // המשך..................
// // Error Handling With try...catch

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    // console.log(pos);
    const { latitude: lat, longitude: lng } = pos.coords;
    // כאן אנו לא צריכים לזרוק ארור ידנית כי בנינו פרומיס שיישלח באופן אוטמטי ריג'קט במקרה שמשהו יילך לא כשורה
    // לעומת זה פרומיס שבא מהפטצ' לא שולח ארור רק במקרה שאין חיבור לאינטרנט אבל במקרה של403 404 זה לא זורק טעות לכן נעשה אותה ידנית

    // Reverse geocoding
    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    );
    // הארורוים שאנו זורקים  פה ידנית יתפסו בקאצ' למטה

    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    // Country data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.countryName}`
    );

    //   // FIX:
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);
  }
};

whereAmI();
// console.log('FIRST');

// ///////////////////////////////////////
// Returning Values from Async Functions
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    );
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.countryName}`
    );
    if (!resGeo.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.countryName}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

console.log('1: Will get location');
// const city = whereAmI();
// console.log(city); //promise ~בגלל שפונקציה אסינכרונית תמיד מחזירה פרומיס
// זה לא מחזיר את הערך שבריטרן כי בשלב הזה לא יודע מה ערכו כי הפונקציה עדיין רצה

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   //** אפילו שתיהיה טעות הפונקציה הזו  פולפיל וזה יחזיר לנו ערך אנדיפפיינד
//   // וגם אם נוסיף קאטצ' נקבל אותו דבר והקטצ' לא ייתפס כי הפונקציה פולפיל
//   // לכן צריך לזרוק מחדשאת הטעות שורה 690
//   // throw err
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location')); // על מנת ש 3 יהיה אחרון

// console.log('3: Finished getting location');

//בגלל שלעיל ערבבנו את שתי השיטות( אסינק אוויט ודן מתוד אז נעשה זאת בשיטה אחת )

//BUG~~~~~~~~~~???????????????????????????????????????
// למה משתמשים באיפי

(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message} 💥`);
  }
  console.log('3: Finished getting location');
})();

// ///////////////////////////////////////
// // Running Promises in Parallel
//~ promise.all combinator because it allows us to combine multiple promises.
const get3Countries = async function (c1, c2, c3) {
  try {
    const [data1] = await getJSON(` https://restcountries.com/v2/name/${c1}`);
    const [data2] = await getJSON(` https://restcountries.com/v2/name/${c2}`);
    const [data3] = await getJSON(` https://restcountries.com/v2/name/${c3}`);
    console.log([data1.capital, data2.capital, data3.capital]); //3) ['Lisbon', 'Ottawa', 'Dodoma']

    // בשיטה לעיל הם יורדים אחד אחרי השני ואין בזה הגיון הם יכולים לרדת במקביל
    // הפונקציה לוקחת  מערך של פרומיסים מריצה אותו במקביל ומחזירה מערך של תוצאות
    const data = await Promise.all([
      getJSON(` https://restcountries.com/v2/name/${c1}`),
      getJSON(` https://restcountries.com/v2/name/${c2}`),
      getJSON(` https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data[0]); //[{…}]
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');

//**  צריך רק לדעת שכאשר פרומיס אחד ריג'קט אז כל הפרומיס.אול יהיה ריג'קט
// כמו כן לא חייבים להשתמש באסינק אוויט אפשר לקחת את כל הפרומיס.אול ולעשות לו דן
*/
// ///////////////////////////////////////
// // Other Promise Combinators: race, allSettled and any

// // Promise.race // הראשון זוכה לא משנה אם פולפיל או ריג'קט
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v2/name/italy`),
//     getJSON(`https://restcountries.com/v2/name/egypt`),
//     getJSON(`https://restcountries.com/v2/name/mexico`),
//   ]);
//   console.log(res[0]);
// })();

// יצירת פרומיס אחר שיתחרה בפרומיס הרגיל ויחזור תוך מספר שניות קצוב
// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too long!'));
//     }, sec * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.com/v2/name/tanzania`),
//   timeout(5),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

// // Promise.allSettled - מחזיר את התוצאה של כולם
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res)); // [{…}, {…}, {…}]

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err)); ///ERROR -בגלל שברגע שיש ארור אז הוא הוא עושה סיבוב קצר

// // Promise.any [ES2021] // מחזיר את הפוליפיל הראשון,מתעלם מהריג'קטד פרומיס
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// ///////////////////////////////////////
// // Coding Challenge #3

// PART 1
// Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
// Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

// PART 2
// 1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
// 2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
// 3. Check out the 'imgs' array in the console! Is it like you expected?
// 4. Use a promise combinator function to actually get the images from the array 😉
// 5. Add the 'paralell' class to all the images (it has some CSS styles).

// TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

// GOOD LUCK 😀

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found'));
//     });
//   });
// };

// let currentImg;

// // createImage('img/img-1.jpg')
// //   .then(img => {
// //     currentImg = img;
// //     console.log('Image 1 loaded');
// //     return wait(2);
// //   })
// //   .then(() => {
// //     currentImg.style.display = 'none';
// //     return createImage('img/img-2.jpg');
// //   })
// //   .then(img => {
// //     currentImg = img;
// //     console.log('Image 2 loaded');
// //     return wait(2);
// //   })
// //   .then(() => {
// //     currentImg.style.display = 'none';
// //   })
// //   .catch(err => console.error(err));

// // PART 1
// const loadNPause = async function () {
//   try {
//     // Load image 1
//     let img = await createImage('img/img-1.jpg');
//     console.log('Image 1 loaded');
//     await wait(2);
//     img.style.display = 'none';

//     // Load image 1
//     img = await createImage('img/img-2.jpg');
//     console.log('Image 2 loaded');
//     await wait(2);
//     img.style.display = 'none';
//   } catch (err) {
//     console.error(err);
//   }
// };
// // loadNPause();

// // PART 2
// const loadAll = async function (imgArr) {
//   try {
//     const imgs = imgArr.map(async img => await createImage(img));
//     const imgsEl = await Promise.all(imgs);
//     console.log(imgsEl);
//     imgsEl.forEach(img => img.classList.add('parallel'));
//   } catch (err) {
//     console.error(err);
//   }
// };
// loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
