/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Folder;
import error.FolderNotFoundException;
import error.TripNotFoundException;
import error.UserNotFoundException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author Natalienovaela
 */
@Local
public interface FolderSessionBeanLocal {

    public List<Folder> retrieveAllFolder(Long userId) throws UserNotFoundException;

    public List<Folder> retrieveFolderWithCertainName(String search, Long userId) throws UserNotFoundException;

    public void deleteFolder(Long userId, Long folderId) throws UserNotFoundException;

    public Folder createNewFolder(Long userId, Folder folder, String folderName) throws UserNotFoundException;

    public void updateFolderName(Folder folder) throws FolderNotFoundException;

    public void addTripToFolder(Long folderId, Long tripId) throws FolderNotFoundException, TripNotFoundException;

    public void removeTripFromFolder(Long folderId, Long tripId) throws FolderNotFoundException, TripNotFoundException;
    
}
