export const wishlistReducer = (state, action) => {
    console.log(state);
    console.log(action);
    switch (action.type) {
        case 'INIT_WISHLIST':
            return { wishlist: [...action.wishlist] }
        case 'ADD_WISH':
            return { wishlist: [...state.wishlist, action.wishlist] }
        case 'REMOVE_WISH':
            return { wishlist: state.wishlist.filter(wish => wish.id !== action.wishlist.id) }
        default:
            return state
    }
}
