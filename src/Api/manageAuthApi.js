import axiosClient from "./axiosClient";

export const manageAuthApi = {
    login (data) {
        const url = '/auth/login';
        return axiosClient.post(url, data);
    },

    register (data) {
        const url = '/auth/register';
        return axiosClient.post(url, data);
    },

    getInfoUser (id) {
        const url = `/users/${id}`;
        return axiosClient.get(url);
    },

    postAvatarUser (formData) {
        const url = '/users/upload-avatar';
        return axiosClient.post(url, formData);
    }
};