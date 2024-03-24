const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-9/',
    headers: {
      authorization: 'ae10f372-4d40-4524-9b30-6d18148907a0',
      'Content-Type': 'application/json'
    }
  }
  
  export const getInitialCards = () => {
      return fetch(config.baseUrl + 'cards' , {headers: {...config.headers}})
        .then((res) => {
            if(res.status === 200) {
                return res.json()
            }
        })
        .then((cards) => {
            return cards
        })
      // ...
  } 

  export const editUserProfile = (user) => {
    return fetch(`${config.baseUrl}users/me`, {
        method: 'PATCH',
        headers: {...config.headers},
        body:JSON.stringify(user)
    })
    .then((res)=> {
        if(res.status === 200){
            return res.json()
        }
    })
    .then((user) =>{
        return user
    })
  }


  export const getUserProfile = () => {
    return fetch (`${config.baseUrl}users/me`, {
        method: 'GET',
        headers: {...config.headers},
        body: JSON.stringify()
    })
        .then((res)=> {
            if(res.status === 200){
                return res.json()
            }
        })
        .then((user)=> {
            return user
        })
    }

    export function initializationPage() {
    return Promise.all([getUserProfile(), getInitialCards()])
    }


    export const postCard = (card) => {   // 
        return fetch(`${config.baseUrl}cards`,{
            method: 'POST',
            headers: {...config.headers},
            body: JSON.stringify(card)   // {name: 'Архыз', link:''}
        })
        .then((res)=> {
            if(res.status === 200){
                return res.json()
            }
        }) 
        .then((card)=> {
        return card
        })
    }

    export const editAvatar = (avatar) => {
        return fetch (`${config.baseUrl}users/me/avatar`, {
            method: 'PATCH',
            headers: {...config.headers},
            body: JSON.stringify(avatar)
        })
        .then((res)=> {
            if(res.status === 200){
                return res.json()
            }
        })
        .then((avatar)=> {
            return avatar
        })
    }