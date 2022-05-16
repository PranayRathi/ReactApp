

const cartItems = (state = { cart: {}, total: 0, }, action) => {

    const addToCart = (id) => {
        // console.log("===== addToCart new state", id);
        let st = state.cart
        let newState = { ...st };
        if (st.hasOwnProperty(id)) {
            let newData = st[id] + 1;
            newState[id] = newData;
        } else {
            newState[id] = 1;
        }
        state.cart = newState;
        // console.log("===== addToCart new state", state, newState);
        return state;
    }

    const removeCartItem = (id) => {
        let st = state.cart
        let newState = { ...state.cart };
        if (st.hasOwnProperty(id)) {
            delete newState[id];
        }
        state.cart = newState;
        // console.log("===== addToCart new state", state, newState);
        return state;
    }

    const removeOneCartItem = (id) => {
        let st = state.cart
        let newState = { ...state.cart };
        if (st.hasOwnProperty(id) && st[id] > 1) {
            newState[id] = newState[id] - 1;
        }
        state.cart = newState;
        // console.log("===== removeOneCartItem new state", state, newState);
        return state;
    }

    switch (action.type) {
        case 'ADD_TO_CART':
            return addToCart(action.payload)
        case 'REMOVE_FROM_CART':
            return removeCartItem(action.payload)
        case 'REMOVE_ONE_CART_ITEM':
            return removeOneCartItem(action.payload);
        case 'CLEAR_CART':
            state.cart = {}
            state.total = 0
            return state;
        case 'SET_TOTAL':
            state.total = action.payload
            return state;

    }


    return state
}

export default cartItems