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
import enumeration.UserRoleEnum;
import error.CheckListNotFoundException;
import error.CityOrCountryNotSelected;
import error.FolderNotFoundException;
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
    public void addNewTrip(Trip trip, Long userId) throws UserNotFoundException;
    
    public void removeCheckList(Long tripId, Long checkListId) throws TripNotFoundException, CheckListNotFoundException;
    
//    public void removeNote(Long tripId, Long noteId) throws TripNotFoundException, NoteNotFoundException;
    
//    public void removePoll(Long tripId, Long pollId) throws TripNotFoundException, PollNotFoundException;
    
    public void updateTrip(Trip newTrip) throws TripNotFoundException;
    
    public void addCheckList(Long tripId, CheckList checkList) throws TripNotFoundException;

//    public void addNotes(Long tripId, Note note) throws TripNotFoundException;
//
//    public void addPolls(Long tripId, Poll poll) throws TripNotFoundException;

    public List<Trip> getAllTrips(Long userId) throws UserNotFoundException;

    public List<Trip> getAllPersonalTrips(Long userId) throws UserNotFoundException ;

    public List<Trip> getAllGroupTrips(Long userId) throws UserNotFoundException ;

    public void acceptTripInvite(String token, String role) throws TripNotFoundException, UserNotFoundException;

    public Trip retrieveTripByInviteToken(String token) throws TripNotFoundException;

    public void inviteUserToTrip(Long tripId, String email, UserRoleEnum role) throws UserNotFoundException;

    public void createAndInviteUserToTrip(Trip trip, List<String> userEmails, List<UserRoleEnum> userRoles) throws UserNotFoundException;

    public Trip getTrip(Long tripId) throws TripNotFoundException;

    public Trip retrieveTripByTripId(Long tripId) throws TripNotFoundException;

    public void removeTrip(Long folderId, Long tripId) throws FolderNotFoundException, TripNotFoundException;

    public void moveTrip(Long fromFolderId, Long toFolderId, Long tripId) throws FolderNotFoundException, TripNotFoundException;

    public boolean shareWholeTrip(Long tripId) throws TripNotFoundException;

    public boolean unshareWholeTrip(Long tripId) throws TripNotFoundException;
    public List<Trip> searchTripByCityOrCountry(String city, String country) throws CityOrCountryNotSelected;

    public void linkTripWithWishlistFolder(Long tripId, Long folderId) throws TripNotFoundException, FolderNotFoundException;

    public UserRoleEnum getRole(Long tripId, Long userId) throws UserNotFoundException, TripNotFoundException;
    
}