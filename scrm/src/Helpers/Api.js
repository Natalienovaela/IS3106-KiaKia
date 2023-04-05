const SERVER_PREFIX = "http://localhost:8080/KiaKia/webresources";

const Api= {
    createUser(data) {
        console.log("Creating user:", data);
        return fetch(`${SERVER_PREFIX}/users`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        })
    },
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