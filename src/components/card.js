import { deleteCard, deleteCardLike, createCardLike } from "./api"
export function createCard(cardInfo, removeCardFunction, likeCardFunction, openImageFunction, userId) { //cardInfo {..., owner: {_id...}, likes: [] }  || userId = _id
    const newCardTemplate = document.querySelector('#card-template').content
  
    const newCardElement = newCardTemplate.querySelector('.places__item').cloneNode(true)
  
    const newCardImage =  newCardElement.querySelector('.card__image')

    const cardRemoveButton = newCardElement.querySelector('.card__delete-button')

    const cardLikeCount = newCardElement.querySelector('.card__like_count')

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
    }

    export function likeCard(button, cardId, cardLikeCount) {
      if(button.classList.contains('card__like-button_is-active')) {
        deleteCardLike(cardId).then((card) => {
          button.classList.remove('card__like-button_is-active')
          cardLikeCount.textContent = card.likes.length
        })
      }
      else {
        createCardLike(cardId).then((card) => {
          button.classList.add('card__like-button_is-active')
          cardLikeCount.textContent = card.likes.length
        })
      }
    }

    
     
    