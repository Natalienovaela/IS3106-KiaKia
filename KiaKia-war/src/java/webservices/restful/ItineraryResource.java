/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.DayItinerary;
import entity.PlaceLineItem;
import error.DayItineraryNotFoundException;
import error.PlaceLineItemNotFoundException;
import error.PlaceNotFoundException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.Produces;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.ItinerarySessionBeanLocal;
import session.PlaceLineItemSessionBeanLocal;

/**
 * REST Web Service
 *
 * @author Natalienovaela
 */
@Path("/trips/{tripId}/itineraries")
public class ItineraryResource {

    @EJB
    private ItinerarySessionBeanLocal itinerarySessionBeanLocal;
    
    @EJB
    private PlaceLineItemSessionBeanLocal placeLineItemSessionBeanLocal;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createItinerary(@PathParam("tripId") Long tripId, JsonObject request) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        formatter.setTimeZone(TimeZone.getTimeZone("UTC"));
        
        try {
        Date startDate = formatter.parse(request.getString("startDate"));
        Date endDate = formatter.parse(request.getString("endDate"));
        
        System.out.println(startDate.toString());
        System.out.println(endDate.toString());
        
        List<DayItinerary> itinerary = itinerarySessionBeanLocal.createItineraries(startDate, endDate, tripId);
        
        GenericEntity<List<DayItinerary>> result = new GenericEntity<List<DayItinerary>>(itinerary){};
        return Response.status(200).entity(result).build();
        
        
        } catch(ParseException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Invalid date format. Use yyyy-MM-dd")
                    .build();
            return Response.status(404).entity(exception).build();
        }
        
    }
    
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateItinerary(@PathParam("tripId") Long tripId, List<DayItinerary> itinerary) {
        try {
            itinerarySessionBeanLocal.updateItinerary(tripId, itinerary);
            return Response.status(204).build();
        }
        catch(Exception ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();    
        }
    }
    
    
    @POST
    @Path("/{itinerary_id}/places/place_id")
    @Produces(MediaType.APPLICATION_JSON)
    public Response createPlaceLineItem(@PathParam("itinerary_id") Long itineraryId, @PathParam("place_id") Long placeId) {
        try {
            PlaceLineItem placeLineItem = placeLineItemSessionBeanLocal.createPlaceLineItem(itineraryId, placeId);     
            return Response.status(200).entity(placeLineItem).build();
        }
        catch(DayItineraryNotFoundException | PlaceNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }
    
    @DELETE
    @Path("{itinerary_id}/placeLineItems/placeLineItem_id")
    @Produces(MediaType.APPLICATION_JSON)
    public Response removePlaceLineItem(@PathParam("itinerary_id") Long itineraryId, @PathParam("plaeLineItem_id") Long placeLineItemId) {
        try {
            placeLineItemSessionBeanLocal.removePlaceLineItem(itineraryId, placeLineItemId);
            return Response.status(204).build();
        }
        catch(DayItineraryNotFoundException|PlaceLineItemNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }
    

}
