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