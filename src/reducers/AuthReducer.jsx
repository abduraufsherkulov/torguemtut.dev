export const authReducer = (state, action) => {
    console.log(state);
    switch (action.type) {
        case 'SIGN_IN':
            if (localStorage.getItem('username') !== null) {
                localStorage.removeItem('username');
                return null;
            }
            localStorage.setItem('username', action.username);
            // console.log(action.username, state);
            return action.username
        case 'SIGN_UP':
            return
        case 'FB_LOGIN':
            return
        default:
            return
    }
}
