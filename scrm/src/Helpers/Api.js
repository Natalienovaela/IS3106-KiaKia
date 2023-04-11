const SERVER_PREFIX = "http://localhost:8080/KiaKia-war/webresources";

const Api = {
    getAllTrips() {
        return fetch(`${SERVER_PREFIX}/trips`);
    },

    getAllPersonalTrips() {
        return fetch(`${SERVER_PREFIX}/trips/AllTrip`);
    },

    getAllGroupTrips() {
        return fetch(`${SERVER_PREFIX}/trips/group`);
    },
    getAllNotesInTrip(tripId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/notes`);
    },
    createNote(tripId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/notes`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
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

    getTrip(tripId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}`);
    },


    createItinerary(tripId, data) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/itineraries`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        )
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error creating itinerary");
                }
                return response.json();
            });
    },

    createUser(data) {
        return fetch(`${SERVER_PREFIX}/users`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        })
    },

    loginUser(email, password) {
        const formData = new URLSearchParams();
        formData.append("email", email);
        formData.append("password", password);

        return fetch(`${SERVER_PREFIX}/users/login`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
            body: formData,
        })
    },

    getUser(userId) {
        return fetch(`${SERVER_PREFIX}/users/${userId}`);
    },

    createTrip(data, user_id) {
        return fetch(`${SERVER_PREFIX}/trips/${user_id}`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        )
    }
};

export default Api;
