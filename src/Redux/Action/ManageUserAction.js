import { manageUserApi } from "../../Api/manageUserApi";
import createAction from "./CreateAction";
import { SET_USER_LIST } from "../Type/ManageUserType";

export const getUserListAction = () => {
    return async (dispatch) => {
        try {
            const res = await manageUserApi.getAll();

            dispatch(
                createAction(
                    SET_USER_LIST,
                    res,
                )
            )
        }
        catch (err) {
            console.log(err);
        };
    }
};

export const addUserAction = (infoUser, callback) => {
    return async (dispatch) => {
        try {
            await manageUserApi.addUser(infoUser);
            dispatch(getUserListAction());
            callback()
        }
        catch (err) {
            console.log(err);
        };
    }
};

export const editUserAction = (infoUser, idUser, callback) => {
    return async (dispatch) => {
        try {
            await manageUserApi.editUser(infoUser, idUser);
            dispatch(getUserListAction());
            callback()
        }
        catch (err) {
            console.log(err);
        };
    }
};

export const deleteUserAction = (idUser, callback) => {
    return async (dispatch) => {
        try {
            await manageUserApi.deleteUser(idUser);
            dispatch(getUserListAction());
            callback()
        }
        catch (err) {
            console.log(err);
        };
    }
};