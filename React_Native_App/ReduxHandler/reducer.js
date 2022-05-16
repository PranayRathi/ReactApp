

const cartItems = (state = {}, action) => {

    const addToCart = (id) => {
        console.log("===== addToCart new state", id);
        let st = state
        let newState = { ...state };
        if (st.hasOwnProperty(id)) {
            let newData = st[id] + 1;
            newState[id] = newData;
        } else {
            newState[id] = 1;
        }
        state = newState;
        console.log("===== addToCart new state", state, newState);
        return state;
    }

    const removeCartItem = (id) => {
        let st = state
        let newState = { ...state };
        if (st.hasOwnProperty(id)) {
            delete newState[id];
        }
        state = newState;
        console.log("===== addToCart new state", state, newState);
        return state;
    }

    switch (action.type) {
        case 'ADD_TO_CART':
            return addToCart(action.payload)
        case 'REMOVE_FROM_CART':
            return removeCartItem(action.payload)
        case 'CLEAR_CART':
            state = {}
            return state;
    }


    return state
}

export default cartItems