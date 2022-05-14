import axiosMapbox from './axiosMapbox';

const manageMapBoxApi = {
    getLocationMap(searchTerm, params) {
        const url = `/geocoding/v5/mapbox.places/${searchTerm}.json`;
        return axiosMapbox.get(url, { params })
    },
}
export default manageMapBoxApi;