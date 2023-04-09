/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.CheckList;
import entity.Note;
import entity.Trip;
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
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.CheckListSessionBeanLocal;
import session.NoteSessionBeanLocal;
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
    

    @GET
    @Path("/AllTrip")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Trip> getAllTrips() {
        return tripSessionBeanLocal.getAllTrips();
    }
    
    @GET
    @Path("/random")
    public Response test() {
            return Response.status(204).build();
    }

    @GET
    @Path("/personal")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Trip> getAllPersonalTrips() {
        return tripSessionBeanLocal.getAllPersonalTrips();
    }

    @GET
    @Path("/group")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Trip> getAllGroupTrips() {
        return tripSessionBeanLocal.getAllGroupTrips();
    }

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

    @POST
    @Path("/{trip_id}/notes")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createNote(@PathParam("trip_id") Long tripId, Note n) {

        try {
            noteSessionBeanLocal.createNewNote(n, tripId);
            Trip trip = tripSessionBeanLocal.retrieveTripByTripId(tripId);
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
    
    @POST
    @Path("/{trip_id}/checkLists/{checkList_id")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createCheckList(@PathParam("trip_id") Long tripId, CheckList checkList) {
        try {
            checkListSessionBeanLocal.createNewCheckList(tripId, checkList);
            return Response.status(200).entity(tripSessionBeanLocal.retrieveTripByTripId(tripId)).build();
        }
        catch(UnknownPersistenceException | TripNotFoundException ex) {
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

}
