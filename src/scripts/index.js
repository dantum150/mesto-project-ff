// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import { createCard, removeCard, likeCard } from "../components/card.js"
import { openPopup, closePopup } from "../components/popup.js"
import { initialCards } from "./cards.js";
import '../pages/index.css'; 

const cardsList = document.querySelector('.places__list')
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const editUserForm = document.querySelector('.popup__form[name = edit-profile]')
const nameInput = editUserForm.querySelector('.popup__input_type_name')
const jobInput = editUserForm.querySelector('.popup__input_type_description')
const name = document.querySelector('.profile__title')
const description = document.querySelector('.profile__description')
const сreateCardForm = document.querySelector('.popup__form[name = new-place]')
const editUserPopup = document.querySelector('.popup_type_edit')
const addCardPopup = document.querySelector('.popup_type_new-card')
const openImagePopup = document.querySelector('.popup_type_image')


initialCards.forEach(cardInfo => {
  const newCard = createCard(cardInfo, removeCard, likeCard, openImage)
  cardsList.append(newCard)
})



editButton.addEventListener('click', () => {
  openPopup(editUserPopup)

  nameInput.value = name.textContent
  jobInput.value = description.textContent
})

addButton.addEventListener('click', () => {
  openPopup(addCardPopup)
})


function openImage(evt) {
  const src = evt.target.getAttribute('src')

  const popupImage = openPopup(openImagePopup).querySelector('.popup__image')

  popupImage.setAttribute('src', src)
  popupImage.setAttribute('alt', 'Картинка')
}

editUserForm.addEventListener('submit', handleFormSubmit);
сreateCardForm.addEventListener('submit', handleCreateFormSubmit)


function handleFormSubmit(evt) {
  evt.preventDefault(); 
  const popup = document.querySelector('.popup_type_edit')
  
  name.textContent = nameInput.value
  description.textContent = jobInput.value

  closePopup(popup)
}


function handleCreateFormSubmit(evt) {
  evt.preventDefault();
  const popup = document.querySelector('.popup_type_new-card')
  
  const nameInput = evt.target.querySelector('.popup__input_type_card-name')
  const linkInput = evt.target.querySelector('.popup__input_type_url')

  const cardInfo = {
  name: nameInput.value,
  link: linkInput.value
  }

  const newCard = createCard(cardInfo, removeCard, likeCard, openImage) 
  cardsList.prepend(newCard)  

  closePopup(popup)
  evt.target.reset()
}
