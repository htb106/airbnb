import { GET_LOCATIONS } from "../Type/ManageLocationsType";

const initialState = {
    arrLocation: [],
};

const locationReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_LOCATIONS:
            state.arrLocation = payload;
            break;

        default:
            break
    };
    return { ...state };
};

export default locationReducer;