export function createCard(cardInfo, removeCardFunction, likeCardFunction, openImageFunction, userId) { //cardInfo {..., owner: {_id...} }  || userId = _id
    const newCardTemplate = document.querySelector('#card-template').content
  
    const newCardElement = newCardTemplate.querySelector('.places__item').cloneNode(true)
  
    const newCardImage =  newCardElement.querySelector('.card__image')

    const cardRemoveButton = newCardElement.querySelector('.card__delete-button')
    
    newCardElement.querySelector('.card__title').textContent = cardInfo.name
  
    newCardImage.src = cardInfo.link 
  
    newCardImage.alt = cardInfo.name
  
    newCardImage.addEventListener('click', (evt)=> {
      openImageFunction(evt)
    })

    if (cardInfo.owner._id === userId) {
      cardRemoveButton.addEventListener('click', function() {
        removeCardFunction(newCardElement)
      })
    } else {
      cardRemoveButton.remove()
    }
  
    newCardElement.querySelector('.card__like-button').addEventListener('click', function(evt) {
      likeCardFunction(evt.target)
    })
   
    return newCardElement
  }

    export function removeCard(cardTag) {
    cardTag.remove()
    }

    export function likeCard(button) {
    button.classList.toggle('card__like-button_is-active')
    }
     
    