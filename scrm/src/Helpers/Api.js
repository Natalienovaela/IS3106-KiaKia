const SERVER_PREFIX = "http://localhost:8080/KiaKia-war/webresources";

const Api = {
    //trips
    getTrip(tripId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}`);
    },
    getAllTrips() {
        return fetch(`${SERVER_PREFIX}/trips/AllTrip`);
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
    //notes
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
    //checkLists
    createCheckList(tripId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/checkLists`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
        });
    },
    updateCheckList(tripId, checkListId, checkList) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/checkLists/${checkListId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(checkList),
        });
    },
    retrieveAllCheckListInTrip(tripId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/checkLists`);
    },
    deleteCheckList(tripId, checkListId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/checkLists/${checkListId}`, {
            method: "DELETE",
        });
    },
    //share
    shareTrip(tripId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/shareWhole`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
        });
    },
    unshareTrip(tripId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/unshareWhole`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
        });
    },
    
    //itinerary
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
    updateItinerary(tripId, itinerary) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/itineraries`,{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(itinerary),
        })
    },

    //placeLineItem
    createPlaceLineItem(tripId, itineraryId, placeId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/itineraries/${itineraryId}/places/${placeId}`), {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
        }
    },

    removePlaceLineItem(tripId, itineraryId, placeLineItemId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/itineraries/${itineraryId}/placeLineItems/${placeLineItemId}`, {
            method: "DELETE",
        })
    },



    //user
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

    //explore
    searchTripByCityOrCountry(data) {
        return fetch(`${SERVER_PREFIX}/explore/searchTripByCityOrCountry`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "GET",
                body: JSON.stringify(data),
            }
        );     
    },
    searchPlaceByCityOrCountry(data) {
        return fetch(`${SERVER_PREFIX}/explore/searchPlaceByCityOrCountry`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "GET",
                body: JSON.stringify(data),
            }
        );     
    },

    //bucketList
    createBucketListItem(tripId, placeId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/bucketLists/explore/${placeId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
        });
    },

    removeBucketListItem(tripId, bucketListItemId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/bucketLists/${bucketListItemId}`, {
            method: "DELETE",
        })
    }

};

export default Api;
