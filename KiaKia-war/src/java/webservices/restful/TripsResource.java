/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Trip;
import error.TripNotFoundException;
import java.util.List;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
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

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Trip> getAllTrips() {
        return tripSessionBeanLocal.getAllTrips();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Trip> getAllPersonalTrips() {
        return tripSessionBeanLocal.getAllPersonalTrips();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Trip> getAllGroupTrips() {
        return tripSessionBeanLocal.getAllGroupTrips();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTrip(@PathParam("tripId") Long tripId) {
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
