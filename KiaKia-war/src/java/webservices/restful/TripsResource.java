/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.CheckList;
import entity.Note;
import entity.Poll;
import entity.Trip;
import enumeration.UserRoleEnum;
import entity.User;
import entity.CheckListItem;
import error.CheckListItemNotFoundException;
import error.CheckListNotFoundException;
import error.NoteNotFoundException;
import error.PollClosedException;
import error.PollNotFoundException;
import error.TripNotFoundException;
import error.UnknownPersistenceException;
import error.UserHasPolledException;
import error.UserNotFoundException;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.CheckListSessionBeanLocal;
import session.NoteSessionBeanLocal;
import session.PlaceSessionBeanLocal;
import session.PollSessionBeanLocal;
import session.TripSessionBeanLocal;
import session.UserSessionBeanLocal;

/**
 * REST Web Service
 *
 * @author Natalienovaela
 */
@Path("trips")
public class TripsResource {

    @EJB
    private TripSessionBeanLocal tripSessionBeanLocal;

    @EJB
    private NoteSessionBeanLocal noteSessionBeanLocal;

    @EJB
    private PollSessionBeanLocal pollSessionBeanLocal;

    @EJB
    private CheckListSessionBeanLocal checkListSessionBeanLocal;

    @EJB
    private UserSessionBeanLocal userSessionBeanLocal;

    //just to try if the api works 
    @GET
    @Path("/random")
    public Response test() {
        return Response.status(204).build();
    }

    //to get all sharedTrips
    @GET
    @Path("/allSharedTrips")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllSharedTrips() {
        List<Trip> trip = tripSessionBeanLocal.getAllSharedTrips();
        GenericEntity<List<Trip>> entity = new GenericEntity<List<Trip>>(trip) {
        };
        return Response.status(200).entity(entity).build();
    }

    //to retrieve all notes in trip
    @GET
    @Path("/{trip_id}/notes")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response retrieveAllNotesInTrip(@PathParam("trip_id") Long tripId) {
        List<Note> notes;
        System.out.println("Retrieve all notes in trip triggered");
        try {
            notes = noteSessionBeanLocal.retrieveAllNotesInTrip(tripId);
            return Response.status(200).entity(notes).build();
        } catch (TripNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();

            return Response.status(404).entity(exception).build();
        }
    }

    //to create new note 
    @POST
    @Path("/{trip_id}/notes")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createNote(@PathParam("trip_id") Long tripId) {

        try {
            System.out.println("createNote triggered");
            noteSessionBeanLocal.createNewNote(tripId);
            System.out.println("createNewNote");
            Trip trip = tripSessionBeanLocal.retrieveTripByTripId(tripId);
            System.out.println("retrieveTrip");
            return Response.status(200).entity(trip).build();
        } catch (UnknownPersistenceException | TripNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();

            return Response.status(404).entity(exception).build();
        }
    }

    @PUT
    @Path("/{trip_id}/notes/{note_id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateNote(@PathParam("trip_id") Long tripId, @PathParam("note_id") Long noteId, Note n) {
        try {
            noteSessionBeanLocal.updateNote(n);
            Trip trip = tripSessionBeanLocal.retrieveTripByTripId(tripId);
            return Response.status(200).entity(trip).build();
        } catch (TripNotFoundException | NoteNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();

            return Response.status(404).entity(exception).build();
        }
    }

