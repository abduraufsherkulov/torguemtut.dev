export const authReducer = (state, action) => {
    // console.log(state);
    switch (action.type) {
        case 'SIGN_IN':
            if (localStorage.getItem('userData') !== null) {
                localStorage.removeItem('userData');
                return {token: null, session: null};
            }
            localStorage.setItem('userData', action.userData);
            return JSON.parse(action.userData)
        case 'SESSION_EXPIRED':
            let data = JSON.stringify({token: null, session: false});
            localStorage.setItem('userData', data);
            return data;
        case 'FB_LOGIN':
            return
        default:
            return
    }
}
