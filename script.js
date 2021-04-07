'use strict';

function createElement(elementType, parent, text) {
  const element = document.createElement(elementType);
  parent.appendChild(element).textContent = text;
  return element;
}

function displayData(data, sign, day, entrancePage, horoscopeAndButtons) {
  // hides menu and shows horoscope results
  entrancePage.classList.add('hide');
  const horoscopeResult = document.getElementById('horoscope-result');
  horoscopeAndButtons.classList.remove('hide');

  // DOM
  horoscopeResult.textContent = '';
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
}

async function fetchData(sign, day) {
  const url = `https://aztro.sameerkumar.website/?sign=${sign}&day=${day}`;
  const response = await fetch(url, { method: 'POST' });
  const json = await response.json();
  return json;
}

// calls functions fetchData and displayData
// handle errors show the in the DOM
async function fetchAndDisplay(entrancePage, day, sign, horoscopeAndButtons) {
  try {
    const data = await fetchData(sign, day);
    displayData(data, sign, day, entrancePage, horoscopeAndButtons);
  } catch (error) {
    const showError = document.getElementById('show-error');
    entrancePage.classList.add('hide');
    horoscopeAndButtons.classList.add('hide');
    showError.textContent = 'Something went wrong, please try later!';
  }
}

function main() {
  const zodiacs = document.getElementsByClassName('zodiac');
  const entrancePage = document.getElementById('entrance-page');
  const horoscopeAndButtons = document.getElementById('horoscope-and-buttons');

  let day, sign;

  // shows horoscope for tomorrow
  document
    .getElementById('horoscope-for-tomorrow')
    .addEventListener('click', () => {
      day = 'Tomorrow';
      fetchAndDisplay(entrancePage, day, sign, horoscopeAndButtons);
    });

  // show horoscope for today
  for (const zodiac of zodiacs) {
    zodiac.addEventListener('click', (event) => {
      day = 'Today';
      sign = event.target.getAttribute('data-value');
      fetchAndDisplay(entrancePage, day, sign, horoscopeAndButtons);
    });
  }

  document.getElementById('back-to-menu').addEventListener('click', () => {
    entrancePage.classList.remove('hide');
    horoscopeAndButtons.classList.add('hide');
  });
}

window.onload = main;
