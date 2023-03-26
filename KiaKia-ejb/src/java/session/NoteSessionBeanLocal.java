/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Note;
import error.NoteNotFoundException;
import error.UnknownPersistenceException;
import javax.ejb.Local;

/**
 *
 * @author vinessa
 */
@Local
public interface NoteSessionBeanLocal {

    public void updateNote(Note u) throws NoteNotFoundException;

    public Note retrieveNoteByNoteId(Long noteId) throws NoteNotFoundException;

    public Long createNewNote(Note note) throws UnknownPersistenceException;
    
}
