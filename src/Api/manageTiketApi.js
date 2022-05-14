import axiosClient from "./axiosClient";

export const manageTiketApi = {
    getTiketRoom (userId) {
        const url = `/tickets/by-user?userId=${userId}`;
        return axiosClient.get(url);
    },

    bookingTiket (data) {
        const url = `/tickets`;
        return axiosClient.post(url, data);
    }
};