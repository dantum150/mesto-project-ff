// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const cardsList = document.querySelector('.places__list')

function createCard(cardInfo, removeCardFunction) {
  const newCardTemplate = document.querySelector('#card-template').cloneNode(true).content

  const newCardElement = newCardTemplate.querySelector('.places__item')

  newCardElement.querySelector('.card__title').textContent = cardInfo.name

  newCardElement.querySelector('.card__image').setAttribute('src', cardInfo.link)

  newCardElement.querySelector('.card__delete-button').addEventListener('click', function() {
    removeCardFunction(newCardElement)
  })
  return newCardElement
}

function removeCard(cardTag) {
    cardTag.remove()
  }

initialCards.forEach(cardInfo => {
  const newCard = createCard(cardInfo, removeCard)
  cardsList.append(newCard)
})
