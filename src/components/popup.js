export function openPopup(popup) {
    document.addEventListener('keydown',  closePopupByKey)
  
    popup.classList.add('popup_is-opened')
  
    popup.addEventListener('click', closePopupByClick)
  
    return popup
  }
  
export function closePopup(popup) {

    document.removeEventListener('keydown',  closePopupByKey)

    popup.classList.remove('popup_is-opened')

    popup.removeEventListener('click', closePopupByClick)
  }

  function closePopupByClick(evt) {
    if(evt.target.classList.contains('popup__close') || evt.target === evt.currentTarget) {
      closePopup(evt.currentTarget)
    }
  }

  function closePopupByKey(evt) {
    if(evt.key === 'Escape') {
      closePopup(document.querySelector('.popup_is-opened'))
    }
  }