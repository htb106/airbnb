import { GET_ROOM_DETAIL, GET_ROOM_LIST } from "../Type/ManageRoomsType";

const initialState = {
    arrRoom: [],
    detailRoom: {},
};

const roomReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ROOM_LIST:
            state.arrRoom = payload;
            break;

        case GET_ROOM_DETAIL:
            state.detailRoom = payload;
            break;

        default:
            break
    };
    return { ...state };
};

export default roomReducer;