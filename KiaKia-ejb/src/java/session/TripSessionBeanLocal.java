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
import error.CheckListNotFoundException;
import error.NoteNotFoundException;
import error.PollNotFoundException;
import error.TripNotFoundException;
import javax.ejb.Local;

/**
 *
 * @author Natalienovaela
 */
@Local
public interface TripSessionBeanLocal {
    public void addNewTrip(Trip trip);
    
    public void removeCheckList(Long tripId, Long checkListId) throws TripNotFoundException, CheckListNotFoundException;
    
    public void removeNote(Long tripId, Long noteId) throws TripNotFoundException, NoteNotFoundException;
    
    public void removePoll(Long tripId, Long pollId) throws TripNotFoundException, PollNotFoundException;
    
    public void updateTrip(Trip newTrip) throws TripNotFoundException;
    
    public void addCheckList(Long tripId, CheckList checkList) throws TripNotFoundException;

    public void addNotes(Long tripId, Note note) throws TripNotFoundException;

    public void addPolls(Long tripId, Poll poll) throws TripNotFoundException;
    
    

}
