/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Folder;
import entity.Trip;
import entity.User;
import error.FolderNotFoundException;
import error.InvalidLoginException;
import error.TripNotFoundException;
import error.UserNotFoundException;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.List;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.persistence.NoResultException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
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
import session.FolderSessionBeanLocal;
import session.TripSessionBeanLocal;
import session.UserSessionBeanLocal;

/**
 * REST Web Service
 *
 * @author YC
 */
@Path("users")
public class UsersResource {

    @EJB
    private UserSessionBeanLocal userSessionBeanLocal;

    @EJB
    private TripSessionBeanLocal tripSessionBeanLocal;
    
    @EJB
    private FolderSessionBeanLocal folderSessionBeanLocal;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createUser(User u) {
        userSessionBeanLocal.createUser(u);
        return Response.status(200).entity(
                u
        ).type(MediaType.APPLICATION_JSON).build();
    }

    @GET
    @Path("/{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser(@PathParam("userId") Long uId) throws UserNotFoundException {
        try {
            User u = userSessionBeanLocal.retrieveUserByUserId(uId);
            return Response.status(200).entity(
                    u
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
    @Path("/query")
    @Produces(MediaType.APPLICATION_JSON)
    public Response emailExists(@QueryParam("email") String email) {
        try {
            boolean exists = userSessionBeanLocal.emailExists(email);
            Map<String, Boolean> responseMap = new HashMap<>();
            responseMap.put("exists", exists);
            return Response.status(200).entity(responseMap).type(MediaType.APPLICATION_JSON).build();

        } catch (UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();

            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(@FormParam("email") String email, @FormParam("password") String password) throws InvalidLoginException {
        try {
            User user = userSessionBeanLocal.userLogin(email, password);
            JsonObject response = Json.createObjectBuilder()
                    .add("userId", user.getUserId())
                    .add("name", user.getName())
                    .add("email", user.getEmail())
                    //                    .add("photo", user.getPhoto())
                    .build();
            return Response.status(200).entity(response)
                    .type(MediaType.APPLICATION_JSON).build();
        } catch (UserNotFoundException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", e.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }
    
    @PUT
    @Path("/{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response editUser(@PathParam("userId") Long userId, User u) {
        try {
            User user = userSessionBeanLocal.retrieveUserByUserId(userId);
            user.setName(u.getName());
            user.setEmail(u.getEmail());
            userSessionBeanLocal.updateUser(user);
            return Response.status(200).entity(user).build();
        } catch (UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();

            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    //to get all the personal trips
    @GET
    @Path("/{userId}/personalTrips")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllPersonalTrips(@PathParam("userId") Long userId) {
        try {
            List<Trip> trip = tripSessionBeanLocal.getAllPersonalTrips(userId);
            GenericEntity<List<Trip>> entity = new GenericEntity<List<Trip>>(trip) {
            };
            return Response.status(200).entity(entity).build();
        } catch (UserNotFoundException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", e.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }

    }

    //to get all the group trips
    @GET
    @Path("/{userId}/groupTrips")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllGroupTrips(@PathParam("userId") Long userId) {
        try {
            List<Trip> trip = tripSessionBeanLocal.getAllGroupTrips(userId);
            GenericEntity<List<Trip>> entity = new GenericEntity<List<Trip>>(trip) {
            };
            return Response.status(200).entity(entity).build();
        } catch (UserNotFoundException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", e.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }

    //to get all the trip
    @GET
    @Path("/{userId}/allTrips")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllTrips(@PathParam("userId") Long userId) {
        try {
            List<Trip> trip = tripSessionBeanLocal.getAllTrips(userId);
            GenericEntity<List<Trip>> entity = new GenericEntity<List<Trip>>(trip) {
            };
            return Response.status(200).entity(entity).build();
        } catch (UserNotFoundException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", e.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }
    
    //wishlist
    @GET
    @Path("{user_id}/{search}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveFolderWithCertainName(@PathParam("user_id") Long userId, @PathParam("search") String search) {
        try {
            List<Folder> folder = folderSessionBeanLocal.retrieveFolderWithCertainName(search, userId);
            return Response.status(200).entity(folder).type(MediaType.APPLICATION_JSON).build();
        } catch (UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @POST
    @Path("{user_id}/folders")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createNewFolder(@PathParam("user_id") Long userId) {
        Folder folder = new Folder();
        try {
            folderSessionBeanLocal.createNewFolder(userId, folder);
            return Response.status(200).entity(folder).type(MediaType.APPLICATION_JSON).build();
        } catch (UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @GET
    @Path("{user_id}/folders")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAllFolder(@PathParam("user_id") Long userId) {
        try {
            List<Folder> folder = folderSessionBeanLocal.retrieveAllFolder(userId);
            return Response.status(200).entity(folder).type(MediaType.APPLICATION_JSON).build();
        } catch (UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @PUT
    @Path("{user_id}/folders/{folder_id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateFolderName(Folder folder) {
        try {
            folderSessionBeanLocal.updateFolderName(folder);
            return Response.status(204).build();
        } catch (FolderNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @DELETE
    @Path("/{user_id}/folders/{folder_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteFolder(@PathParam("user_id") Long userId, @PathParam("folder_id") Long folderId) {
        try {
            folderSessionBeanLocal.deleteFolder(userId, folderId);
            return Response.status(204).build();
        } catch (UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @PUT
    @Path("/folders/{folder_id}/{trip_id}/add")
    @Produces(MediaType.APPLICATION_JSON)
    public Response addTripToFolder(@PathParam("folder_id") Long folderId, @PathParam("trip_id") Long tripId) {
        try {
            folderSessionBeanLocal.addTripToFolder(folderId, tripId);
            return Response.status(204).build();
        } catch (FolderNotFoundException | TripNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @PUT
    @Path("/folders/{folder_id}/{trip_id}/remove")
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeTripToFolder(@PathParam("folder_id") Long folderId, @PathParam("trip_id") Long tripId) {
        try {
            folderSessionBeanLocal.removeTripFromFolder(folderId, tripId);
            return Response.status(204).build();
        } catch (FolderNotFoundException | TripNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

}
