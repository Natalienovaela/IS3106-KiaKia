/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Trip;
import entity.User;
import java.util.concurrent.Future;
import javax.ejb.Local;

/**
 *
 * @author YC
 */
@Local
public interface EmailSessionBeanLocal {

    public Boolean emailResetPasswordSync(User user, String toEmailAddress);

    public Future<Boolean> emailResetPasswordAsync(User user, String toEmailAddress) throws InterruptedException;

    public Boolean emailInvitationToUserSync(User user, Trip trip, String userRole, String toEmailAddress);

    public Future<Boolean> emailInvitationToUserAsync(User user, Trip trip, String userRole, String toEmailAddress) throws InterruptedException;
    
}
