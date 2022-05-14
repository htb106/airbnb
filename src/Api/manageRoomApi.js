import axiosClient from "./axiosClient";

export const manageRoomsApi = {
    getRoomList(id) {
        const url = `/rooms?locationId=${id}`;
        return axiosClient.get(url);
    },

    getRoomDetail(id) {
        const url = `/rooms/${id}`;
        return axiosClient.get(url);
    }, 

    addRoom (info) {
        const url = `/rooms`;
        return axiosClient.post(url, info);
    },

    editRoom(id, info) {
        const url = `/rooms/${id}`;
        return axiosClient.put(url, info);
    },

    deleteRoom(id) {
        const url = `/rooms/${id}`;
        return axiosClient.delete(url)
    },
}