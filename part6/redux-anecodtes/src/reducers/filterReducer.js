// THE ULTIMATE REDUCER/SHOPKEEPER THAT DOES WHAT IS SAID BY AN ACTION
const reducer = (state = '', action) => {
    switch (action.type) {
        case "FILTER":
            return action.data;
    }
    return state
}
// ACTION CREATORS
export const newFilterAction = (data) => {
    return {
        type: 'FILTER',
        data: {
            data
        }
    }
}

export default reducer