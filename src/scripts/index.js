import {
  createCard,
  removeCard,
  likeCard
} from "../components/card.js"
import {
  openPopup,
  closePopup
} from "../components/popup.js"
import {
  enableValidation,
  clearValidation
} from '../components/validation.js'
import {
  editUserProfile,
  initializationPage,
  postCard,
  editAvatar
} from "../components/api.js";
import '../pages/index.css';

const cardsList = document.querySelector('.places__list')
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const createCardForm = document.querySelector('.popup__form[name = new-place]')
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
const avatarInput = document.querySelector('.popup__input_type_avatar')
const textPicture = document.querySelector('.popup__caption')
const popupAvatar = document.querySelector('.popup_type_avatar')
const linkInput = document.querySelector('.popup__input_type_avatar')
const popupEdit = document.querySelector('.popup_type_edit')
const popupNewCard = document.querySelector('.popup_type_new-card')
const nameInputCardName = document.querySelector('.popup__input_type_card-name')
const linkInputUrl = document.querySelector('.popup__input_type_url')
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  buttonSelector: '.popup__button',
}


initializationPage().then((data) => data[1].forEach(cardInfo => {
  const user = data[0]
  avatar.style.backgroundImage = `url(${user.avatar})`
  name.textContent = user.name
  description.textContent = user.about

  nameInput.value = user.name
  jobInput.value = user.about

  avatarInput.value = user.avatar

  const newCard = createCard(cardInfo, removeCard, likeCard, openImage, user._id)
  cardsList.append(newCard)
})).then(() => enableValidation(config)).catch((err) => console.log(err))


avatar.addEventListener('click', () => {
  openPopup(avatarPopup)
})

editButton.addEventListener('click', () => {

  nameInput.value = name.textContent
  jobInput.value = description.textContent
  clearValidation(editUserForm, config)


  openPopup(editUserPopup)
})

addButton.addEventListener('click', () => {
  clearValidation(createCardForm, config)

  openPopup(addCardPopup)
})


function openImage(evt) {
  const src = evt.target.getAttribute('src')
  const alt = evt.target.getAttribute('alt')
  textPicture.textContent = alt

  const popupImage = openPopup(openImagePopup).querySelector('.popup__image')

  popupImage.setAttribute('src', src)
  popupImage.setAttribute('alt', alt)
}

editUserForm.addEventListener('submit', handleFormSubmit);
сreateCardForm.addEventListener('submit', handleCreateFormSubmit)
avatarForm.addEventListener('submit', handleEditAvatar)




function handleEditAvatar(evt) {
  evt.preventDefault();
  const popupButton = evt.target.querySelector('.popup__button')
  popupButton.textContent = 'идет загрузка...'
  popupButton.disabled = true

  editAvatar({
    avatar: linkInput.value
  }).then((user) => {
    avatar.style.backgroundImage = `url(${user.avatar})`
    closePopup(popupAvatar)
  }).catch((e) => console.log(e)).finally(() => {
    popupButton.textContent = 'Сохранить'
    popupButton.disabled = false
  })
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  const popupButton = evt.target.querySelector('.popup__button')
  popupButton.textContent = 'идет загрузка...'
  popupButton.disabled = true

  editUserProfile({
    name: nameInput.value,
    about: jobInput.value
  }).then((user) => {
    name.textContent = user.name
    description.textContent = user.about
    closePopup(popupEdit)
  }).catch((e) => console.log(e)).finally(() => {
    popupButton.textContent = 'Сохранить'
    popupButton.disabled = false
  })
}


function handleCreateFormSubmit(evt) {
  evt.preventDefault();
  const popupButton = evt.target.querySelector('.popup__button')
  popupButton.textContent = 'идет загрузка...'
  popupButton.disabled = true


  const cardInfo = {
    name: nameInputCardName.value,
    link: linkInputUrl.value
  }

  postCard(cardInfo).then(card => {
    const newCard = createCard(card, removeCard, likeCard, openImage, card.owner._id)
    cardsList.prepend(newCard)

    closePopup(popupNewCard)
    evt.target.reset()
  }).catch((e) => console.log(e)).finally(() => {
    popupButton.textContent = 'Сохранить'
    popupButton.disabled = false
  })
}