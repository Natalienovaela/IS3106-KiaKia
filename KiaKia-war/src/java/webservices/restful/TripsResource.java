/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Trip;
import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
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
//    
//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public List<Trip> getAllTrips() {
//        return tripSessionBeanLocal.getAllTrips();
//    }
//    
//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public List<Trip> getAllPersonalTrips() {
//        return tripSessionBeanLocal.getAllPersonalTrips();
//    }
//    
//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public List<Trip> getAllGroupTrips() {
//        return tripSessionBeanLocal.getAllGroupTrips();
//    }
//    
    
    
}
