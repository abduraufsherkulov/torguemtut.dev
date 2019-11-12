export const wishlistReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_WISHLIST':
            return { wishlist: [...action.wishlist] }
        case 'ADD_WISH':
            return { wishlist: [...state.wishlist, action.wishlist] }
        case 'REMOVE_WISH':
            return { wishlist: state.wishlist.filter(wish => wish.id !== action.wishlist.id) }
        case 'INIT_WISHLIST_VENDOR':
            return { wishlistvendor: [...action.wishlistvendor] }
        case 'ADD_WISH_VENDOR':
            return { wishlistvendor: [...state.wishlistvendor, action.wishlistvendor] }
        case 'REMOVE_WISH_VENDOR':
            return { wishlistvendor: state.wishlistvendor.filter(wish => wish.id !== action.wishlistvendor.id) }
        default:
            return state
    }
}
