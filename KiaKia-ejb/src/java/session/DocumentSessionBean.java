/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Document;
import enumeration.DocumentCategoryEnum;
import error.DocumentUploadException;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.PreparedStatement;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import static org.jboss.weld.util.reflection.Formats.version;

/**
 *
 * @author vinessa
 */
@Stateless
public class DocumentSessionBean implements DocumentSessionBeanLocal {

    @PersistenceContext(unitName = "KiaKia-ejbPU")
    private EntityManager em;

    //https://stackoverflow.com/questions/19970964/how-to-save-generated-pdf-files-to-mysql-database-using-java
    private byte[] getByteArrayFromFile(File handledDocument) throws IOException {
        final ByteArrayOutputStream baos = new ByteArrayOutputStream();
        final InputStream in = new FileInputStream(handledDocument);
        final byte[] buffer = new byte[500];

        int read = -1;
        while ((read = in.read(buffer)) > 0) {
            baos.write(buffer, 0, read);
        }
        in.close();

        return baos.toByteArray();
    }

    //https://www.baeldung.com/convert-input-stream-to-array-of-bytes
    @Override
    public Long uploadDocument(File handledDocument, String name, String type, Date dateUploaded, DocumentCategoryEnum category) throws DocumentUploadException{
        Document doc = new Document();
        doc.setName(name);
        doc.setType(type);
        doc.setDateUploaded(dateUploaded);
        doc.setCategory(category);
        ByteArrayInputStream is;
        try {
            is = new ByteArrayInputStream(getByteArrayFromFile(handledDocument));

            ByteArrayOutputStream buffer = new ByteArrayOutputStream();
            int nRead;
            byte[] data = new byte[4];
            while ((nRead = is.read(data, 0, data.length)) != -1) {
                buffer.write(data, 0, nRead);
            }
            buffer.flush();
            byte[] targetArray = buffer.toByteArray();
            doc.setData(targetArray);
            em.persist(doc);
            em.flush();
            return doc.getDocumentId();
        } catch (IOException ex) {
            throw new DocumentUploadException("Error uploading document");
        }
    }
}
