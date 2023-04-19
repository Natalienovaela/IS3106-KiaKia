const SERVER_PREFIX = "http://localhost:8080/KiaKia-war/webresources";

const Api = {
    //trips
    getTrip(tripId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}`);
    },
    getAllTrips(userId) {
        return fetch(`${SERVER_PREFIX}/users/{${userId}/allTrips`);
    },

    getAllPersonalTrips(userId) {
        return fetch(`${SERVER_PREFIX}/users/${userId}/personalTrips`);
    },

    getAllGroupTrips(userId) {
        return fetch(`${SERVER_PREFIX}/users/${userId}/groupTrips`);
    },

    getNumberUsersinTrip(tripId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/users`);
    },

    getAllSharedTrips() {
        return fetch(`${SERVER_PREFIX}/trips/allSharedTrips`);
    },

    getNumOfDaysTrip(tripId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/days`);
    },

    //notes
    getAllNotesInTrip(tripId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/notes`);
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
    },
    createAndInviteUserToTrip(data, userId, userEmails, userRoles) {
        return fetch(`${SERVER_PREFIX}/trips?userId=${userId}&userEmails=${userEmails}&userRoles=${userRoles}`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        )
    },
    // inviteUserToTrip(tripId, userId, userEmail, userRole) {
    //     return fetch(`${SERVER_PREFIX}/trips?tripId=${tripId}&userId=${userId}&userEmail=${userEmail}&userRole=${userRole}`,
    //         {
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //             },
    //             method: "POST",
    //         }
    //     )
    // },
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

    //polls
    getAllPollsInTrip(tripId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/polls`);
    },
    getPoll(tripId, pollId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/polls/${pollId}`);
    },
    createPoll(tripId, userId, details) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/polls/user/${userId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(details),
        });
    },
    hasPolled(tripId, pollId, userId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/hasPolled/polls/${pollId}/user/${userId}`);
    },
    calculatePercentage(tripId, pollId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/calculatePercentage/polls/${pollId}`);
    },
    submitPoll(tripId, userId, pollId, selectedOption) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/polls/${pollId}/${selectedOption}/user/${userId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
        });
    },
    deletePoll(tripId, pollId, userId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/polls/${pollId}/user/${userId}`, {
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
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/itineraries`, {
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
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/itineraries/${itineraryId}/places/${placeId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
        })
    },

    removePlaceLineItem(tripId, itineraryId, placeLineItemId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/itineraries/${itineraryId}/placeLineItems/${placeLineItemId}/remove`, {
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

    getUsers(tripId) {
        return fetch(`${SERVER_PREFIX}/users/${tripId}//allUsers`);
    },

    emailExists(email) {
        return fetch(`${SERVER_PREFIX}/users/query?email=${email}`);
    },
    getUserRole(userId, tripId) {
        return fetch(`${SERVER_PREFIX}/trips/${tripId}/users/${userId}/userRole`);
    },


    resetPassword(user) {
        return fetch(`${SERVER_PREFIX}/users`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(user),
        })
    },

    updateUser(userId, user) {
        return fetch(`${SERVER_PREFIX}/users/${userId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(user),
        })
    },

    //explore
    searchTripByCity(city) {
        return fetch(`${SERVER_PREFIX}/explore/searchTripByCity/${city}`);
    },
    searchTripByCountry(country) {
        return fetch(`${SERVER_PREFIX}/explore/searchTripByCountry/${country}`);
    },
    searchPlaceByCity(city) {
        return fetch(`${SERVER_PREFIX}/explore/searchPlaceByCity/${city}`);
    },
    searchPlaceByCountry(country) {
        return fetch(`${SERVER_PREFIX}/explore/searchPlaceByCountry/${country}`);
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
    },

    // wishlist folder
    createNewFolder(userId, folderName) {
        return fetch(`${SERVER_PREFIX}/users/${userId}/folders/${folderName}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                folderName: folderName
            }),
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
    },

    retrieveAllFolder(userId) {
        return fetch(`${SERVER_PREFIX}/users/${userId}/folders`)
    },

    retrieveFolderWithCertainName(userId, search) {
        return fetch(`${SERVER_PREFIX}/users/${userId}/${search}`)
    },

    updateFolderName(userId, folderId, folderName) {
        return fetch(`${SERVER_PREFIX}/users/${userId}/folders/${folderId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: folderName,
        })
    },
    deleteFolder(userId, folderId) {
        return fetch(`${SERVER_PREFIX}/wishlist/${userId}/folders/${folderId}`, {
            method: "DELETE",
        });
    },

    addTripToFolder(folderId, tripId) {
        return fetch(`${SERVER_PREFIX}/users/folders/${folderId}/${tripId}/add`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
        });
    },
    removeTripFromFolder(folderId, tripId) {
        return fetch(`${SERVER_PREFIX}/wishlist/folders/${folderId}/${tripId}/remove`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
        });
    },

    // places wishlist
    getWishlistPlaces(userId) {
        return fetch(`${SERVER_PREFIX}/users/${userId}/wishlistPlace`);
    },

    linkUserWithWishlistPlace(userId, wishlistPlaceId) {
        return fetch(`${SERVER_PREFIX}/users/${userId}/wishlistPlace/${wishlistPlaceId}/link`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
        });
    },

    removeWishlistPlaceFromUser(userId, wishlistPlaceId) {
        return fetch(`${SERVER_PREFIX}/users/${userId}/wishlistPlace/${wishlistPlaceId}/remove`, {
            method: "DELETE",
        })
    },

    //cityorcountry
    getCityList() {
        return fetch(`${SERVER_PREFIX}/cityOrCountry/city`);
    },

    getCountryList() {
        return fetch(`${SERVER_PREFIX}/cityOrCountry/country`);
    },

    //places
    getPlace(placeId) {
        return fetch(`${SERVER_PREFIX}/places/${placeId}`);
    },

    getAllPlaces() {
        return fetch(`${SERVER_PREFIX}/places`);
    },

    //budgetExpense
    setBudget(tripId, categoryId, data) {
        return fetch(`${SERVER_PREFIX}/budgetExpense/${tripId}/budget/${categoryId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    updateBudget(budgetId, budgetAmt) {
        return fetch(`${SERVER_PREFIX}/budgetExpense/updateBudget/${budgetId}?budgetAmt=${budgetAmt}`);
    },

    deleteBudget(tripId, budgetId) {
        return fetch(`${SERVER_PREFIX}/budgetExpense/${tripId}/budget/${budgetId}`);
    },

    getBudgetByCategory(tripId, categoryId) {
        return fetch(`${SERVER_PREFIX}/budgetExpense/${tripId}/budget/category/${categoryId}`);
    },

    getAvailableCategory(tripId) {
        return fetch(`${SERVER_PREFIX}/budgetExpense/${tripId}/availableCategories`);
    },

    getAssociatedCategory(tripId) {
        return fetch(`${SERVER_PREFIX}/budgetExpense/${tripId}/associatedCategories`);
    },

    getAllCategory(tripId) {
        return fetch(`${SERVER_PREFIX}/budgetExpense/${tripId}/allCategories`);
    },

    getTotalBudget(tripId) {
        return fetch(`${SERVER_PREFIX}/budgetExpense/${tripId}/totalBudget`);
    },

    addExpense(tripId, data) {
        return fetch(`${SERVER_PREFIX}/budgetExpense/${tripId}/expense`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    deleteExpense(tripId, expenseId) {
        return fetch(`${SERVER_PREFIX}/budgetExpense/${tripId}/expense/${expenseId}`);
    },

    getTotalExpenseByCategories(tripId) {
        return fetch(`${SERVER_PREFIX}/budgetExpense/${tripId}/totalExpenseByCategory`);
    },

    getTotalExpenseByCategory(tripId, categoryId) {
        return fetch(`${SERVER_PREFIX}/budgetExpense/${tripId}/totalExpenseByCategory/${categoryId}`);
    },

    getTotalExpense(tripId) {
        return fetch(`${SERVER_PREFIX}/budgetExpense/${tripId}/totalExpense`);
    },

    getTotalExpenseByUser(tripId, userId) {
        return fetch(`${SERVER_PREFIX}/budgetExpense/${tripId}/totalExpense/user/${userId}`);
    },

    getDebtsByUser(tripId, userId) {
        return fetch(`${SERVER_PREFIX}/budgetExpense/${tripId}/debts/user/${userId}`);
    },

    getDebtsOwedByUser(tripId, userId) {
        return fetch(`${SERVER_PREFIX}/budgetExpense/${tripId}/owedDebts/user/${userId}`);
    },

    getOverallDebts(tripId) {
        return fetch(`${SERVER_PREFIX}/budgetExpense/${tripId}/debts`);
    },

    payDebts(tripId, debtId, amt) {
        return fetch(`${SERVER_PREFIX}/budgetExpense/${tripId}/payDebt/${debtId}?amt=${amt}`);
    },

};

export default Api;
