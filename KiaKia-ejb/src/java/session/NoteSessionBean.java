/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Note;
import entity.Trip;
import error.NoteNotFoundException;
import error.TripNotFoundException;
import error.UnknownPersistenceException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;

/**
 *
 * @author vinessa
 */
@Stateless
public class NoteSessionBean implements NoteSessionBeanLocal {

    @EJB
    private TripSessionBeanLocal tripSessionBeanLocal;

    @PersistenceContext(unitName = "KiaKia-ejbPU")
    private EntityManager em;

    @Override
    public Long createNewNote(Note note, Long tripId) throws UnknownPersistenceException, TripNotFoundException {
        try {
            Trip trip = em.find(Trip.class, tripId);

            if (trip != null && note != null) {
                em.persist(note);
                trip.getNotes().add(note);
                em.flush();
                return note.getNoteId();
            } else {
                throw new TripNotFoundException("Trip not found in the database");
            }

        } catch (PersistenceException ex) {

            throw new UnknownPersistenceException(ex.getMessage());

        }
    }

    @Override
    public Note retrieveNoteByNoteId(Long noteId) throws NoteNotFoundException {
        Note note = em.find(Note.class, noteId);

        if (note != null) {
            return note;
        } else {
            throw new NoteNotFoundException("Note ID " + noteId + " does not exist!");
        }
    }

    @Override
    public void updateNote(Note u) throws NoteNotFoundException {
        try {
            Note oldNote = retrieveNoteByNoteId(u.getNoteId());
            oldNote.setContent(u.getContent());
            oldNote.setIsShared(u.isIsShared());
            oldNote.setTitle(u.getTitle());
        } catch (NoteNotFoundException ex) {
            throw new NoteNotFoundException(ex.getMessage());
        }
    }

    public void persist(Object object) {
        em.persist(object);
    }
    
    @Override
    public void removeNote(Long tripId, Long noteId) throws TripNotFoundException, NoteNotFoundException {
        Trip trip = em.find(Trip.class, tripId);
        Note note = em.find(Note.class, noteId);

        if (trip != null && note != null) {
            trip.getNotes().remove(note);
        } else {
            if (trip == null) {
                throw new TripNotFoundException("Trip not found in the database");
            }
            if (note == null) {
                throw new NoteNotFoundException("Note not found in the database");
            }
        }
    }
    
    @Override
    public List<Note> retrieveAllNotesInTrip(Long tripId) throws TripNotFoundException {
        Trip trip;
        try {
            trip = tripSessionBeanLocal.retrieveTripByTripId(tripId);
            System.out.println(trip.getTripId());
        } catch (TripNotFoundException ex) {
            System.out.println("Exception found");
            throw new TripNotFoundException(ex.getMessage());
        }
        System.out.println(trip.getNotes());
        return trip.getNotes();
        
    }

}
