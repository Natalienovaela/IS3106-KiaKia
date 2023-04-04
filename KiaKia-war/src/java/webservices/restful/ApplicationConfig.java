/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import java.util.Set;
import javafx.application.Application;
import javafx.stage.Stage;

/**
 *
 * @author Natalienovaela
 */
@javax.ws.rs.ApplicationPath("webresources")
public class ApplicationConfig extends Application {

    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }


    @Override
    public void start(Stage stage) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(webservices.restful.CORSFilter.class);
        resources.add(webservices.restful.ItineraryResource.class);
        resources.add(webservices.restful.KiaKiaResource.class);
        resources.add(webservices.restful.TripsResource.class);
        resources.add(webservices.restful.UsersResource.class);
    }
    
}
