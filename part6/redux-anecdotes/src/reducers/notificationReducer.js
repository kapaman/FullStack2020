// THE ULTIMATE REDUCER/SHOPKEEPER THAT DOES WHAT IS SAID BY AN ACTION
let timeoutIDArr = [];
const reducer = (state = '', action) => {
    switch (action.type) {
        case 'NEW_ANECDOTE':
            if (state.length > 0) {
                for (let i = 0; i < timeoutIDArr.length; i++) {
                    window.clearTimeout(timeoutIDArr[i]);
                }
            }
              return `${action.data.anecdote} has been added`
           
        case 'LIKE_ANECDOTE':
            if (state.length > 0) {
                for (let i = 0; i < timeoutIDArr.length; i++) {
                    window.clearTimeout(timeoutIDArr[i]);
                }
            }
            return `YOU VOTED ${action.data.anecdote}`
            
        case 'RMV_NTFN':
                return ''


    }
    return state
}


// ACTION CREATORS

export const addNotification = (anecdote, type, time) => {
    return async dispatch => {
        dispatch({
            type: type,
            data: {
                anecdote
            }
        })
        let t = setTimeout(() => dispatch({
            type: 'RMV_NTFN',
        }), time * 1000);
        timeoutIDArr.push(t);
    }
}

export default reducer