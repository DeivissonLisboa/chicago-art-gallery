const cards = document.querySelectorAll(".card")

cards.forEach((card, i) => {
  card.addEventListener("mouseover", () => {
    cards.forEach((i) => {
      i.classList.remove("active")
    })

    card.classList.add("active")
  })
})
