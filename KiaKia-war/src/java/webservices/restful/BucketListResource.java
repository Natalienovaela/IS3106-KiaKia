/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.PlaceLineItem;
import error.DayItineraryNotFoundException;
import error.PlaceLineItemNotFoundException;
import error.PlaceNotFoundException;
import error.TripNotFoundException;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.PlaceLineItemSessionBeanLocal;

/**
 * REST Web Service
 *
 * @author Natalienovaela
 */
@Path("/trips/{trip_id}/bucketLists")
public class BucketListResource {
    @EJB 
    private PlaceLineItemSessionBeanLocal placeLineItemSessionBeanLocal;
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response createBucketListItem(@PathParam("trip_id") Long tripId, @PathParam("place_id") Long placeId) {
        try {
            PlaceLineItem placeLineItem = placeLineItemSessionBeanLocal.createBucketListItem(tripId, placeId);     
            return Response.status(200).entity(placeLineItem).build();
        }
        catch(TripNotFoundException | PlaceNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }
    
    @DELETE
    @Path("{bucketListItem_id")
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeBucketListItem(@PathParam("trip_id") Long tripId, @PathParam("bucketListItem_id") Long placeLineItemId) {
        try {
            placeLineItemSessionBeanLocal.removeBucketListItem(tripId, placeLineItemId);
            return Response.status(204).build();
        }
        catch(TripNotFoundException|PlaceLineItemNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }
    
}
