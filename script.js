const container = document.querySelector(".container")
const title = document.getElementById("title")
const letters = title.innerText.split("")
const icons = document.querySelectorAll(".top-nav i")

title.innerText = ""

letters.forEach((letter) => {
  let span = document.createElement("span")
  span.innerText = letter
  span.classList.add("title-letter")
  title.appendChild(span)
})

const spans = document.querySelectorAll(".title-letter")

async function setBackgroundImage(card, url) {
  const response = await fetch(url)
  const {
    data: { image_id },
    config: { iiif_url },
  } = await response.json()

  card.style.backgroundImage = `url("${iiif_url}/${image_id}/full/843,/0/default.jpg")`
}

fetch("https://api.artic.edu/api/v1/artworks")
  .then((response) => response.json())
  .then(({ data }) => {
    for (let i = 0; i < 4; i++) {
      const { id, title, date_end } = data[i]
      const card = document.createElement("div")
      card.classList.add("card")
      card.innerHTML = `
      <div class="info">
        <div class="title">${title}</div>
        <div class="date">${date_end}</div>
      </div>
      <div class="number">${i + 1}</div>
      `

      setBackgroundImage(
        card,
        `https://api.artic.edu/api/v1/artworks/${id}?fields=image_id`
      )

      container.appendChild(card)
    }

    const cards = document.querySelectorAll(".card")

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
  })

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
