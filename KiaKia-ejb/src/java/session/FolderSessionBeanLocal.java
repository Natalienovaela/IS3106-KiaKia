/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Folder;
import error.FolderNotFoundException;
import error.TripNotFoundException;
import error.WishlistNotFoundException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author Natalienovaela
 */
@Local
public interface FolderSessionBeanLocal {

    public List<Folder> retrieveAllFolder(Long wishlistId) throws WishlistNotFoundException;

    public List<Folder> retrieveFolderWithCertainName(Long wishlistId, String search);

    public void deleteFolder(Long wishlistId, Long folderId) throws WishlistNotFoundException;

    public Folder createNewFolder(Long wishlistId, Folder folder) throws WishlistNotFoundException;

    public void updateFolderName(Folder folder) throws FolderNotFoundException;

    public void addTripToFolder(Long folderId, Long tripId) throws FolderNotFoundException, TripNotFoundException;

    public void removeTripFromFolder(Long folderId, Long tripId) throws FolderNotFoundException, TripNotFoundException;
    
}
