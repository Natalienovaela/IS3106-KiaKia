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

  getTrip(tripId) {
    return fetch(`${SERVER_PREFIX}/trips/${tripId}`);
  },

  createItinerary(tripId, data) {
    return (
      fetch(`${SERVER_PREFIX}/trips/${tripId}/itineraries`),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },
}

export default Api;
