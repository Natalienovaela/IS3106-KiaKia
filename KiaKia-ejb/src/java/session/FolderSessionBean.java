/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Folder;
import entity.Trip;
import entity.User;
import error.FolderNotFoundException;
import error.TripNotFoundException;
import error.UserNotFoundException;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author Natalienovaela
 */
@Stateless
public class FolderSessionBean implements FolderSessionBeanLocal {

    @PersistenceContext(unitName = "KiaKia-ejbPU")
    private EntityManager em;

    @Override
    public List<Folder> retrieveAllFolder(Long userId) throws UserNotFoundException {
        try {
            User user = em.find(User.class, userId);
            if (user != null) {
                return user.getWishlistFolders();
            } else {
                throw new UserNotFoundException("User does not exist");
            }
        } catch (Exception ex) {
            throw new UserNotFoundException("User does not exist");
        }
    }

    @Override
    public void updateFolderName(Folder folder) throws FolderNotFoundException {
        try {
            Folder oldFolder = em.find(Folder.class, folder.getFolderId());

            if (oldFolder != null) {
                oldFolder.setName(folder.getName());

            } else {
                throw new FolderNotFoundException("Folder not found in the database");
            }
        } catch (Exception ex) {
            throw new FolderNotFoundException("Folder does not exist");
        }
    }

    @Override
    public void deleteFolder(Long userId, Long folderId) throws UserNotFoundException {
        try {
            User user= em.find(User.class, userId);

            try {
                Folder folder = em.find(Folder.class, folderId);
                user.getWishlistFolders().remove(folder);
                em.remove(folder);
            } catch (Exception ex) {

            }
        } catch (Exception ex) {
            throw new UserNotFoundException("User does not exist");
        }
    }

    @Override
    public List<Folder> retrieveFolderWithCertainName(String search, Long userId) throws UserNotFoundException {
        try {
            User user = em.find(User.class, userId);
            List<Folder> folders = em.createQuery("SELECT u.wishlistFolders FROM User u WHERE u.wishlistFolders.name LIKE CONCAT('%',:search ,'%')").setParameter("search", search).getResultList();
            for (Folder folder : folders) {
                folder.getTrips().size();
            }

            return folders;
        } catch (Exception ex) {
            throw new UserNotFoundException("User not found");
        }

    }

    @Override
    public Folder createNewFolder(Long userId, Folder folder) throws UserNotFoundException {
        try {
            User user = em.find(User.class, userId);
            em.persist(folder);
            user.getWishlistFolders().add(folder);
            return folder;
        } catch (Exception ex) {
            throw new UserNotFoundException("User does not exist");
        }
    }

    @Override
    public void addTripToFolder(Long folderId, Long tripId) throws FolderNotFoundException, TripNotFoundException {
        try {
            Folder folder = em.find(Folder.class, folderId);
            try {
                Trip trip = em.find(Trip.class, tripId);
                folder.getTrips().add(trip);
            } catch (Exception ex) {
                throw new TripNotFoundException("Trip not found");
            }
        } catch (Exception ex) {
            throw new FolderNotFoundException("Folder not found");
        }
    }

    @Override
    public void removeTripFromFolder(Long folderId, Long tripId) throws FolderNotFoundException, TripNotFoundException {
        try {
            Folder folder = em.find(Folder.class, folderId);
            try {
                Trip trip = em.find(Trip.class, tripId);
                folder.getTrips().remove(trip);
                em.remove(trip);
            } catch (Exception ex) {
                throw new TripNotFoundException("Trip not found");
            }
        } catch (Exception ex) {
            throw new FolderNotFoundException("Folder not found");
        }
    }

}
