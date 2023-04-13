///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//package session;
//
//import java.io.ByteArrayOutputStream;
//import java.io.IOException;
//import java.io.InputStream;
//import java.io.OutputStream;
//import javax.ejb.Stateless;
//import javax.persistence.EntityManager;
//import javax.persistence.PersistenceContext;
//import javax.ws.rs.WebApplicationException;
//import javax.ws.rs.core.StreamingOutput;
//
///**
// *
// * @author vinessa
// */
//@Stateless
//public class FileSessionBean implements FileSessionBeanLocal {
//
//    @PersistenceContext(unitName = "KiaKia-ejbPU")
//    private EntityManager em;
//
//    public void upload(InputStream fileInputStream, FormDataContentDisposition fileMetaData) throws IOException {
//        // create a new entity for the file and set its properties
//        FileEntity fileEntity = new FileEntity();
//        fileEntity.setFileName(fileMetaData.getFileName());
//        fileEntity.setFileType(fileMetaData.getType());
//        fileEntity.setFileSize(fileMetaData.getSize());
//        
//        // read the contents of the input stream into a byte array
//        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
//        int nRead;
//        byte[] data = new byte[1024];
//        while ((nRead = fileInputStream.read(data, 0, data.length)) != -1) {
//            buffer.write(data, 0, nRead);
//        }
//        buffer.flush();
//        byte[] fileContent = buffer.toByteArray();
//        buffer.close();
//        
//        // set the contents of the file entity to the byte array
//        fileEntity.setFileContent(fileContent);
//        
//        // persist the entity to the database
//        em.persist(fileEntity);
//    }
//    
//    public StreamingOutput download(Long fileId) throws IOException {
//        // retrieve the file entity from the database
//        FileEntity fileEntity = em.find(FileEntity.class, fileId);
//        
//        // create a streaming output object to send the file to the client
//        StreamingOutput stream = new StreamingOutput() {
//            @Override
//            public void write(OutputStream out) throws IOException, WebApplicationException {
//                out.write(fileEntity.getFileContent());
//                out.flush();
//            }
//        };
//        
//        return stream;
//    }
//
//    
//}
