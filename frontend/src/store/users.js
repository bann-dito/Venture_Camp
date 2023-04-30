const ADD_USERS = 'users/ADD_USERS';
const ADD_USER = 'users/ADD_USER';

export const addUsers = (users) => ({
    type: ADD_USERS,
    users
});

export const addUser = (user) => ({
    type: ADD_USER,
    user
});


function userReducer(state = {}, action) {
    Object.freeze(state);
    const newState = {...state};
    switch (action.type) {
        case ADD_USERS:
            newState.users = action.users;
            return newState;
        case ADD_USER:
            newState.user = action.user;
            return newState;
        default:
            return state;
    }
}

export default userReducer;