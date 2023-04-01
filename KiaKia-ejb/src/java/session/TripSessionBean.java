/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.CheckList;
import entity.Note;
import entity.Poll;
import entity.Trip;
import entity.User;
import error.CheckListNotFoundException;
import error.NoteNotFoundException;
import error.PollNotFoundException;
import error.TripNotFoundException;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author Natalienovaela
 */
@Stateless
public class TripSessionBean implements TripSessionBeanLocal {

    @PersistenceContext(unitName = "KiaKia-ejbPU")
    private EntityManager em;
    
    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    
    @Override
    public void addNewTrip(Trip trip) {
        if(trip != null) {
            em.persist(trip);
        } 

    }
    
    @Override
    public void updateTrip(Trip newTrip) throws TripNotFoundException {
        Trip trip = em.find(Trip.class, newTrip);
        
        if(trip != null) {
            trip.setAdmins(newTrip.getAdmins());
            trip.setCheckLists(newTrip.getCheckLists());
            trip.setDescription(newTrip.getDescription());
            trip.setDocuments(newTrip.getDocuments());
            trip.setEditors(newTrip.getEditors());
            trip.setEndDate(newTrip.getEndDate());
            trip.setIsShared(newTrip.getIsShared());
            trip.setNotes(newTrip.getNotes());
            trip.setStartDate(newTrip.getStartDate());
            trip.setViewers(newTrip.getViewers());
        } else {
            throw new TripNotFoundException("Trip not found in the database");
        }
    }
    
    @Override
    public List<Trip> getAllTrips() {
        return em.createQuery("SELECT t FROM Trip t").getResultList();
    }
    
    @Override
    public List<Trip> getAllPersonalTrips() {
        return em.createQuery("SELECT t FROM Trip t WHERE t.editors IS EMPTY AND t.viewers IS EMPTY").getResultList();
    }
    
    @Override
    public List<Trip> getAllGroupTrips() {
        return em.createQuery("SELECT t FROM Trip t WHERE t.editors IS NOT EMPTY OR t.viewers IS NOT EMPTY").getResultList();
    }
    
    
    
    @Override
    public void removeCheckList(Long tripId, Long checkListId) throws TripNotFoundException, CheckListNotFoundException {
        Trip trip = em.find(Trip.class, tripId);
        CheckList checkList = em.find(CheckList.class, checkListId);
        
        if(trip != null && checkList != null) {
            trip.getCheckLists().remove(checkList);
        } else {
            if(trip == null) {
                throw new TripNotFoundException("Trip not found in the database");
            }
            if(checkList == null) {
                throw new CheckListNotFoundException("Checklist not found in the database");
            }
        }
    }
    
    @Override
    public void removeNote(Long tripId, Long noteId) throws TripNotFoundException, NoteNotFoundException {
        Trip trip = em.find(Trip.class, tripId);
        Note note = em.find(Note.class, noteId);
        
        if(trip != null && note != null) {
            trip.getNotes().remove(note);
        } else {
            if(trip == null) {
                throw new TripNotFoundException("Trip not found in the database");
            }
            if(note == null) {
                throw new NoteNotFoundException("Note not found in the database");
            }
        }
    }
    
    @Override
    public void removePoll(Long tripId, Long pollId) throws TripNotFoundException, PollNotFoundException {
        Trip trip = em.find(Trip.class, tripId);
        Poll poll = em.find(Poll.class, pollId);
        
        if(trip != null && poll != null) {
            trip.getPolls().remove(poll);
        } else {
            if(trip == null) {
                throw new TripNotFoundException("Trip not found in the database");
            }
            if(poll == null) {
                throw new PollNotFoundException("Poll not found in the database");
            }
        }
    }
    
    @Override
    public void addCheckList(Long tripId, CheckList checkList) throws TripNotFoundException {
        Trip trip = em.find(Trip.class, tripId);
        
        if(checkList != null) {
            em.persist(checkList);
        }
        
        if(trip != null && checkList != null) {
            trip.getCheckLists().add(checkList);
        } else {
                throw new TripNotFoundException("Trip not found in the database");

        }
    }
    
    @Override
    public void addNotes(Long tripId, Note note) throws TripNotFoundException {
        Trip trip = em.find(Trip.class, tripId);
        
        if(note!= null) {
            em.persist(note);
        }
        
        if(trip != null && note != null) {
            trip.getNotes().add(note);
        } else {
                throw new TripNotFoundException("Trip not found in the database");

        }
    }
    
    @Override
    public void addPolls(Long tripId, Poll poll) throws TripNotFoundException {
        Trip trip = em.find(Trip.class, tripId);
        
        if(poll!= null) {
            em.persist(poll);
        }
        
        if(trip != null && poll != null) {
            trip.getPolls().add(poll);
        } else {
                throw new TripNotFoundException("Trip not found in the database");

        }
    }
    
}
