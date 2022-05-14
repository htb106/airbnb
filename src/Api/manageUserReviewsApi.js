import axiosClient from "./axiosClient";

export const manageUserReviewsApi = {
    getUserReviews(id){
        const url = `/reviews/byRoom?roomId=${id}`;
        return axiosClient.get(url)
    }
};