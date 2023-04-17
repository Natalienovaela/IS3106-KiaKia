/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datainit;

import entity.CheckList;
import entity.Note;
import entity.Place;
import entity.Poll;
import entity.Trip;
import entity.User;
import enumeration.CityEnum;
import enumeration.CountryEnum;
import error.DayItineraryNotFoundException;
import error.PlaceNotFoundException;
import error.TripNotFoundException;
import error.UnknownPersistenceException;
import error.UserNotFoundException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashMap;
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
import session.CheckListSessionBeanLocal;
import session.ItinerarySessionBeanLocal;
import session.NoteSessionBeanLocal;
import session.PlaceLineItemSessionBeanLocal;
import session.PollSessionBeanLocal;
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

    @EJB(name = "PollSessionBeanLocal")
    private PollSessionBeanLocal pollSessionBeanLocal;

    @EJB(name = "NoteSessionBeanLocal")
    private NoteSessionBeanLocal noteSessionBeanLocal;

    @PersistenceContext(unitName = "KiaKia-ejbPU")
    private EntityManager em;

    @EJB
    private UserSessionBeanLocal userSessionBeanLocal;

    @EJB
    private TripSessionBeanLocal tripSessionBeanLocal;

    @EJB
    private ItinerarySessionBeanLocal itinerarySessionBeanLocal;
    
    @EJB
    private PlaceLineItemSessionBeanLocal placeLineItemSessionBeanLocal;
    
    @EJB
    private CheckListSessionBeanLocal checkListSessionBeanLocal;

    @PostConstruct
    public void PostConstruct() {
        if (em.find(Trip.class, 1l) == null) {
            initialiseTrip();
        }
        if (em.find(Place.class, 1l) == null) {
            initialisePlaces();
        }
        if (em.find(User.class, 1l) == null) {
            initialiseUser();
        }
        if (pollSessionBeanLocal.retrieveAllPolls().isEmpty()) {
            initialisePoll();
        }
    }

    public void initialiseUser() {
        try {
        Trip trip = em.find(Trip.class, 1l);
        userSessionBeanLocal.createUserTemporary(new User("natasha", "natasha@gmail.com", "password", "Natasha Rafaela"), trip);
        userSessionBeanLocal.createUser(new User("vinessa@gmail.com", "Password123", "Vinessa"));
        userSessionBeanLocal.createUser(new User("michelle@gmail.com", "Password123", "Michelle"));
        userSessionBeanLocal.createUser(new User("varrene@gmail.com", "Password123", "Varrene"));
        Trip singapore = em.find(Trip.class, 2l);
        List<String> userEmails = new ArrayList<String>();
        List<String> userRoles = new ArrayList<String>();
        tripSessionBeanLocal.createAndInviteUsersToTrip(singapore, 2l, userEmails, userRoles);
        Trip newyork = em.find(Trip.class, 4l);
        tripSessionBeanLocal.createAndInviteUsersToTrip(newyork, 4l, userEmails, userRoles);
        userEmails.add("vinessa@gmail.com");
        userEmails.add("varrene@gmail.com");
        userRoles.add("ADMIN");
        userRoles.add("EDITOR");
        Trip japan = em.find(Trip.class, 3l);
        tripSessionBeanLocal.createAndInviteUsersToTrip(japan, 3l, userEmails, userRoles);
        
//            userSessionBeanLocal.createUser(new User("shinolim22@gmail.com", "Password123", "nat"));
//            List<String> userEmails = new ArrayList<String>();
//            List<String> userRoles = new ArrayList<String>();
//            userEmails.add("shinolim22@gmail.com");
//            userRoles.add("EDITOR");
//            tripSessionBeanLocal.createAndInviteUserToTrip(trip, 2l, userEmails, userRoles);
        } catch (UserNotFoundException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    public void initialisePoll() {
        try {
            Trip trip = em.find(Trip.class, 1l);
            User creator = em.find(User.class, 1l);
            HashMap<Long, String> options = new HashMap<>();
            options.put(1L, "Marina Bay Sands");
            options.put(2L, "Gardens By The Bay");
            options.put(3L, "Sentosa");
            Poll poll1 = new Poll("Where you wanna go the most in Singapore?", options, creator);
            pollSessionBeanLocal.createNewPoll(poll1, trip.getTripId());

            HashMap<Long, String> options2 = new HashMap<>();
            options2.put(1L, "Chicken Rice");
            options2.put(2L, "Laksa");
            options2.put(3L, "Prata");
            Poll poll2 = new Poll("What you wanna eat the most in Singapore?", options2, creator);
            pollSessionBeanLocal.createNewPoll(poll2, trip.getTripId());

            HashMap<Long, String> options3 = new HashMap<>();
            options3.put(1L, "A");
            options3.put(2L, "B");
            Poll poll3 = new Poll("Which letter you like?", options3, creator);
            pollSessionBeanLocal.createNewPoll(poll3, trip.getTripId());

            HashMap<Long, String> options4 = new HashMap<>();
            options4.put(3L, "C");
            options4.put(1L, "D");
            options4.put(2L, "E");
            options4.put(3L, "F");
            Poll poll4 = new Poll("Which letter you like?", options4, creator);
            pollSessionBeanLocal.createNewPoll(poll4, trip.getTripId());

        } catch (UnknownPersistenceException | TripNotFoundException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void initialiseTrip() {
        try {
            Trip trip = new Trip("First Trip", new GregorianCalendar(2024, Calendar.FEBRUARY, 11).getTime(), new GregorianCalendar(2024, Calendar.FEBRUARY, 15).getTime());
            em.persist(trip);
            em.flush();
            itinerarySessionBeanLocal.createItineraries(trip.getStartDate(), trip.getEndDate(), trip.getTripId());
            Note note1 = new Note("My 1st Note", "bla", false);
            noteSessionBeanLocal.createNewNote(note1, trip.getTripId());
            Note note2 = new Note("My 2nd Note", "blabla", false);
            noteSessionBeanLocal.createNewNote(note2, trip.getTripId());
            Note note3 = new Note("My 3rd Note", "bla", false);
            noteSessionBeanLocal.createNewNote(note3, trip.getTripId());
//            Note note4 = new Note("My 4th Note", "blabla", false);
//            noteSessionBeanLocal.createNewNote(note4, trip.getTripId());
//            Note note5 = new Note("My 5th Note", "bla", false);
//            noteSessionBeanLocal.createNewNote(note5, trip.getTripId());
//            Note note6 = new Note("My 6th Note", "blabla", false);
//            noteSessionBeanLocal.createNewNote(note6, trip.getTripId());
//            Note note7 = new Note("My 7th Note", "bla", false);
//            noteSessionBeanLocal.createNewNote(note7, trip.getTripId());
//            Note note8 = new Note("My 8th Note", "blabla", false);
//            noteSessionBeanLocal.createNewNote(note8, trip.getTripId());
//            Note note9 = new Note("My 9th Note", "bla", false);
//            noteSessionBeanLocal.createNewNote(note9, trip.getTripId());

            Trip singapore = new Trip("Singapore", new GregorianCalendar(2022, Calendar.JANUARY, 15).getTime(), new GregorianCalendar(2022, Calendar.JANUARY, 18).getTime());
            em.persist(singapore);
            em.flush();
            itinerarySessionBeanLocal.createItineraries(singapore.getStartDate(), singapore.getEndDate(), singapore.getTripId());
            Note singaporeNote = new Note("Description", "An amazing trip to the most expensive city in Asia. Feel free to download this itinerary if you wish to explore the top tourist attractions in Singapore!", false);
            noteSessionBeanLocal.createNewNote(singaporeNote, singapore.getTripId());
            placeLineItemSessionBeanLocal.createPlaceLineItem(6l, 1l);
            placeLineItemSessionBeanLocal.createPlaceLineItem(7l, 2l);
            placeLineItemSessionBeanLocal.createPlaceLineItem(8l, 3l);
            placeLineItemSessionBeanLocal.createPlaceLineItem(9l, 4l);
            List<String> items = new ArrayList<String>();
            items.add("Passport");
            items.add("Umbrella");
            CheckList checklistSg1 = new CheckList("Packing List", items);
            checkListSessionBeanLocal.createNewCheckList(2l, checklistSg1);
            
            Trip japan = new Trip("Japan", new GregorianCalendar(2023, Calendar.MAY, 1).getTime(), new GregorianCalendar(2023, Calendar.MAY, 20).getTime());
            em.persist(japan);
            em.flush();
            itinerarySessionBeanLocal.createItineraries(japan.getStartDate(), japan.getEndDate(), japan.getTripId());
            Note japanNote = new Note("Description", "Our graduation trip to Japan!", false);
            noteSessionBeanLocal.createNewNote(japanNote, japan.getTripId());
            
            Trip newyork = new Trip("New York", new GregorianCalendar(2021, Calendar.DECEMBER, 5).getTime(), new GregorianCalendar(2021, Calendar.DECEMBER, 27).getTime());
            em.persist(newyork);
            em.flush();
            itinerarySessionBeanLocal.createItineraries(newyork.getStartDate(), newyork.getEndDate(), newyork.getTripId());
            Note newyorkNote = new Note("Description", "Mesmerising busy city, New York", false);
            noteSessionBeanLocal.createNewNote(newyorkNote, newyork.getTripId());

        } catch (UnknownPersistenceException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        } catch (TripNotFoundException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        } catch (PlaceNotFoundException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        } catch (DayItineraryNotFoundException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void initialisePlaces() {
        Place marinaBay = new Place("Marina Bay Sands", "10 Bayfront Ave, Singapore 018956", "This iconic integrated resort boasts luxury accommodations, upscale shopping and an infinity pool with unparalleled views of the city.", CountryEnum.SINGAPORE, CityEnum.SINGAPORE);
        em.persist(marinaBay);
        em.flush();
        
        Place botanic = new Place("Singapore Botanic Gardens", "1 Cluny Road, Singapore 259569", "Situated just five minutes away from bustling Orchard Road, the Singapore Botanic Gardens is a lush sanctuary in the heart of the city.", CountryEnum.SINGAPORE, CityEnum.SINGAPORE);
        em.persist(botanic);
        em.flush();
        
        Place merlion = new Place("Merlion Park", "1 Fullerton Rd, Singapore 049213", "Meet the local legend and globally-recognised icon with a visit to Merlion Park.", CountryEnum.SINGAPORE, CityEnum.SINGAPORE);
        em.persist(merlion);
        em.flush();
        
        Place gardenBay = new Place("Gardens by the Bay", "18 Marina Gardens Dr", "Beauty abounds in the Gardens. Beyond the flora and fauna that you’ll find here, admire the Gardens’ iconic structures – architectural marvels that reimagine nature with artistic finesse.", CountryEnum.SINGAPORE, CityEnum.SINGAPORE);
        em.persist(gardenBay);
        em.flush();
    }

}
