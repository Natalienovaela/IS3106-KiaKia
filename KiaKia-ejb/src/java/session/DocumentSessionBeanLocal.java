/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import enumeration.DocumentCategoryEnum;
import error.DocumentUploadException;
import java.io.File;
import java.util.Date;
import javax.ejb.Local;

/**
 *
 * @author vinessa
 */
@Local
public interface DocumentSessionBeanLocal {

    public Long uploadDocument(File handledDocument, String name, String type, Date dateUploaded, DocumentCategoryEnum category) throws DocumentUploadException;
    
}
