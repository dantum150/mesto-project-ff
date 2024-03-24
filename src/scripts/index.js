// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import { createCard, removeCard, likeCard } from "../components/card.js"
import { openPopup, closePopup } from "../components/popup.js"
import { initialCards } from "./cards.js";
import {enableValidation} from '../components/validation.js'
import { getInitialCards, editUserProfile, initializationPage, postCard, editAvatar } from "../components/api.js";
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
const avatar = document.querySelector('.profile__image')
const avatarPopup = document.querySelector('.popup_type_avatar')
const avatarForm = document.querySelector('.popup__form[name = edit-avatar]')



initializationPage().then((data) => data[1].forEach(cardInfo => {
  const user = data[0]
  avatar.style.backgroundImage = `url(${user.avatar})`
  name.textContent = user.name
  description.textContent = user.about
  
  const newCard = createCard(cardInfo, removeCard, likeCard, openImage, user._id)
  cardsList.append(newCard) 
})
) // [{_id}, []])
// getInitialCards().then((cards) => {
//   cards.forEach(cardInfo => {
//     const newCard = createCard(cardInfo, removeCard, likeCard, openImage)
//     cardsList.append(newCard)
//   })
// })

// initialCards.forEach(cardInfo => {
//   const newCard = createCard(cardInfo, removeCard, likeCard, openImage)
//   cardsList.append(newCard)
// })

avatar.addEventListener('click',() => {
openPopup(avatarPopup)
}
)

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
avatarForm.addEventListener('submit',handleEditAvatar)


function handleEditAvatar(evt) {
evt.preventDefault();
const popup = document.querySelector('.popup_type_avatar')
const linkInput = evt.target.querySelector('.popup__input_type_avatar')
  editAvatar({avatar: linkInput.value}).then ((user)=> {
    avatar.style.backgroundImage = `url(${user.avatar})`
    closePopup(popup)
  })
}


function handleFormSubmit(evt) {
  evt.preventDefault(); 
  const popup = document.querySelector('.popup_type_edit')

  editUserProfile({name:nameInput.value, about:jobInput.value}).then((user) => {
    name.textContent = user.name
    description.textContent = user.about
    closePopup(popup)
  })
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

  postCard(cardInfo).then(card => {
    const newCard = createCard(card, removeCard, likeCard, openImage, card.owner._id) 
    cardsList.prepend(newCard)  
  
    closePopup(popup)
    evt.target.reset()
  })
}


enableValidation()