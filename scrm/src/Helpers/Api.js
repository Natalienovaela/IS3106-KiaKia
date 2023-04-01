const SERVER_PREFIX = "http://localhost:8080/KiaKia/webresources";

const Api= {
    getAllTrips() {
        return fetch(`${SERVER_PREFIX}/trips`);
    },

    getAllPersonalTrips() {
        return fetch(`${SERVER_PREFIX}/trips`);
    },

    getAllGroupTrips() {
        return fetch(`${SERVER_PREFIX}/trips`);
    }
};

export default Api;