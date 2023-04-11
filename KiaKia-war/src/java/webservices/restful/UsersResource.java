/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.User;
import error.InvalidLoginException;
import error.UserNotFoundException;
import java.math.BigDecimal;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.persistence.NoResultException;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
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

}
