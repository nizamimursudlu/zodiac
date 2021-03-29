
async function fetchSigns(sign, day) {
  const url = `https://aztro.sameerkumar.website/?sign=${sign}&day=${day}`;
  const response = await fetch(url, { method: 'POST' })
  const json = response.json()
  return json
}

async function chosenSignDay(data, sign, day) {
  document.getElementById("entrance-page").textContent = ""
  document.getElementById("horoscope-result").classList.remove("hide")
  const backToMenu = document.getElementById("back-to-menu")
  backToMenu.classList.remove("hide")
  document.getElementById("horoscope-for-tomorrow").classList.remove("hide")
  const element = data.current_date;

  const horoscopeText = `
  <img src="icons/${sign}.jpeg" style="float: left"></img>
  <h1>You are a ${sign.slice(0, 1).toUpperCase() + sign.slice(1)}</h1> 
  <h2>${day} is - ${element}</h2> 
  <div id="match-lucky">
  <h3>${day}'s Match<br>
  ${data.compatibility}</h3>
  <h3>${day}'s Color<br>
  ${data.color}</h3>
  <h3>Lucky Number<br>
  ${data.lucky_number}</h3>
  <h3>Lucky Time Of The Day<br>
  ${data.lucky_time}</h3>
  </div>
  <p>${data.description}</p>`
  document.getElementById("horoscope-result").innerHTML = horoscopeText

}

async function main() {
  try {
  const zodiac = document.getElementsByClassName("zodiac")
  for (zodiacs of zodiac) {
    zodiacs.addEventListener("click", async (event) => {  
        let day = "Today"
        let sign = event.target.getAttribute("data-value")
        let data = await fetchSigns(sign, day)
        chosenSignDay(data, sign, day)
    document.getElementById("horoscope-for-tomorrow").addEventListener("click", async () =>{
        let day = "Tomorrow"
        let data = await fetchSigns(sign, day)
        chosenSignDay(data, sign, day)
        })   
    })
  }
}   catch (error) {
        console.log(error)
      }
    
}

window.onload = main