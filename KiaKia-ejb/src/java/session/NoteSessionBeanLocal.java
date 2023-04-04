/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Note;
import error.NoteNotFoundException;
import error.TripNotFoundException;
import error.UnknownPersistenceException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author vinessa
 */
@Local
public interface NoteSessionBeanLocal {

    public void updateNote(Note u) throws NoteNotFoundException;

    public Note retrieveNoteByNoteId(Long noteId) throws NoteNotFoundException;

    public Long createNewNote(Note note, Long tripId) throws UnknownPersistenceException, TripNotFoundException;

    public void removeNote(Long tripId, Long noteId) throws TripNotFoundException, NoteNotFoundException;

    public List<Note> retrieveAllNotesInTrip(Long tripId) throws TripNotFoundException;
    
}
