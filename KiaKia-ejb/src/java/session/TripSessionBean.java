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
import enumeration.UserRole;
import error.CheckListNotFoundException;
import error.NoteNotFoundException;
import error.PollNotFoundException;
import error.TripNotFoundException;
import error.UserNotFoundException;
import java.util.List;
import java.util.UUID;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.NonUniqueResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author Natalienovaela
 */
@Stateless
public class TripSessionBean implements TripSessionBeanLocal {

    @PersistenceContext(unitName = "KiaKia-ejbPU")
    private EntityManager em;

    @EJB
    private EmailSessionBeanLocal emailSessionBeanLocal;

    @EJB
    private UserSessionBeanLocal userSessionBeanLocal;

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    @Override
    public void addNewTrip(Trip trip) {
        if (trip != null) {
            em.persist(trip);
        }

    }
    
    @Override
    public Trip retrieveTripByTripId(Long tripId) throws TripNotFoundException {
        Trip trip = em.find(Trip.class, tripId);
        if (trip != null) {
            trip.getNotes().size();
            trip.getPolls().size();
            trip.getViewers().size();
            trip.getAdmins().size();
            trip.getBucketList().size();
            trip.getCheckLists().size();
            trip.getDocuments().size();
            trip.getEditors().size();
            trip.getWishlisted().size();
            return trip;
        } else {
            throw new TripNotFoundException("Trip not found in the database");
        }
    }

    @Override
    public void updateTrip(Trip newTrip) throws TripNotFoundException {
        Trip trip = em.find(Trip.class, newTrip);

        if (trip != null) {
            //trip.setCountry(newTrip.getCountry());
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

        if (trip != null && checkList != null) {
            trip.getCheckLists().remove(checkList);
        } else {
            if (trip == null) {
                throw new TripNotFoundException("Trip not found in the database");
            }
            if (checkList == null) {
                throw new CheckListNotFoundException("Checklist not found in the database");
            }
        }
    }

    @Override
    public void addCheckList(Long tripId, CheckList checkList) throws TripNotFoundException {
        Trip trip = em.find(Trip.class, tripId);

        if (checkList != null) {
            em.persist(checkList);
        }

        if (trip != null && checkList != null) {
            trip.getCheckLists().add(checkList);
        } else {
            throw new TripNotFoundException("Trip not found in the database");

        }
    }

//    @Override
//    public void addNotes(Long tripId, Note note) throws TripNotFoundException {
//        Trip trip = em.find(Trip.class, tripId);
//
//        if (note != null) {
//            em.persist(note);
//        }
//
//        if (trip != null && note != null) {
//            trip.getNotes().add(note);
//        } else {
//            throw new TripNotFoundException("Trip not found in the database");
//
//        }
//    }
//
//    @Override
//    public void addPolls(Long tripId, Poll poll) throws TripNotFoundException {
//        Trip trip = em.find(Trip.class, tripId);
//
//        if (poll != null) {
//            em.persist(poll);
//        }
//
//        if (trip != null && poll != null) {
//            trip.getPolls().add(poll);
//        } else {
//            throw new TripNotFoundException("Trip not found in the database");
//
//        }
//    }

    @Override
    public void createAndInviteUserToTrip(Trip trip, List<String> userEmails, List<UserRole> userRoles) throws UserNotFoundException {
        try {
            em.persist(trip);
            em.flush();
            
            for (int i = 0; i < userEmails.size(); i++) {
                String email = userEmails.get(i);
                UserRole role = userRoles.get(i);
                inviteUserToTrip(trip.getTripId(), email, role);
            }
        } catch (UserNotFoundException ex) {
            throw new UserNotFoundException(ex.getMessage());
        }
    }

    @Override
    public void inviteUserToTrip(Long tripId, String email, UserRole role) throws UserNotFoundException {
        try {
            Trip trip = em.find(Trip.class, tripId);
            User user = userSessionBeanLocal.retrieveUserByEmail(email);
            String token = user.getUsername() + ":" + UUID.randomUUID().toString();
            trip.setInviteToken(token);
            String userRole = role.toString();

            try {
                emailSessionBeanLocal.emailInvitationToUserAsync(user, trip, userRole, email);
            } catch (InterruptedException ex) {
                ex.printStackTrace();
            }
        } catch (UserNotFoundException ex) {
            throw new UserNotFoundException(ex.getMessage());
        }
    }

    @Override
    public Trip retrieveTripByInviteToken(String token) throws TripNotFoundException {
        Query query = em.createQuery("SELECT t FROM Trip t WHERE t.inviteToken = :inToken");
        query.setParameter("inToken", token);

        try {
            return (Trip) query.getSingleResult();
        } catch (NoResultException | NonUniqueResultException ex) {
            throw new TripNotFoundException("Invalid trip invite token!");
        }
    }

    @Override
    public void acceptTripInvite(String token, String role) throws TripNotFoundException, UserNotFoundException {
        try {
            Trip trip = retrieveTripByInviteToken(token);
            String[] parts = token.split(":");
            String username = parts[0];
            User user = userSessionBeanLocal.retrieveUserByUsername(username);
            UserRole userRole = UserRole.valueOf(role);

            switch (userRole) {
                case ADMIN:
                    trip.getAdmins().add(user);
                    user.getAdminTrips().add(trip);
                    break;
                case EDITOR:
                    trip.getEditors().add(user);
                    user.getEditorTrips().add(trip);
                    break;
                case VIEWER:
                    trip.getViewers().add(user);
                    user.getViewerTrips().add(trip);
                    break;
                default:
                    break;
            }
        } catch (TripNotFoundException ex) {
            throw new TripNotFoundException(ex.getMessage());
        } catch (UserNotFoundException ex) {
            throw new UserNotFoundException(ex.getMessage());
        }

    }

}
