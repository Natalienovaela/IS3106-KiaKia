/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Place;
import error.PlaceNotFoundException;
import java.util.List;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.persistence.NoResultException;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.PlaceSessionBeanLocal;

/**
 *
 * @author YC
 */
@Path("places")
public class PlacesResource {
    
    @EJB
    private PlaceSessionBeanLocal placeSessionBeanLocal;
    
    @GET
    @Path("/{placeId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPlace(@PathParam("placeId") Long pId) throws PlaceNotFoundException {
        try {
            Place p = placeSessionBeanLocal.getPlace(pId);
            return Response.status(200).entity(
                    p
            ).type(MediaType.APPLICATION_JSON).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();

            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllPlaces() {
        List<Place> places = placeSessionBeanLocal.getAllPlaces();
        GenericEntity<List<Place>> entity = new GenericEntity<List<Place>>(places) {
        };
        return Response.status(200).entity(entity).build();
    }
}
