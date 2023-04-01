/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datainit;

import entity.Trip;
import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.ejb.LocalBean;
import javax.ejb.Startup;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author Natalienovaela
 */
@Singleton
@LocalBean
@Startup
public class DataInitSessionBean {

    @PersistenceContext(unitName = "KiaKia-ejbPU")
    private EntityManager em;

    @PostConstruct
    public void PostConstruct() {
        if(em.find(Trip.class, 1l) == null) {
            initialiseTrip();
        }
    }
    
    public void initialiseTrip() {
        /*Trip trip = new Trip("")*/
    }
    
}
