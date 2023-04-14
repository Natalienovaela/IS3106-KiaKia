/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datainit;

import entity.Note;
import entity.Trip;
import entity.User;
import error.TripNotFoundException;
import error.UnknownPersistenceException;
import error.UserNotFoundException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.LocalBean;
import javax.ejb.Startup;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import session.NoteSessionBeanLocal;
import session.TripSessionBeanLocal;
import session.UserSessionBeanLocal;

/**
 *
 * @author Natalienovaela
 */
@Singleton
@LocalBean
@Startup
public class DataInitSessionBean {

    @EJB(name = "NoteSessionBeanLocal")
    private NoteSessionBeanLocal noteSessionBeanLocal;

    @PersistenceContext(unitName = "KiaKia-ejbPU")
    private EntityManager em;
    
    @EJB
    private UserSessionBeanLocal userSessionBeanLocal;
    
    @EJB
    private TripSessionBeanLocal tripSessionBeanLocal;

    @PostConstruct
    public void PostConstruct() { 
        if(em.find(Trip.class, 1l) == null) {
            initialiseTrip();
        }
        if (em.find(User.class, 1l) == null) {
            initialiseUser();
        }
        initialiseInvitation();
    }
    
    public void initialiseInvitation() {
//        try {
//            Trip trip = em.find(Trip.class, 1l);
//            User user = em.find(User.class, 1l);
//            
//            List<String> userEmails = new ArrayList<String>();
//            userEmails.add("nat@gmail.com");
//            List<String> userRoles = new ArrayList<String>();
//            userRoles.add("EDITOR");
//            
//            tripSessionBeanLocal.createAndInviteUsersToTrip(trip, user.getUserId(), userEmails, userRoles);
//        } catch (UserNotFoundException ex) {
//            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
//        }
        
    }
    
    public void initialiseUser() {
        Trip trip = em.find(Trip.class, 1l);
        userSessionBeanLocal.createUserTemporary(new User("natasha", "natasha@gmail.com", "password", "Natasha Rafaela"), trip);
        userSessionBeanLocal.createUser(new User("nat@gmail.com", "Password123", "nat"));
    }
    
    public void initialiseTrip() {
        try {
            Trip trip = new Trip("First Trip", new GregorianCalendar(2024, Calendar.FEBRUARY, 11).getTime(), new GregorianCalendar(2024, Calendar.FEBRUARY, 15).getTime());
            em.persist(trip);
            em.flush();
            Note note1 = new Note("My 1st Note", "bla", false);
            noteSessionBeanLocal.createNewNote(note1, trip.getTripId());
            Note note2 = new Note("My 2nd Note", "blabla", false);
            noteSessionBeanLocal.createNewNote(note2, trip.getTripId());
            Note note3 = new Note("My 3rd Note", "bla", false);
            noteSessionBeanLocal.createNewNote(note3, trip.getTripId());
            Note note4 = new Note("My 4th Note", "blabla", false);
            noteSessionBeanLocal.createNewNote(note4, trip.getTripId());
            Note note5 = new Note("My 5th Note", "bla", false);
            noteSessionBeanLocal.createNewNote(note5, trip.getTripId());
            Note note6 = new Note("My 6th Note", "blabla", false);
            noteSessionBeanLocal.createNewNote(note6, trip.getTripId());
            Note note7 = new Note("My 7th Note", "bla", false);
            noteSessionBeanLocal.createNewNote(note7, trip.getTripId());
            Note note8 = new Note("My 8th Note", "blabla", false);
            noteSessionBeanLocal.createNewNote(note8, trip.getTripId());
            Note note9 = new Note("My 9th Note", "bla", false);
            noteSessionBeanLocal.createNewNote(note9, trip.getTripId());
            

            Trip trip2 = new Trip("Second Trip", new GregorianCalendar(2024, Calendar.JUNE, 15).getTime(), new GregorianCalendar(2024, Calendar.JUNE, 28).getTime());
            em.persist(trip2);
            em.flush();
            Note note10 = new Note("My 10 Note", "blablabla", false);
            noteSessionBeanLocal.createNewNote(note10, trip2.getTripId());

        } catch (UnknownPersistenceException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        } catch (TripNotFoundException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
