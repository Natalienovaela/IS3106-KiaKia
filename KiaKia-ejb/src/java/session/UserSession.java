/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.User;
import error.InvalidLoginException;
import error.UserNotFoundException;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.NonUniqueResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author YC
 */
@Stateless
public class UserSession implements UserSessionLocal {

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    @PersistenceContext
    private EntityManager em;

    @Override
    public void createUser(User u) {
        em.persist(u);
    }

    @Override
    public User retrieveUserByUserId(Long userId) throws UserNotFoundException {
        User user = em.find(User.class, userId);

        if (user != null) {
            return user;
        } else {
            throw new UserNotFoundException("User ID " + userId + " does not exist!");
        }
    }

    @Override
    public User retrieveUserByEmail(String email) throws UserNotFoundException {
        Query query = em.createQuery("SELECT u FROM User u WHERE u.email = :inEmail");
        query.setParameter("inEmail", email);

        try {
            return (User) query.getSingleResult();
        } catch (NoResultException | NonUniqueResultException ex) {
            throw new UserNotFoundException("User Email " + email + " does not exist!");
        }
    }

    @Override
    public boolean usernameExists(String username) {
        Query query = em.createQuery("SELECT u FROM User u WHERE LOWER(u.username) = :inUsername");
        query.setParameter("inUsername", username.toLowerCase());

        return query.getSingleResult() != null;
    }

    @Override
    public boolean emailExists(String email) {
        Query query = em.createQuery("SELECT u FROM User u WHERE LOWER(u.email) = :inEmail");
        query.setParameter("inEmail", email.toLowerCase());

        return query.getSingleResult() != null;
    }

    @Override
    public User userLogin(String email, String password) throws InvalidLoginException, UserNotFoundException {
        try {
            User user = retrieveUserByEmail(email);

            if (user.getPassword().equals(password)) {
                return user;
            } else {
                throw new InvalidLoginException("Email does not exist or invalid password!");
            }
        } catch (UserNotFoundException ex) {
            throw new UserNotFoundException(ex.getMessage());
        }
    }

    @Override
    public void updateUser(User u) throws UserNotFoundException {
        try {
            User oldUser = retrieveUserByUserId(u.getUserId());

            oldUser.setPhoto(u.getPhoto());
            oldUser.setName(u.getName());
            oldUser.setUsername(u.getUsername());
            oldUser.setEmail(u.getEmail());
            oldUser.setDob(u.getDob());
        } catch (UserNotFoundException ex) {
            throw new UserNotFoundException(ex.getMessage());
        }
    }
    
    @Override
    public void resetPassword(User u) throws UserNotFoundException {
        try {
            User oldUser = retrieveUserByUserId(u.getUserId());

            oldUser.setPassword(u.getPassword());
        } catch (UserNotFoundException ex) {
            throw new UserNotFoundException(ex.getMessage());
        }
    }
}
