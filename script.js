"use strict";

async function fetchSigns(sign, day) {
  const url = `https://aztro.sameerkumar.website/?sign=${sign}&day=${day}`;
  const response = await fetch(url, { method: 'POST' })
  const json = response.json()
  return json
}

function createElement(elementType, parent, text) {
  const element = document.createElement(elementType);
  parent.appendChild(element).textContent = text
  return element 
}

function displayData(data, sign, day) {

  // hides the first page 'menu' and shows buttons 'back to menu' and 'horoscope for tomorrow'
  document.getElementById("entrance-page").textContent = ""
  const horoscopeResult = document.getElementById("horoscope-result")
  horoscopeResult.classList.remove("hide")
  horoscopeResult.textContent = ""
  document.getElementById("back-to-menu").classList.remove("hide")
  document.getElementById("horoscope-for-tomorrow").classList.remove("hide")

  // displays data for today's or tomorrow's horoscope
  const img = createElement("img", horoscopeResult)
  img.src = `icons/${sign}.jpeg`
  img.style = "float: left"
  createElement("h1", horoscopeResult, `You are a ${sign.slice(0, 1).toUpperCase() + sign.slice(1)}`)
  createElement("h2", horoscopeResult, `${day} is - ${data.current_date}`)
  const matchAndLucky = createElement("div", horoscopeResult)
  matchAndLucky.id = "match-lucky"
  createElement("h3", matchAndLucky, `${day}'s Match ${data.compatibility}`)
  createElement("h3", matchAndLucky, `${day}'s Color ${data.color}`)
  createElement("h3", matchAndLucky, `Lucky Number ${data.lucky_number}`)
  createElement("h3", matchAndLucky, `Lucky Time Of The Day ${data.lucky_time}`)
  createElement("p", horoscopeResult, `${data.description}`)
}

function main() {
  try {
  const zodiacs = document.getElementsByClassName("zodiac")

  // when clicked on one of the signs(images) in the menu displays horoscope of that sign for today
  for (const zodiac of zodiacs) {
    zodiac.addEventListener("click", async (event) => {  
        const day = "Today"
        const sign = event.target.getAttribute("data-value")
        const data = await fetchSigns(sign, day)
        displayData(data, sign, day)

  // when clicked on button 'horoscope for tomorrow' displays data of the same sign for tomorrow
    document.getElementById("horoscope-for-tomorrow").addEventListener("click", async () =>{
        const day = "Tomorrow"
        const data = await fetchSigns(sign, day)
        displayData(data, sign, day)
        })   
    })
  }
}   catch (error) {
        console.log(error)
      }
    
}

window.onload = main