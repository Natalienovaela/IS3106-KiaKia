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
import enumeration.UserRole;
import error.CheckListNotFoundException;
import error.NoteNotFoundException;
import error.PollNotFoundException;
import error.TripNotFoundException;
import error.UserNotFoundException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author Natalienovaela
 */
@Local
public interface TripSessionBeanLocal {
    public void addNewTrip(Trip trip);
    
    public void removeCheckList(Long tripId, Long checkListId) throws TripNotFoundException, CheckListNotFoundException;
    
//    public void removeNote(Long tripId, Long noteId) throws TripNotFoundException, NoteNotFoundException;
    
//    public void removePoll(Long tripId, Long pollId) throws TripNotFoundException, PollNotFoundException;
    
    public void updateTrip(Trip newTrip) throws TripNotFoundException;
    
    public void addCheckList(Long tripId, CheckList checkList) throws TripNotFoundException;

//    public void addNotes(Long tripId, Note note) throws TripNotFoundException;
//
//    public void addPolls(Long tripId, Poll poll) throws TripNotFoundException;

    public List<Trip> getAllTrips();

    public List<Trip> getAllPersonalTrips();

    public List<Trip> getAllGroupTrips();

    public void acceptTripInvite(String token, String role) throws TripNotFoundException, UserNotFoundException;

    public Trip retrieveTripByInviteToken(String token) throws TripNotFoundException;

    public void inviteUserToTrip(Long tripId, String email, UserRole role) throws UserNotFoundException;

    public void createAndInviteUserToTrip(Trip trip, List<String> userEmails, List<UserRole> userRoles) throws UserNotFoundException;

    public Trip getTrip(Long tripId) throws TripNotFoundException;
    
}
