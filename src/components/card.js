export function createCard(cardInfo, removeCardFunction, likeCardFunction, openImageFunction) {
    const newCardTemplate = document.querySelector('#card-template').content
  
    const newCardElement = newCardTemplate.querySelector('.places__item').cloneNode(true)
  
    const newCardImage =  newCardElement.querySelector('.card__image')
    
    newCardElement.querySelector('.card__title').textContent = cardInfo.name
  
    newCardImage.src = cardInfo.link 
  
    newCardImage.alt = cardInfo.name
  
    newCardImage.addEventListener('click', (evt)=> {
      openImageFunction(evt)
    })
  
    newCardElement.querySelector('.card__delete-button').addEventListener('click', function() {
      removeCardFunction(newCardElement)
    })
  
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
     