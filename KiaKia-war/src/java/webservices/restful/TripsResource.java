/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.CheckList;
import entity.Note;
import entity.Trip;
import error.CheckListNotFoundException;
import error.CityOrCountryNotSelected;
import error.NoteNotFoundException;
import error.TripNotFoundException;
import error.UnknownPersistenceException;
import java.util.List;
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
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.CheckListSessionBeanLocal;
import session.NoteSessionBeanLocal;
import session.PlaceSessionBeanLocal;
import session.TripSessionBeanLocal;

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
    private CheckListSessionBeanLocal checkListSessionBeanLocal;

    @EJB
    private PlaceSessionBeanLocal placeSessionBeanLocal;

    //to get all the trip
    @GET
    @Path("/AllTrip")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllTrips() {
        List<Trip> trip = tripSessionBeanLocal.getAllTrips();
        GenericEntity<List<Trip>> entity = new GenericEntity<List<Trip>>(trip){};
        return Response.status(200).entity(entity).build();
    }

    //just to try if the api works 
    @GET
    @Path("/random")
    public Response test() {
        return Response.status(204).build();
    }

    //to get all the personal trips
    @GET
    @Path("/personal")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllPersonalTrips() {
        List<Trip> trip = tripSessionBeanLocal.getAllPersonalTrips();
        GenericEntity<List<Trip>> entity = new GenericEntity<List<Trip>>(trip){};
        return Response.status(200).entity(entity).build();
    }

    //to get all the group trips
    @GET
    @Path("/group")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllGroupTrips() {
        List<Trip> trip = tripSessionBeanLocal.getAllGroupTrips();
        GenericEntity<List<Trip>> entity = new GenericEntity<List<Trip>>(trip){};
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
    @Path("/{trip_id}/checkLists/{checkList_id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createCheckList(@PathParam("trip_id") Long tripId, CheckList checkList) {
        try {
            checkListSessionBeanLocal.createNewCheckList(tripId, checkList);
            return Response.status(200).entity(tripSessionBeanLocal.retrieveTripByTripId(tripId)).build();
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
            GenericEntity<List<CheckList>> entity = new GenericEntity<List<CheckList>>(checkLists){};
            return Response.status(200).entity(entity).build();
        }
        catch(TripNotFoundException ex) {
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
        }
        catch(CheckListNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
        catch(TripNotFoundException ex) {
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
    
    

}
