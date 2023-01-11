const title = document.getElementById("title")
const letters = title.innerText.split("")
const icons = document.querySelectorAll(".top-nav i")
const cards = document.querySelectorAll(".card")

title.innerText = ""

letters.forEach((letter) => {
  let span = document.createElement("span")
  span.innerText = letter
  span.classList.add("title-letter")
  title.appendChild(span)
})

const spans = document.querySelectorAll(".title-letter")

function checkSpanHitbox(card = document.querySelector(".card.active")) {
  spans.forEach((span) => {
    const spanX = span.offsetLeft
    const cardX = card.offsetLeft
    const cardWidth = card.offsetWidth

    if (spanX + 10 >= cardX && spanX <= cardX + cardWidth) {
      span.classList.add("highlight")
    } else {
      span.classList.remove("highlight")
    }
  })
  icons.forEach((icon) => {
    const iconX = icon.offsetLeft
    const cardX = card.offsetLeft
    const cardWidth = card.offsetWidth

    if (iconX + 10 >= cardX && iconX <= cardX + cardWidth) {
      icon.classList.add("highlight")
    } else {
      icon.classList.remove("highlight")
    }
  })
}

cards.forEach((card, i) => {
  if (i === 0) {
    card.classList.add("active")
  }

  card.addEventListener("mouseover", () => {
    cards.forEach((j) => {
      j.classList.remove("active")
    })

    card.classList.add("active")

    checkSpanHitbox(card)
  })
})

checkSpanHitbox()
