import { manageLocationsApi } from "../../Api/manageLocationApi";
import createAction from "./CreateAction";
import { GET_LOCATIONS } from '../Type/ManageLocationsType';

export const getLocationAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await manageLocationsApi.getAll(id);

            dispatch(
                createAction(
                    GET_LOCATIONS,
                    result,
                )
            );
        }
        catch (err) {
            console.log(err)
        }
    }
};

export const deleteLocationAction = (idRoom, callback) => {
    return async (dispatch) => {
        try {
            await manageLocationsApi.deleteLocation(idRoom);
            dispatch(getLocationAction());
            callback();
        }
        catch (err) {
            console.log(err)
        }
    }
};

export const editLocationAction = (idLocation, infoLocation, callback) => {
    return async (dispatch) => {
        try {
            await manageLocationsApi.editLocation(idLocation, infoLocation);
            dispatch(getLocationAction());
            callback();
        }
        catch (err) {
            console.log(err)
        }
    }
};

export const addLocationAction = (infoLocation, callback) => {
    return async (dispatch) => {
        try {
            await manageLocationsApi.addLocation(infoLocation);
            dispatch(getLocationAction());
            callback();
        }
        catch (err) {
            console.log(err)
        }
    }
};

