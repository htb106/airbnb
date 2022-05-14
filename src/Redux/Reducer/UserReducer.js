import { SET_USER_LIST } from '../Type/ManageUserType';

const initialState = {
    arrUser: [],
};

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_USER_LIST:
            state.arrUser = payload;
            break;

        default:
            break;
    }
    return { ...state };
}

export default userReducer;