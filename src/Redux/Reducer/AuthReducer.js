import { LOGIN, LOGOUT } from "../Type/ManageAuthType";

const initialState = {
    user: {},
};

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN:
            state.user = payload;
            break;

        case LOGOUT:
            state.user = {};
            break;

        default:
            break;
    }
    return { ...state };
};

export default authReducer;