/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Note;
import error.NoteNotFoundException;
import error.UnknownPersistenceException;
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

    @PersistenceContext(unitName = "KiaKia-ejbPU")
    private EntityManager em;

    @Override
    public Long createNewNote(Note note) throws UnknownPersistenceException {

        try {
            em.persist(note);
            em.flush(); //only need to flush bcs we are returning the id!
            return note.getNoteId();
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

}
