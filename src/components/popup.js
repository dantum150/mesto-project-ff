export function openPopup(className) {

    document.addEventListener('keydown',  closePopupByKey)
  
    const popup = document.querySelector(className)
  
    popup.classList.add('popup_is-opened')
  
    popup.addEventListener('click', closePopupByClick)
  
  
    function closePopupByClick(evt) {
      if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
        popup.classList.remove('popup_is-opened')
        
        popup.removeEventListener('click', closePopupByClick)
      }
    }
  
    function closePopupByKey(evt) {
      if(evt.key === 'Escape') {
        popup.classList.remove('popup_is-opened')
  
        popup.removeEventListener('keypress', closePopupByKey)
      }
    }
  
    return popup
  }
  