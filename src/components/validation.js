export const enableValidation = (selectors) => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement, selectors);
    });
  };
  

const hasInvalidInput = (inputList) => {   // []input, input
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {    // true | false
          // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  
      return !inputElement.validity.valid;    //true | false
    })
  }; 

const toggleButtonState = (inputList, buttonElement, selectors) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
          buttonElement.disabled = true;
      buttonElement.classList.add(selectors.inactiveButtonClass);
    } else {
          // иначе сделай кнопку активной
          buttonElement.disabled = false;
      buttonElement.classList.remove(selectors.inactiveButtonClass);
    }
  }; 


const setEventListeners = (formElement, selectors) => {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        inputElement.setCustomValidity('')
        isValid(formElement, inputElement, selectors)
        toggleButtonState(inputList, buttonElement, selectors);
      });
      inputElement.setCustomValidity(inputElement.dataset.errorMessage) 
    }); 
    
    toggleButtonState(inputList, buttonElement, selectors);
  };

  const showInputError = (formElement, inputElement, errorMessage, selectors) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, selectors) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent = '';
  };



const isValid = (formElement, inputElement, selectors) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    if(inputElement.validity.paternMismatch ) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    }
    showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, selectors);
  }
};

export function clearValidation(profileForm, validationConfig) {
  const inputs = profileForm.querySelectorAll(validationConfig.inputSelector)

  inputs.forEach((input) => {
    const errorElement = profileForm.querySelector(`.${input.id}-error`)
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = ''
    input.classList.remove(validationConfig.inputErrorClass)
  })
}