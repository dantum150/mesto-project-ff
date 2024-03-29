import { deleteCard, deleteCardLike, createCardLike } from "./api"
export function createCard(cardInfo, removeCardFunction, likeCardFunction, openImageFunction, userId) { 
    const newCardTemplate = document.querySelector('#card-template').content
  
    const newCardElement = newCardTemplate.querySelector('.places__item').cloneNode(true)
  
    const newCardImage =  newCardElement.querySelector('.card__image')

    const cardRemoveButton = newCardElement.querySelector('.card__delete-button')

    const cardLikeButton = newCardElement.querySelector('.card__like-button')

    const cardLikeCount = newCardElement.querySelector('.card__like_count')
    
    const isLiked = cardInfo.likes.some((user, index, array) => user._id === userId) 
   


    if(isLiked) {
      cardLikeButton.classList.add('card__like-button_is-active')
    }


    cardLikeCount.textContent= cardInfo.likes.length
    
    newCardElement.querySelector('.card__title').textContent = cardInfo.name
  
    newCardImage.src = cardInfo.link 
  
    newCardImage.alt = cardInfo.name
  
    newCardImage.addEventListener('click', (evt)=> {
      openImageFunction(evt)
    })

    if (cardInfo.owner._id === userId) {
      cardRemoveButton.addEventListener('click', function() {
        removeCardFunction(cardInfo._id, newCardElement)
      })
    } else {
      cardRemoveButton.remove()
    }
  
    newCardElement.querySelector('.card__like-button').addEventListener('click', function(evt) {
      likeCardFunction(evt.target, cardInfo._id, cardLikeCount)
    })
   
    return newCardElement
  }

    export function removeCard(cardId, cardTag) {
      deleteCard(cardId).then((card) => {
        cardTag.remove()
      })
      .catch((err) => console.log(err))
    }

    export function likeCard(button, cardId, cardLikeCount) {
      if(button.classList.contains('card__like-button_is-active')) {
        deleteCardLike(cardId).then((card) => {
          button.classList.remove('card__like-button_is-active')
          cardLikeCount.textContent = card.likes.length
        })
        .catch((err) => console.log(err))
      }
      else {
        createCardLike(cardId).then((card) => {
          button.classList.add('card__like-button_is-active')
          cardLikeCount.textContent = card.likes.length
        })
        .catch((err) => console.log(err))
      }
    }

    
     
    