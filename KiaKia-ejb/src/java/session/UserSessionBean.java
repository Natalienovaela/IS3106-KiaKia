/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Trip;
import entity.TripAssignment;
import entity.User;
import enumeration.UserRoleEnum;
import error.InvalidLoginException;
import error.ResetPasswordException;
import error.UserNotFoundException;
import java.time.LocalDateTime;
import java.util.Date;
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
 * @author YC
 */
@Stateless
public class UserSessionBean implements UserSessionBeanLocal {

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    @PersistenceContext
    private EntityManager em;
    
    @EJB
    private EmailSessionBeanLocal emailSessionBeanLocal;

    @Override
    public void createUser(User u) {
        u.setLoginToken(UUID.randomUUID().toString());
        em.persist(u);
        em.flush();
    }
    
    @Override
    public void createUserTemporary(User user, Trip trip) {
        em.persist(user);
        em.flush();
        TripAssignment tripAssignment = new TripAssignment(user, trip, UserRoleEnum.ADMIN);
        em.persist(tripAssignment);
        //trip.getEditors().add(u);
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
        Query query = em.createQuery("SELECT u FROM User u WHERE LOWER(u.email) = :inEmail");
        query.setParameter("inEmail", email.toLowerCase());

        try {
            return (User) query.getSingleResult();
        } catch (NoResultException | NonUniqueResultException ex) {
            throw new UserNotFoundException("User Email " + email + " does not exist!");
        }
    }
    
    @Override
    public User retrieveUserByUsername(String username) throws UserNotFoundException {
        Query query = em.createQuery("SELECT u FROM User u WHERE LOWER(u.username) = :inUsername");
        query.setParameter("inUsername", username.toLowerCase());

        try {
            return (User) query.getSingleResult();
        } catch (NoResultException | NonUniqueResultException ex) {
            throw new UserNotFoundException("Username " + username + " does not exist!");
        }
    }
    
    @Override
    public User retrieveUserByPasswordToken(String token) throws UserNotFoundException {
        Query query = em.createQuery("SELECT u FROM User u WHERE u.resetPasswordToken = :inToken");
        query.setParameter("inToken", token);

        try {
            return (User) query.getSingleResult();
        } catch (NoResultException | NonUniqueResultException ex) {
            throw new UserNotFoundException("Invalid password reset token!");
        }
    }
    
    @Override
    public boolean usernameExists(String username) throws UserNotFoundException {
        try {
            return retrieveUserByUsername(username) != null;
        } catch (UserNotFoundException ex) {
            return false;
        }
    }

    @Override
    public boolean emailExists(String email) throws UserNotFoundException {

        try {
            return retrieveUserByEmail(email) != null;
        } catch (UserNotFoundException ex) {
            return false;
        }
    }

    @Override
    public User userLogin(String email, String password) throws InvalidLoginException, UserNotFoundException {
        try {
            User user = retrieveUserByEmail(email);

            if (user.getPassword().equals(password)) {
                user.setLoginToken(UUID.randomUUID().toString());
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

    @Override
    public void forgotPassword(String email) throws UserNotFoundException {
        try {
            User user = retrieveUserByEmail(email);
            user.setResetPasswordToken(UUID.randomUUID().toString());
            Date expiryDate = java.sql.Timestamp.valueOf(LocalDateTime.now().plusHours(24));
            user.setTokenExpiryDate(expiryDate);
            try {
                emailSessionBeanLocal.emailResetPasswordAsync(user, user.getEmail());
            } catch (InterruptedException ex) {
                ex.printStackTrace();
            }
        } catch (UserNotFoundException ex) {
            throw new UserNotFoundException(ex.getMessage());
        }
    }
    
    //Reset from email link
    @Override
    public void resetPassword(String token) throws UserNotFoundException, ResetPasswordException {
        try {
            User user = retrieveUserByPasswordToken(token);
            
            if (token == null || user.getTokenExpiryDate().before(java.sql.Timestamp.valueOf(LocalDateTime.now()))) {
                throw new ResetPasswordException("Invalid or expired password reset token");
            }
                resetPassword(user);
        } catch (UserNotFoundException ex) {
            throw new UserNotFoundException(ex.getMessage());
        }
    }
}
