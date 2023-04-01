/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import email.EmailManager;
import entity.Trip;
import entity.User;
import java.util.concurrent.Future;
import javax.ejb.AsyncResult;
import javax.ejb.Asynchronous;
import javax.ejb.Stateless;

/**
 *
 * @author YC
 */
@Stateless
public class EmailSessionBean implements EmailSessionBeanLocal {

    private final String FROM_EMAIL_ADDRESS = "KiaKia <no.reply.kiakia@gmail.com>";
    private final String GMAIL_USERNAME = "no.reply.kiakia@gmail.com";
    private final String GMAIL_PASSWORD = "password";        
    
    
    
    @Override
    public Boolean emailResetPasswordSync(User user, String toEmailAddress)
    {
        EmailManager emailManager = new EmailManager(GMAIL_USERNAME, GMAIL_PASSWORD);
        Boolean result = emailManager.emailResetPassword(user, FROM_EMAIL_ADDRESS, toEmailAddress);
        
        return result;
    } 
    
    @Asynchronous
    @Override
    public Future<Boolean> emailResetPasswordAsync(User user, String toEmailAddress) throws InterruptedException
    {        
        EmailManager emailManager = new EmailManager(GMAIL_USERNAME, GMAIL_PASSWORD);
        Boolean result = emailManager.emailResetPassword(user, FROM_EMAIL_ADDRESS, toEmailAddress);
        
        return new AsyncResult<>(result);
    }
    
    @Override
    public Boolean emailInvitationToUserSync(User user, Trip trip, String userRole, String toEmailAddress)
    {
        EmailManager emailManager = new EmailManager(GMAIL_USERNAME, GMAIL_PASSWORD);
        Boolean result = emailManager.emailInvitationToUser(user, trip, userRole, FROM_EMAIL_ADDRESS, toEmailAddress);
        
        return result;
    } 
    
    
    
    @Asynchronous
    @Override
    public Future<Boolean> emailInvitationToUserAsync(User user, Trip trip, String userRole, String toEmailAddress) throws InterruptedException
    {        
        EmailManager emailManager = new EmailManager(GMAIL_USERNAME, GMAIL_PASSWORD);
        Boolean result = emailManager.emailInvitationToUser(user, trip, userRole, FROM_EMAIL_ADDRESS, toEmailAddress);
        
        return new AsyncResult<>(result);
    }
}
