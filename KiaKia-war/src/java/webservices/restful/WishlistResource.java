/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Folder;
import error.FolderNotFoundException;
import error.WishlistNotFoundException;
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
import session.FolderSessionBeanLocal;
import session.WishlistSessionBeanLocal;

/**
 * REST Web Service
 *
 * @author Natalienovaela
 */
@Path("Wishlist")
public class WishlistResource {

    @EJB
    private WishlistSessionBeanLocal wishlistSessionBeanLocal;

    @EJB
    private FolderSessionBeanLocal folderSessionBeanLocal;

    @GET
    @Path("{wishlist_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveFolderWithCertainName(@PathParam("wishlist_id") Long wishlistId, String search) {
        List<Folder> folder = folderSessionBeanLocal.retrieveFolderWithCertainName(wishlistId, search);
        return Response.status(200).entity(folder).type(MediaType.APPLICATION_JSON).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createNewFolder(@PathParam("wishlist_id") Long wishlistId, Folder folder) {
        try {
            folderSessionBeanLocal.createNewFolder(wishlistId, folder);
            return Response.status(200).entity(folder).type(MediaType.APPLICATION_JSON).build();
            
        }
        catch(WishlistNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @GET
    @Path("{wishlist_id}/allFolder")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAllFolder(@PathParam("wishlist_id") Long wishlistId) {
        try {
            List<Folder> folder = folderSessionBeanLocal.retrieveAllFolder(wishlistId);
            return Response.status(200).entity(folder).type(MediaType.APPLICATION_JSON).build();
        }
        catch(WishlistNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @PUT
    @Path("/folders")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateFolderName(Folder folder) {
        try {
            folderSessionBeanLocal.updateFolderName(folder);
            return Response.status(204).build();
        }
        catch(FolderNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @DELETE
    @Path("/{wishlist_id}/folders/{folder_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteFolder(@PathParam("wishlist_id") Long wishlistId, @PathParam("folder_id") Long folderId) {
        try {
            folderSessionBeanLocal.deleteFolder(wishlistId, folderId);
            return Response.status(204).build();
        }
        catch(WishlistNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    

}
