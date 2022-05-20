import { manageRoomsApi } from "../../Api/manageRoomApi";
import { GET_ROOM_DETAIL, GET_ROOM_LIST } from "../Type/ManageRoomsType";
import createAction from "./CreateAction";

export const getRoomListAction = (id) => {
    return async (dispatch) => {
        try {
            const res = await manageRoomsApi.getRoomList(id);

            dispatch(
                createAction(
                    GET_ROOM_LIST,
                    res,
                )
            )
        }
        catch (err) {
            console.log(err)
        }
    }
};

export const getRoomDetailAction = (id) => {
    return async (dispatch) => {
        try {
            const res = await manageRoomsApi.getRoomDetail(id);

            dispatch(
                createAction(
                    GET_ROOM_DETAIL,
                    res,
                )
            )
        }
        catch (err) {
            console.log(err)
        }
    }
};

export const deleteRoomAction = (id, callback, idLocation) => {
    return async (dispatch) => {
        try {
            await manageRoomsApi.deleteRoom(id);

            callback();

            dispatch(getRoomListAction(idLocation));

        }
        catch (err) {
            console.log(err)
        }
    }
};

export const addRoomAction = (info, callback) => {
    return async (dispatch) => {
        try {
            await manageRoomsApi.addRoom(info);

            callback();
        }
        catch (err) {
            console.log(err)
        }
    }
};

export const editRoomAction = (id, info, callback) => {
    return async (dispatch) => {
        try {
            await manageRoomsApi.editRoom(id, info);

            callback();
        }
        catch (err) {
            console.log(err)
        }
    }
};

