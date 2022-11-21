const country = "Israel";
const continent = "Asia";
let population = 10;
console.log(country);
console.log(continent);
console.log(population);
const isIsland = false;
let language;
console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language)
language = 'Hebrew';
console.log(population / 2);
population++;
console.log(population);
console.log(population > 6);
console.log(population < 33);
const description1 =
    country +
    ' is in ' +
    continent +
    ', and its ' +
    population +
    ' million people speak ' +
    language;
console.log(description1)
const description2 = `${country} is in ${continent} 
and its ${population} milion people speak ${language}`
console.log(description2)
// if else
if (population > 33) {
    console.log(`${country}'s population is above average`)
} else {
    console.log(`${country}'s population is ${33 - population} below average`)
}


