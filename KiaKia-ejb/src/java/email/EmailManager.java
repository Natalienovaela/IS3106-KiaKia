/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package email;

import entity.Trip;
import entity.User;
import java.util.Date;
import java.util.Properties;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

/**
 *
 * @author YC
 */
public class EmailManager 
{
    private final String emailServerName = "smtp.gmail.com";
    private final String mailer = "JavaMailer";
    private String smtpAuthUser;
    private String smtpAuthPassword;
    
    
    
    public EmailManager()
    {
    }

    
    
    public EmailManager(String smtpAuthUser, String smtpAuthPassword)
    {
        this.smtpAuthUser = smtpAuthUser;
        this.smtpAuthPassword = smtpAuthPassword;
    }
    
    
    
    public Boolean emailInvitationToUser(User user, Trip trip, String userRole, String fromEmailAddress, String toEmailAddress)
    {
        String emailBody = "";
        
        emailBody += "Dear " + user.getName() + "," + "\n\n";
        emailBody += "You have been invited to join a trip as a/an " + userRole + ". Click the link below to accept the invite:\n\n";
//         String inviteUrl = "https://example.com/accept-invite?token=" + trip.getInviteToken() + "&role=" + userRole;
//        emailBody += inviteUrl;
        emailBody += "Cheers, \n\n";
        emailBody += "KiaKia team";  
            
        
        try 
        {
            Properties props = new Properties();
            props.put("mail.transport.protocol", "smtp");
            props.put("mail.smtp.host", emailServerName);
            props.put("mail.smtp.port", "587");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.ssl.trust", emailServerName);
            props.put("mail.smtp.debug", "true");       
            
            Authenticator auth = new SMTPAuthenticator(smtpAuthUser, smtpAuthPassword);
            
            Session session = Session.getInstance(props, auth);
            session.setDebug(true);            
            
            Message msg = new MimeMessage(session);                                    
            msg.setFrom(InternetAddress.parse(fromEmailAddress, false)[0]);
            msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmailAddress, false));
            msg.setSubject("[KiaKia] Invitation link to join new trip");
            msg.setText(emailBody);
            msg.setHeader("X-Mailer", mailer);

            Date timeStamp = new Date();
            msg.setSentDate(timeStamp);

            Transport.send(msg);

            return true;
        }
        catch (Exception e) 
        {
            e.printStackTrace();
            
            return false;
        }
    }
    
    public Boolean emailResetPassword(User user, String fromEmailAddress, String toEmailAddress)
    {
        String emailBody = "";
        
        emailBody += "Dear " + user.getName() + "," + "\n\n";
        emailBody += "We have just received a request to reset your password. Please click on the following link to reset it: \n\n";
        // String inviteUrl = "http://localhost:3000/reset-password?token=\" + user.getResetPasswordToken();
        //emailBody += inviteUrl;
        emailBody += "If you did not request this password reset, please just ignore this email; the link will expire after 24 hours. \n\n";
        emailBody += "Cheers, \n\n";
        emailBody += "KiaKia team";    
        
        try 
        {
            Properties props = new Properties();
            props.put("mail.transport.protocol", "smtp");
            props.put("mail.smtp.host", emailServerName);
            props.put("mail.smtp.port", "587");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.ssl.trust", emailServerName);
            props.put("mail.smtp.debug", "true");       
            
            Authenticator auth = new SMTPAuthenticator(smtpAuthUser, smtpAuthPassword);
            
            Session session = Session.getInstance(props, auth);
            session.setDebug(true);            
            
            Message msg = new MimeMessage(session);                                    
            msg.setFrom(InternetAddress.parse(fromEmailAddress, false)[0]);
            msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmailAddress, false));
            msg.setSubject("[KiaKia] Reset your password");
            msg.setText(emailBody);
            msg.setHeader("X-Mailer", mailer);

            Date timeStamp = new Date();
            msg.setSentDate(timeStamp);

            Transport.send(msg);

            return true;
        }
        catch (Exception e) 
        {
            e.printStackTrace();
            
            return false;
        }
    }
}

