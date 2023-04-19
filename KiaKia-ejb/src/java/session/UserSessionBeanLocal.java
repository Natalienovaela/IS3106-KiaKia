/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Place;
import entity.Trip;
import entity.User;
import error.InvalidLoginException;
import error.PlaceNotFoundException;
import error.ResetPasswordException;
import error.TripNotFoundException;
import error.UserNotFoundException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author YC
 */
@Local
public interface UserSessionBeanLocal {

    public void createUser(User u);

    public User retrieveUserByEmail(String email) throws UserNotFoundException;

    public User userLogin(String email, String password) throws InvalidLoginException, UserNotFoundException;

    public boolean usernameExists(String username) throws UserNotFoundException;

    public boolean emailExists(String email) throws UserNotFoundException;

    public User retrieveUserByUserId(Long userId) throws UserNotFoundException;
    
    public List<User> retrieveAllUsers(Long tripId);

    public void updateUser(User u) throws UserNotFoundException;

    public void resetPassword(User u) throws UserNotFoundException;

    public User retrieveUserByUsername(String username) throws UserNotFoundException;

    public User retrieveUserByPasswordToken(String token) throws UserNotFoundException;

    public void forgotPassword(String email) throws UserNotFoundException;

    public void resetPassword(String token) throws UserNotFoundException, ResetPasswordException;

    public void createUserTemporary(User u, Trip trip);

    public List<Place> getWishlistPlaces(Long userId) throws UserNotFoundException;

    public void linkUserWithWishlistPlace(Long userId, Long placeId) throws UserNotFoundException, PlaceNotFoundException;

    public void removeWishlistPlaceFromUser(Long userId, Long placeId) throws UserNotFoundException, PlaceNotFoundException;
    
}
