import axios from 'axios'
export const balanceReducer = (state, action) => {
    console.log(action, state);
    switch (action.type) {
        case 'GET_BALANCE':
            const endpoint = "https://tt.delivera.uz/api/users/user-balance";
            axios({
                method: "post",
                url: endpoint,
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).token}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    return response.data;
                })
                .catch(error => {
                    console.log(error, "error in categories");
                });
        default:
            return
    }
}
