import { request } from "../utils"
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-9/',
    headers: {
      authorization: 'ae10f372-4d40-4524-9b30-6d18148907a0',
      'Content-Type': 'application/json'
    }
  }
  
  export const getInitialCards = () => {
    return request(config.baseUrl + 'cards', {headers: {...config.headers}})
  } 

  export const editUserProfile = (user) => {
    return request(`${config.baseUrl}users/me`, {
        method: 'PATCH',
        headers: {...config.headers},
        body:JSON.stringify(user)
    })  
  }

  export const getUserProfile = () => {
    return request (`${config.baseUrl}users/me`, {
        method: 'GET',
        headers: {...config.headers},
        body: JSON.stringify()
    })
    }

    export function initializationPage() {
    return Promise.all([getUserProfile(), getInitialCards()])
    }

    export const postCard = (card) => {   
        return request(`${config.baseUrl}cards`,{
            method: 'POST',
            headers: {...config.headers},
            body: JSON.stringify(card)   
        })
    }

    export const editAvatar = (avatar) => {
        return request (`${config.baseUrl}users/me/avatar`, {
            method: 'PATCH',
            headers: {...config.headers},
            body: JSON.stringify(avatar)
        })
    }

    export const deleteCard = (cardId) => {
    return request(`${config.baseUrl}cards/${cardId}`, {   
        method: 'DELETE',
        headers: {...config.headers}
    })
    }

    export const createCardLike = (cardId) => {
        return request(`${config.baseUrl}cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {...config.headers}
        })
    }
    
    export const deleteCardLike = (cardId) => {
        return request(`${config.baseUrl}cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {...config.headers}
        })
    }