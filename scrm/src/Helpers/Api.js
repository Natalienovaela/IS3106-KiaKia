const SERVER_PREFIX = "http://localhost:8080/KiaKia/webresources";

const Api = {
    getAllTrips() {
        return fetch(`${SERVER_PREFIX}/trips`);
    },

    getAllPersonalTrips() {
        return fetch(`${SERVER_PREFIX}/trips`);
    },

    getAllGroupTrips() {
        return fetch(`${SERVER_PREFIX}/trips`);
    },
    // getAllNotesInTrip(tripId, signal) {
    //     return fetch(`${SERVER_PREFIX}/trips/${tripId}/notes`, {
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
    //         },
    //         method: "GET",
    //     });
    // },
    createNote(tripId, note) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/notes`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(note),
        });
    },
    updateNote(tripId, noteId, note) {
        //change this to updateTrip with some paraeter to indicate which component are updated
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/notes/${noteId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(note),
        });
    },
    deleteNote(tripId, noteId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/notes/${noteId}`, {
            method: "DELETE",
        });
    },
};

export default Api;
