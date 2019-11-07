export const wishlistReducer = (state, action) => {
    console.log(state);
    console.log(action);
    switch (action.type) {
        case 'INIT_WISHLIST':
            return state
        case 'ADD_WISHLIST':
            return
        case 'REMOVE_WISHLIST':
            return
        default:
            return
    }
}
