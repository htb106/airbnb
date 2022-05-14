import axiosClient from "./axiosClient";

export const manageLocationsApi = {
    getAll(params) {
        const url = '/locations';
        return axiosClient.get(url, {params});
    },

    deleteLocation (idRoom) {
        const url = `/locations/${idRoom}`;
        return axiosClient.delete(url);
    },

    addLocation (info) {
        const url = `/locations`;
        return axiosClient.post(url, info);
    },

    editLocation (idRoom, info) {
        const url = `/locations/${idRoom}`;
        return axiosClient.put(url, info);
    },

}