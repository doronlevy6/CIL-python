'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal'); //כשיש כמה אלמנטים לאותו קלאס
//!!  הסתרה של אלמנט וע"י זה למנוע הסתרתו
const openModal = function (x) {
  console.log('modal' + x);
  modal.classList.remove('hidden'); //  הנקודה היא רק לסלקטור **ללא הנקודה
  //modal.classList.remove("hidden","ddd" )// אם היינו רוצים להסיר גם קלאסים אחרים
  overlay.classList.remove('hidden');
  //modal.style.display = 'block'; // גם אפשרות
};
//!! הוספת קלאס וע"י זה ליצור הסתרתו
const closeModal = function () {
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
};
//!!הצהרת ארוע לכל אלמנט
for (let i = 0; i < btnOpenModal.length; i++)
  btnOpenModal[i].addEventListener('click', () => openModal(i)); //**טריק על מנת למנוע קריאה לפונקציה בעת הצהרתה ,למעשה כך גרמנו לה להיות קולבק אם הייתי כותב כך
//(`click`,openModal(i))
// אז היא הייתה מתצעת כבר בריצה של הקוד ללא קשר לארוע קליק**
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
//!!
// ברגע שמתרחש ארוע אפשר לקבל מידע עליו
//הפרמטר שנשים בפונקציה יכיל מידע מסוג אובייקט על הארוע
document.addEventListener('keydown', function (e) {
  // עבור כל לחיצת מקש

  console.log(e.key);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});
