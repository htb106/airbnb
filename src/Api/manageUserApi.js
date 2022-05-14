import axiosClient from "./axiosClient";

export const manageUserApi = {
    getAll() {
        const url = '/users/pagination';
        return axiosClient.get(url);
    },

    addUser(infoUser) {
        const url = `/users`;
        return axiosClient.post(url, infoUser);
    },

    editUser(infoUser, idUser) {
        const url = `/users/${idUser}`;
        return axiosClient.put(url, infoUser);
    },

    deleteUser(idUser) {
        const url = `/users/${idUser}`;
        return axiosClient.delete(url); 
    },

};