    @DELETE
    @Path("/{trip_id}/notes/{note_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteNote(@PathParam("trip_id") Long tripId,
            @PathParam("note_id") Long noteId) {
        try {
            System.out.println("Delete note triggered");
            boolean res = noteSessionBeanLocal.removeNote(tripId, noteId);
            return Response.status(204).entity(res).build();
        } catch (TripNotFoundException | NoteNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }

    @POST
    @Path("/{trip_id}/checkLists")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createCheckList(@PathParam("trip_id") Long tripId, String name) {
        try {
            CheckList checklist = checkListSessionBeanLocal.createNewCheckList(tripId, name);
            return Response.status(200).entity(checklist).build();
        } catch (UnknownPersistenceException | TripNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }

    @PUT
    @Path("/{trip_id}/checkLists/{checkList_id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateCheckList(CheckList checkList) {
        try {
            checkListSessionBeanLocal.updateCheckList(checkList);
            return Response.status(204).build();
        } catch (CheckListNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }

    @GET
    @Path("/{trip_id}/checkLists")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAllCheckListsInTrip(@PathParam("trip_id") Long tripId) {
        try {
            List<CheckList> checkLists = checkListSessionBeanLocal.getAllCheckListInTrip(tripId);
            GenericEntity<List<CheckList>> entity = new GenericEntity<List<CheckList>>(checkLists) {
            };
            return Response.status(200).entity(entity).build();
        } catch (TripNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }

    @DELETE
    @Path("/{trip_id}/checkLists/{checkList_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteCheckList(@PathParam("trip_id") Long tripId,
            @PathParam("checkList_id") Long checkListId) {
        try {
            tripSessionBeanLocal.removeCheckList(tripId, checkListId);
            return Response.status(204).build();
        } catch (CheckListNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        } catch (TripNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }
    
    @POST
    @Path("/checklists/{checklist_id}/checkListItems")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createChecklistItem(@PathParam("checklist_id")Long checkListId, String content) {
        try {
            CheckList checklist = checkListSessionBeanLocal.createCheckListItem(checkListId, content);
            return Response.status(200).entity(checklist).type(MediaType.APPLICATION_JSON).build();
        }
        catch(CheckListNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }
    
    @DELETE
    @Path("/checklists/{checklist_id}/checkListItems/{checkListItem_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeCheckListItem(@PathParam("checklist_id") Long checkListId, @PathParam("checkListItem_id") Long checkListItemId) {
        try {
            checkListSessionBeanLocal.removeCheckListItem(checkListId, checkListItemId);
            return Response.status(204).build();
        }
        catch(CheckListNotFoundException | CheckListItemNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }

    @GET
    @Path("/{trip_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTrip(@PathParam("trip_id") Long tripId) {
        try {
            Trip trip = tripSessionBeanLocal.getTrip(tripId);
            return Response.status(200).entity(trip).type(MediaType.APPLICATION_JSON).build();

        } catch (TripNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @PUT
    @Path("/{trip_id}/shareWhole")
    @Produces(MediaType.APPLICATION_JSON)
    public Response shareWholeTrip(@PathParam("trip_id") Long tripId) {
        try {
            System.out.println("share whole trip triggered");
            boolean res = tripSessionBeanLocal.shareWholeTrip(tripId);
            return Response.status(200).entity(res).type(MediaType.APPLICATION_JSON).build();
        } catch (TripNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @PUT
    @Path("/{trip_id}/unshareWhole")
    @Produces(MediaType.APPLICATION_JSON)
    public Response unshareWholeTrip(@PathParam("trip_id") Long tripId) {
        try {
            System.out.println("UNshare whole trip triggered");
            boolean res = tripSessionBeanLocal.unshareWholeTrip(tripId);
            return Response.status(200).entity(res).type(MediaType.APPLICATION_JSON).build();
        } catch (TripNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    //to retrieve all polls in trip
    @GET
    @Path("/{trip_id}/polls")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response retrieveAllPollsInTrip(@PathParam("trip_id") Long tripId) {
        List<Poll> polls;
        System.out.println("Retrieve all polls in trip triggered, TRIP ID = " + tripId);
        try {
            polls = pollSessionBeanLocal.retrieveAllPollsInTrip(tripId);
            return Response.status(200).entity(polls).build();
        } catch (TripNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();

            return Response.status(404).entity(exception).build();
        }
    }

    @GET
    @Path("{trip_id}/users/{user_id}/userRole")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getUserRole(@PathParam("trip_id") Long tripId, @PathParam("user_id") Long userId) {
        try {
            System.out.println("get user role triggered" + tripId + userId);
            
            UserRoleEnum userRoleEnum = tripSessionBeanLocal.getRole(tripId, userId);
            return Response.status(200).entity(userRoleEnum).build();
        } catch (UserNotFoundException | TripNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }

    @GET
    @Path("/{trip_id}/polls/{poll_id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response retrievePoll(@PathParam("poll_id") Long pollId) {
        Poll poll;
        System.out.println("Retrieve specific poll triggered");
        try {
            poll = pollSessionBeanLocal.retrievePollByPollId(pollId);
            return Response.status(200).entity(poll).build();
        } catch (PollNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();

            return Response.status(404).entity(exception).build();
        }
    }

    @GET
    @Path("/{trip_id}/hasPolled/polls/{poll_id}/user/{user_id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response hasUserPolled(@PathParam("poll_id") Long pollId, @PathParam("user_id") Long userId) {
        try {
            User user = userSessionBeanLocal.retrieveUserByUserId(userId);
            Poll poll = pollSessionBeanLocal.retrievePollByPollId(pollId);
            boolean res = pollSessionBeanLocal.hasUserPolled(poll, user);
            return Response.status(200).entity(res).build();
        } catch (PollNotFoundException | UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();

            return Response.status(404).entity(exception).build();
        }
    }

    @GET
    @Path("/{trip_id}/calculatePercentage/polls/{poll_id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response calculatePercentage(@PathParam("poll_id") Long pollId) {
        try {
            Poll p = pollSessionBeanLocal.retrievePollByPollId(pollId);
            HashMap<Long, Double> res = pollSessionBeanLocal.calculatePercentage(p);
            return Response.status(200).entity(res).build();
        } catch (PollNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();

            return Response.status(404).entity(exception).build();
        }
    }
    
    @POST
    @Path("/{trip_id}/polls/user/{user_id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createPoll(@PathParam("trip_id") Long tripId, @PathParam("user_id") Long userId, String[] details) {
        try {
            System.out.println("create poll invoked");
            Trip trip = tripSessionBeanLocal.retrieveTripByTripId(tripId);
            User creator = userSessionBeanLocal.retrieveUserByUserId(userId);
            HashMap<Long, String> options = new HashMap<>();
            String question = details[0];
            for(int i = 1; i < details.length; i++) {
                long l = i;
                options.put(l, details[i]);
            }
            Poll poll1 = new Poll(question, options, creator);
            pollSessionBeanLocal.createNewPoll(poll1, trip.getTripId());
            return Response.status(200).entity(pollSessionBeanLocal.retrieveAllPollsInTrip(tripId)).build();
        } catch (UnknownPersistenceException | TripNotFoundException | UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }

    @PUT
    @Path("/{trip_id}/polls/{poll_id}/{option_id}/user/{user_id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response submitPoll(@PathParam("trip_id") Long tripId, @PathParam("poll_id") Long pollId, @PathParam("user_id") Long userId, @PathParam("option_id") Long optionId) {
        try {
            System.out.println("Submit poll in trip triggered");
            Poll poll = pollSessionBeanLocal.retrievePollByPollId(pollId);
            pollSessionBeanLocal.pollOption(poll, optionId, userId);
            Boolean bool = true;
            return Response.status(200).entity(bool).build();
        } catch (PollNotFoundException | UserNotFoundException | UserHasPolledException | PollClosedException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }

    @DELETE
    @Path("/{trip_id}/polls/{poll_id}/user/{user_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deletePoll(@PathParam("trip_id") Long tripId,
            @PathParam("poll_id") Long pollId, @PathParam("user_id") Long userId) {
        try {
            System.out.println("Delete poll triggered");
            pollSessionBeanLocal.removePoll(tripId, pollId);
            return Response.status(200).entity(pollSessionBeanLocal.retrieveAllPollsInTrip(tripId)).build();
        } catch (TripNotFoundException | PollNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }
    
    @POST
    @Path("/{user_id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createTrip(Trip t, @PathParam("user_id") Long userId) {
        try {
            tripSessionBeanLocal.addNewTrip(t, userId);
            return Response.status(200).entity(t).type(MediaType.APPLICATION_JSON).build();
        } catch (UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createAndInviteUserToTrip(Trip t, @QueryParam("userId") Long userId, @QueryParam("userEmails") String userEmails, @QueryParam("userRoles") String userRoles) {
        try {
            System.out.println("Received request to create and invite users to trip.");
            System.out.println("Trip: " + t);
            System.out.println("UserId: " + userId);
            System.out.println("UserEmails: " + userEmails);
            System.out.println("UserRoles: " + userRoles);
            List<String> userEmailsList = new ArrayList<>();
            List<String> userRolesList = new ArrayList<>();
            if (!userEmails.isEmpty()) {
                String[] userEmailsArray = userEmails.split(",");
                userEmailsList = Arrays.asList(userEmailsArray);
                System.out.println(userEmailsList.size());
                String[] userRolesArray = userRoles.split(",");
                userRolesList = Arrays.asList(userRolesArray);
            }

            tripSessionBeanLocal.createAndInviteUsersToTrip(t, userId, userEmailsList, userRolesList);

            System.out.println("Trip created and users invited successfully.");
            System.out.println("Adding trip to response: " + t);
            return Response.status(200).entity(t).type(MediaType.APPLICATION_JSON).build();
        } catch (UserNotFoundException ex) {
            System.err.println("Failed to create and invite users to trip: " + ex.getMessage());
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }
    
//    @POST
//    @Path("/{tripId}")
//    @Consumes(MediaType.APPLICATION_JSON)
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response inviteUserToTrip(@PathParam("tripId") Long tripId, @QueryParam("userId") Long userId, @QueryParam("userEmail") String userEmail, @QueryParam("userRole") String userRole) {
//        try {
//            System.out.println("Received request to create and invite user to trip.");
//            System.out.println("Trip: " + tripId);
//            System.out.println("UserId: " + userId);
//            System.out.println("UserEmail: " + userEmail);
//            System.out.println("UserRole: " + userRole);
//
//            tripSessionBeanLocal.inviteUserToTrip(tripId, userId, userEmail, userRole);
//            Trip t = tripSessionBeanLocal.getTrip(tripId);
//            System.out.println("Trip created and users invited successfully.");
//            System.out.println("Adding trip to response: " + t);
//            return Response.status(200).entity(t).type(MediaType.APPLICATION_JSON).build();
//        } catch (UserNotFoundException | TripNotFoundException ex) {
//            System.err.println("Failed to create and invite users to trip: " + ex.getMessage());
//            JsonObject exception = Json.createObjectBuilder()
//                    .add("error", ex.getMessage())
//                    .build();
//            return Response.status(404).entity(exception).build();
//        }
//    }
    
    @GET
    @Path("/{tripId}/users")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUsersInTrip(@PathParam("tripId") Long tripId) {
        int noUsers = tripSessionBeanLocal.findNumberOfUsersInTrip(tripId);
        Map<String, Integer> responseMap = new HashMap<>();
            responseMap.put("noUsers", noUsers);
        return Response.status(200).entity(responseMap).type(MediaType.APPLICATION_JSON).build();
    }
    
    @GET
    @Path("/{tripId}/days")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getDaysInTrip(@PathParam("tripId") Long tripId) {
        int noDays = tripSessionBeanLocal.getNumOfDaysInTrip(tripId);
        Map<String, Integer> responseMap = new HashMap<>();
            responseMap.put("noDays", noDays);
        return Response.status(200).entity(responseMap).type(MediaType.APPLICATION_JSON).build();
    }
}
