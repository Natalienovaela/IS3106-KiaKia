/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Budget;
import entity.BudgetExpenseCategory;
import entity.CheckList;
import entity.DayItinerary;
import entity.Expense;
import entity.Folder;
import entity.Note;
import entity.PlaceLineItem;
import entity.Trip;
import entity.TripAssignment;
import entity.User;
import enumeration.UserRoleEnum;
import error.CheckListNotFoundException;
import error.CityOrCountryNotSelected;
import error.FolderNotFoundException;
import error.TripNotFoundException;
import error.UserNotFoundException;
import java.util.ArrayList;
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
    public void addNewTrip(Trip trip, Long userId) throws UserNotFoundException {
        try {
            User user = userSessionBeanLocal.retrieveUserByUserId(userId);
            if (trip != null) {
                em.persist(trip);
                em.flush();
            }
            TripAssignment tripAssignment = new TripAssignment(user, trip, UserRoleEnum.ADMIN);
            em.persist(tripAssignment);
        } catch (UserNotFoundException ex) {
            throw new UserNotFoundException(ex.getMessage());
        }
        
        String[] categoryNames = {"Accomodation", "Entertainment", "Food", "Transportation", "Others"};
        List<BudgetExpenseCategory> categories = new ArrayList<>();
        for (String name: categoryNames)
        {
            categories.add(new BudgetExpenseCategory(name));
        }
        
        trip.setCategories(categories);
    }

    @Override
    public Trip retrieveTripByTripId(Long tripId) throws TripNotFoundException {
        Trip trip = em.find(Trip.class, tripId);
        if (trip != null) {
            trip.getNotes().size();
            trip.getPolls().size();
            trip.getBucketList().size();
            trip.getCheckLists().size();
            trip.getDocuments().size();
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
            trip.setCheckLists(newTrip.getCheckLists());
            trip.setDescription(newTrip.getDescription());
            trip.setDocuments(newTrip.getDocuments());
            trip.setEndDate(newTrip.getEndDate());
            trip.setIsShared(newTrip.getIsShared());
            trip.setNotes(newTrip.getNotes());
            trip.setStartDate(newTrip.getStartDate());
        } else {
            throw new TripNotFoundException("Trip not found in the database");
        }
    }

    @Override
    public List<Trip> getAllTrips() {
        return em.createQuery("SELECT t FROM Trip t").getResultList();
    }

    @Override
    public Trip getTrip(Long tripId) throws TripNotFoundException {
        try {
            Trip trip = em.find(Trip.class, tripId);
            return trip;
        } catch (Exception ex) {
            throw new TripNotFoundException();
        }
    }

    @Override
    public void moveTrip(Long fromFolderId, Long toFolderId, Long tripId) throws FolderNotFoundException, TripNotFoundException {
        try {
            Folder fromFolder = em.find(Folder.class, fromFolderId);
            try {
                Folder toFolder = em.find(Folder.class, toFolderId);
                try {
                    Trip trip = em.find(Trip.class, tripId);
                    fromFolder.getTrips().remove(trip);
                    toFolder.getTrips().add(trip);

                } catch (Exception ex) {
                    throw new TripNotFoundException("Trip not found");
                }
            } catch (Exception ex) {
                throw new FolderNotFoundException("Folder does not exist");
            }
        } catch (Exception ex) {
            throw new FolderNotFoundException("Folder does not exist");
        }
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
        try {
            Trip trip = em.find(Trip.class, tripId);
            try {
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
            } catch (Exception ex) {
                throw new CheckListNotFoundException("Checklist not found in the database");
            }
        } catch (Exception ex) {
            throw new TripNotFoundException("Trip not found in the database");
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
    public void createAndInviteUserToTrip(Trip trip, List<String> userEmails, List<UserRoleEnum> userRoles) throws UserNotFoundException {
        try {
            em.persist(trip);
            em.flush();

            for (int i = 0; i < userEmails.size(); i++) {
                String email = userEmails.get(i);
                UserRoleEnum role = userRoles.get(i);
                inviteUserToTrip(trip.getTripId(), email, role);
            }
        } catch (UserNotFoundException ex) {
            throw new UserNotFoundException(ex.getMessage());
        }
    }

    @Override
    public void inviteUserToTrip(Long tripId, String email, UserRoleEnum role) throws UserNotFoundException {
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
            UserRoleEnum userRole = UserRoleEnum.valueOf(role);

            switch (userRole) {
                case ADMIN:
                    TripAssignment tripAssignment = new TripAssignment(user, trip, UserRoleEnum.ADMIN);
                    em.persist(tripAssignment);
                    break;
                case EDITOR:
                    /*trip.getEditors().add(user);
                    user.getTrips().add(trip);*/
                    break;
                case VIEWER:
                    /*trip.getViewers().add(user);
                    user.getTrips().add(trip);*/
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

    @Override
    public void removeTrip(Long folderId, Long tripId) throws FolderNotFoundException, TripNotFoundException {
        try {
            Folder folder = em.find(Folder.class, folderId);
            try {
                Trip trip = em.find(Trip.class, tripId);

                if (trip != null && folder != null) {
                    folder.getTrips().remove(trip);
                    em.remove(trip);
                } else {
                    if (trip == null) {
                        throw new TripNotFoundException("Trip not found in the database");
                    }
                    if (folder == null) {
                        throw new CheckListNotFoundException("Folder not found in the database");
                    }
                }
            } catch (Exception ex) {
                throw new TripNotFoundException("Trip not found in the database");
            }
        } catch (Exception ex) {
            throw new FolderNotFoundException("Folder not found in the database");
        }
    }
    
    @Override
    //poll and document cannot be shared
    public boolean shareWholeTrip(Long tripId) throws TripNotFoundException {
        try {
            Trip trip = retrieveTripByTripId(tripId);
            trip.setIsShared(Boolean.TRUE);
            for(Note n : trip.getNotes()) {
                n.setIsShared(true);
            }
            for(CheckList c : trip.getCheckLists()) {
                c.setIsShared(true);
            }
            for(Budget b : trip.getBudgets()) {
                b.setIsShared(true);
            }
            for(Expense e : trip.getExpenses()) {
                e.setIsShared(true);
            }
            for(DayItinerary d : trip.getItinerary()) {
                d.setIsShared(Boolean.TRUE);
            }
            for(PlaceLineItem pl : trip.getBucketList()) {
                pl.setIsShared(Boolean.TRUE);
            }
            return true;
        } catch (TripNotFoundException ex) {
            throw new TripNotFoundException(ex.getMessage());
        }
    }
    
    @Override
    //for testing
    public boolean unshareWholeTrip(Long tripId) throws TripNotFoundException {
        try {
            Trip trip = retrieveTripByTripId(tripId);
            trip.setIsShared(Boolean.FALSE);
            for(Note n : trip.getNotes()) {
                n.setIsShared(false);
            }
            for(CheckList c : trip.getCheckLists()) {
                c.setIsShared(false);
            }
            for(Budget b : trip.getBudgets()) {
                b.setIsShared(false);
            }
            for(Expense e : trip.getExpenses()) {
                e.setIsShared(false);
            }
            for(DayItinerary d : trip.getItinerary()) {
                d.setIsShared(Boolean.FALSE);
            }
            for(PlaceLineItem pl : trip.getBucketList()) {
                pl.setIsShared(Boolean.FALSE);
            }
            return true;
        } catch (TripNotFoundException ex) {
            throw new TripNotFoundException(ex.getMessage());
        }
    }

    @Override
    public void linkTripWithWishlistFolder(Long tripId, Long folderId) throws TripNotFoundException, FolderNotFoundException {
        try {
            Trip trip = em.find(Trip.class, tripId);
            try {
                Folder folder = em.find(Folder.class, folderId);
                folder.getTrips().add(trip);
            } catch (Exception ex) {
                throw new FolderNotFoundException("Folder not found in the database");
            }
        } catch (Exception ex) {
            throw new TripNotFoundException("Trip not found in the database");
        }
    }
    
    @Override
    public List<Trip> searchTripByCityOrCountry(String city, String country) throws CityOrCountryNotSelected {
         if(city != null) {
            return em.createQuery("SELECT t FROM Trip t WHERE t.city = :city").setParameter("city", city).getResultList();
        }
        else if(country != null) {
            return em.createQuery("SELECT t FROM Trip t WHERE t.country = :country").setParameter("country", country).getResultList();
        }
        else {
            throw new CityOrCountryNotSelected("City or Country is not specified");
        }
    }

}
