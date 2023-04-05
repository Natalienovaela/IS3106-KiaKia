/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datainit;

import entity.Trip;
import entity.User;
import java.util.Calendar;
import java.util.GregorianCalendar;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.LocalBean;
import javax.ejb.Startup;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import session.UserSessionBeanLocal;

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
    
    @EJB
    private UserSessionBeanLocal userSessionBeanLocal;

    @PostConstruct
    public void PostConstruct() {
        if (em.find(User.class, 1l) == null) {
            initialiseUser();
        }
        if(em.find(Trip.class, 1l) == null) {
            initialiseTrip();
        }
    }
    
    public void initialiseUser() {
        userSessionBeanLocal.createUser(new User("natasha", "natasha@gmail.com", "password", "Natasha Rafaela"));
    }
    
    public void initialiseTrip() {
        Trip trip = new Trip("First Trip", new GregorianCalendar(2024, Calendar.FEBRUARY, 11).getTime(), new GregorianCalendar(2024, Calendar.FEBRUARY, 15).getTime());
        em.persist(trip);
        
        Trip trip2 = new Trip("Second Trip", new GregorianCalendar(2024, Calendar.JUNE, 15).getTime(), new GregorianCalendar(2024, Calendar.JUNE, 28).getTime());
        em.persist(trip2);
    }
    
}
