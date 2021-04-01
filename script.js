'use strict';

// fetches data from API
async function fetchData(sign, day) {
  const url = `https://aztro.sameerkumar.website/?sign=${sign}&${day}`;
  const response = await fetch(url, { method: 'POST' });
  const json = await response.json();
  return json;
}

// creates new elements (DOM manipulation)
function createElement(elementType, parent, text) {
  const element = document.createElement(elementType);
  parent.appendChild(element).textContent = text;
  return element;
}

function displayData(data, sign, day) {
  // hides the first page 'menu' and shows buttons 'back to menu' and 'horoscope for tomorrow'
  document.getElementById('entrance-page').classList.add('hide');
  const horoscopeResult = document.getElementById('horoscope-result');
  horoscopeResult.classList.remove('hide');
  horoscopeResult.textContent = '';
  document.getElementById('back-to-menu').classList.remove('hide');
  document.getElementById('horoscope-for-tomorrow').classList.remove('hide');

  // displays data for today's or tomorrow's horoscope
  const img = createElement('img', horoscopeResult);
  img.src = `icons/${sign}.jpeg`;
  img.style = 'float: left';
  createElement(
    'h1',
    horoscopeResult,
    `You are a ${sign.slice(0, 1).toUpperCase() + sign.slice(1)}`,
  );
  createElement('h2', horoscopeResult, `${day} is - ${data.current_date}`);
  const matchAndLucky = createElement('div', horoscopeResult);
  matchAndLucky.id = 'match-lucky';
  createElement('h3', matchAndLucky, `${day}'s Match ${data.compatibility}`);
  createElement('h3', matchAndLucky, `${day}'s Color ${data.color}`);
  createElement('h3', matchAndLucky, `Lucky Number ${data.lucky_number}`);
  createElement(
    'h3',
    matchAndLucky,
    `Lucky Time Of The Day ${data.lucky_time}`,
  );
  createElement('p', horoscopeResult, `${data.description}`);
  backToMenu(horoscopeResult);
}

function main() {
  const zodiacs = document.getElementsByClassName('zodiac');

  // when clicked on one of the signs(images) in the menu displays horoscope of that sign for today
  for (const zodiac of zodiacs) {
    const showError = document.getElementById('show-error');
    const entrancePage = document.getElementById('entrance-page');
    zodiac.addEventListener('click', (event) => {
      let day = 'Today';
      const sign = event.target.getAttribute('data-value');
      fetchDisplayCatch(showError, entrancePage, day, sign);

      // when clicked on button 'horoscope for tomorrow' displays data of the same sign for tomorrow
      document
        .getElementById('horoscope-for-tomorrow')
        .addEventListener('click', () => {
          day = 'Tomorrow';
          fetchDisplayCatch(showError, entrancePage, day, sign);
        });
    });
  }
}

// runs if 'Back To Menu' button pressed
function backToMenu(horoscopeResult) {
  const backToMenu = document.getElementById('back-to-menu');
  backToMenu.addEventListener('click', () => {
    document.getElementById('entrance-page').classList.remove('hide');
    horoscopeResult.classList.add('hide');
    backToMenu.classList.add('hide');
    document.getElementById('horoscope-for-tomorrow').classList.add('hide');
  });
}

// runs functions fetchData, displayData and handles errors
async function fetchDisplayCatch(showError, entrancePage, day, sign) {
  try {
    const data = await fetchData(sign, day);
    displayData(data, sign, day);
  } catch (error) {
    entrancePage.classList.add('hide');
    showError.classList.remove('hide');
    showError.textContent = error;
  }
}

window.onload = main;
