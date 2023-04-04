/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datainit;

import entity.Note;
import entity.Trip;
import error.TripNotFoundException;
import error.UnknownPersistenceException;
import java.util.Calendar;
import java.util.GregorianCalendar;
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

    @PostConstruct
    public void PostConstruct() {
        if (em.find(Trip.class, 1l) == null) {
            initialiseTrip();
        }
    }

    public void initialiseTrip() {
        try {
            Trip trip = new Trip("First Trip", new GregorianCalendar(2024, Calendar.FEBRUARY, 11).getTime(), new GregorianCalendar(2024, Calendar.FEBRUARY, 15).getTime());
            em.persist(trip);
            em.flush();
            Note note1 = new Note("My First Note", "bla", false);
            noteSessionBeanLocal.createNewNote(note1, trip.getTripId());
            Note note2 = new Note("My Second Note", "blabla", false);
            noteSessionBeanLocal.createNewNote(note2, trip.getTripId());

            Trip trip2 = new Trip("Second Trip", new GregorianCalendar(2024, Calendar.JUNE, 15).getTime(), new GregorianCalendar(2024, Calendar.JUNE, 28).getTime());
            em.persist(trip2);
            Note note3 = new Note("My Third Note", "blablabla", false);
            noteSessionBeanLocal.createNewNote(note3, trip2.getTripId());

        } catch (UnknownPersistenceException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        } catch (TripNotFoundException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
