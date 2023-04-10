/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Place;
import entity.Trip;
import error.CityOrCountryNotSelected;
import java.util.List;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.PlaceSessionBeanLocal;
import session.TripSessionBeanLocal;


/**
 * REST Web Service
 *
 * @author Natalienovaela
 */
@Path("explore")
public class ExploreResource {
    @EJB
    private TripSessionBeanLocal tripSessionBeanLocal;
    
    @EJB
    private PlaceSessionBeanLocal placeSessionBeanLocal;

    @GET
    @Path("/searchTripByCityOrCountry")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response searchTripByCityOrCountry(String city, String country) {
        try {
            List<Trip> trip = tripSessionBeanLocal.searchTripByCityOrCountry(city, country);
            return Response.status(200).entity(trip).type(MediaType.APPLICATION_JSON).build();
        }
        catch(CityOrCountryNotSelected ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @GET
    @Path("/searchPlaceByCityOrCountry")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response searchPlaceByCityOrCountry(String city, String country) {
        try {
            List<Place> place = placeSessionBeanLocal.searchPlaceByCityOrCountry(city, country);
            return Response.status(200).entity(place).type(MediaType.APPLICATION_JSON).build();
        }
        catch(CityOrCountryNotSelected ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    
}
