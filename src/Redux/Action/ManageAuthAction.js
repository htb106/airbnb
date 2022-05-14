import { manageAuthApi } from "../../Api/manageAuthApi";
import { TOKEN, USER_ID } from "../../Untilities/config";
import { LOGIN } from "../Type/ManageAuthType";
import createAction from "./CreateAction";

export const loginAction = (data, callback, success, error) => {
    return async (dispatch) => {
        try {
            const res = await manageAuthApi.login(data);

            dispatch(
                createAction(
                    LOGIN,
                    res.user
                )
            );

            localStorage.setItem(TOKEN, res.token);

            localStorage.setItem(USER_ID, res.user._id);

            callback();

            success()

        }
        catch (err) {
            console.log(err);

            error();
        }
    }
};

export const registerAction = (data, callback, success, error) => {
    return async () => {
        try {
            await manageAuthApi.register(data);

            callback();

            success();

        }
        catch (err) {
            console.log(err);

            callback();

            error();
        }
    }
};

export const getInfoUserAction = (id) => {
    return async (dispatch) => {
        try {
            const res = await manageAuthApi.getInfoUser(id);

            dispatch(
                createAction(
                    LOGIN,
                    res
                )
            );
        }
        catch (err) {
            console.log(err)
        }
    }
};

export const postAvatarUserAction = (formData) => {
    return async (dispatch) => {
        try {
            await manageAuthApi.postAvatarUser(formData);
        }
        catch (err) {
            console.log(err)
        }
    }
};