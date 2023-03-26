/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.User;
import error.InvalidLoginException;
import error.UserNotFoundException;
import javax.ejb.Local;

/**
 *
 * @author YC
 */
@Local
public interface UserSessionLocal {

    public void createUser(User u);

    public User retrieveUserByEmail(String email) throws UserNotFoundException;

    public User userLogin(String email, String password) throws InvalidLoginException, UserNotFoundException;

    public boolean usernameExists(String username);

    public boolean emailExists(String email);

    public User retrieveUserByUserId(Long userId) throws UserNotFoundException;

    public void updateUser(User u) throws UserNotFoundException;

    public void resetPassword(User u) throws UserNotFoundException;
    
}
