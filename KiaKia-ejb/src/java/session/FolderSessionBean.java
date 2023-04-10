/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Folder;
import entity.Wishlist;
import error.FolderNotFoundException;
import error.WishlistNotFoundException;
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
    public List<Folder> retrieveAllFolder(Long wishlistId) throws WishlistNotFoundException {
        try {
            Wishlist wishlist = em.find(Wishlist.class, wishlistId);
            if (wishlist != null) {
                return wishlist.getFolders();
            } else {
                throw new WishlistNotFoundException("Wishlisst does not exist");
            }
        } catch (Exception ex) {
            throw new WishlistNotFoundException("Wishlist does not exist");
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
    public void deleteFolder(Long wishlistId, Long folderId) throws WishlistNotFoundException {
        try {
            Wishlist wishlist = em.find(Wishlist.class, wishlistId);
            
            try {
              Folder folder = em.find(Folder.class, folderId);
              wishlist.getFolders().remove(folder);
              em.remove(folder);
            }
            catch (Exception ex) {
                
            }
        }
        catch (Exception ex) {
            throw new WishlistNotFoundException("Wishlist does not exist");
        }
    }

    @Override
    public List<Folder> retrieveFolderWithCertainName(Long wishlistId, String search) {
        List<Folder> folders = em.createQuery("SELECT w.folders FROM Wishlist w WHERE w.folders.name LIKE CONCAT('%',:search ,'%')").setParameter("search", search).getResultList();
        for(Folder folder : folders) {
            folder.getTrips().size();
        }
        
        return folders;
    }
    
    @Override
    public Folder createNewFolder(Long wishlistId, Folder folder) throws WishlistNotFoundException {
        try {
            Wishlist wishlist = em.find(Wishlist.class, wishlistId);
            em.persist(folder);
            wishlist.getFolders().add(folder);
            return folder;
        }
        catch(Exception ex) {
            throw new WishlistNotFoundException("Wishlist does not exist");
        }
    }
    
}
