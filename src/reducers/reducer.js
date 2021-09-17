import { SET_COUNT } from '../Actions/updatecardactions'

const initialState = {
    name: "Ibadan Fresh",
    cartcount: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COUNT:
            {
                return { ...state, cartcount: action.payload }
            }
        default:
            return state
}

}

export default reducer;