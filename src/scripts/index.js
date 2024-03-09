// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import { createCard, removeCard, LikeCard } from "../components/card.js"
import { openPopup } from "../components/popup.js"
import addIcon from "../images/add-icon.svg";
import avatar from "../images/avatar.jpg";
import card_1 from "../images/card_1.jpg";
import card_2 from "../images/card_2.jpg";
import card_3 from "../images/card_3.jpg";
import close from "../images/close.svg";
import deleteIcon from "../images/delete-icon.svg";
import editIcon from "../images/edit-icon.svg";
import likeActive from "../images/like-active.svg";
import likeInactive from "../images/like-inactive.svg";
import logo from "../images/logo.svg";
import '../pages/index.css'; 
import { initialCards } from "./cards.js";

const cardsList = document.querySelector('.places__list')
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const editUserForm = document.querySelector('.popup__form[name = edit-profile]')
const nameInput = editUserForm.querySelector('.popup__input_type_name')
const jobInput = editUserForm.querySelector('.popup__input_type_description')
const name = document.querySelector('.profile__title')
const description = document.querySelector('.profile__description')
const CreateCardForm = document.querySelector('.popup__form[name = new-place]')

initialCards.forEach(cardInfo => {
  const newCard = createCard(cardInfo, removeCard, LikeCard, openImage)
  cardsList.append(newCard)
})



editButton.addEventListener('click', () => {
  openPopup('.popup_type_edit')

  nameInput.value = name.textContent
  jobInput.value = description.textContent
})

addButton.addEventListener('click', () => {
  openPopup('.popup_type_new-card')
})


function openImage(evt) {
  const src = evt.target.getAttribute('src')

  const popupImage = openPopup('.popup_type_image').querySelector('.popup__image')

  popupImage.setAttribute('src', src)
  popupImage.setAttribute('alt', 'Картинка')
}

editUserForm.addEventListener('submit', handleFormSubmit);
CreateCardForm.addEventListener('submit', handleCreateFormSubmit)


function handleFormSubmit(evt) {
  evt.preventDefault(); 
  const popup = document.querySelector('.popup_type_edit')
  
  name.textContent = nameInput.value
  description.textContent = jobInput.value

  popup.classList.remove('popup_is-opened')
}


function handleCreateFormSubmit(evt) {
  evt.preventDefault();
  const popup = document.querySelector('.popup_type_new-card')
  
  const NameInput = evt.target.querySelector('.popup__input_type_card-name')
  const LinkInput = evt.target.querySelector('.popup__input_type_url')

  const CardInfo = {
  name: NameInput.value,
  link: LinkInput.value
  }

  const NewCard = createCard(CardInfo, removeCard, LikeCard, openImage) 
  cardsList.prepend(NewCard)  

  popup.classList.remove('popup_is-opened')
  evt.target.reset()
}
