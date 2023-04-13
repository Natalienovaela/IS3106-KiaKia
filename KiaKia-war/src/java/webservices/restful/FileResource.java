///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//package webservices.restful;
//
//import java.io.File;
//import java.io.FileOutputStream;
//import java.io.IOException;
//import java.io.InputStream;
//import java.io.OutputStream;
//import javax.ws.rs.Consumes;
//import javax.ws.rs.POST;
//import javax.ws.rs.Path;
//import javax.ws.rs.core.MediaType;
//import javax.ws.rs.core.Response;
//
///**
// *
// * @author vinessa
// */
//@Path("/trips/{tripId}/files")
//public class FileResource {
//
//    private static final String UPLOAD_DIR = "uploads";
//
//    @POST
//    @Path("/upload")
//    @Consumes(MediaType.MULTIPART_FORM_DATA)
//    public Response uploadFile(@FormDataParam("file") InputStream fileInputStream,
//            @FormDataParam("file") FormDataContentDisposition contentDispositionHeader) {
//
//        String fileName = contentDispositionHeader.getFileName();
//        String uploadFilePath = getUploadFilePath(fileName);
//
//        saveFile(fileInputStream, uploadFilePath);
//
//        return Response.status(200).entity("File uploaded to : " + uploadFilePath).build();
//    }
//
//    private String getUploadFilePath(String fileName) {
//        String uploadDirPath = System.getProperty("user.dir") + File.separator + UPLOAD_DIR;
//        File uploadDir = new File(uploadDirPath);
//        if (!uploadDir.exists()) {
//            uploadDir.mkdir();
//        }
//        return uploadDirPath + File.separator + fileName;
//    }
//
//    private void saveFile(InputStream fileInputStream, String filePath) {
//        try {
//            OutputStream outputStream = new FileOutputStream(new File(filePath));
//            int read = 0;
//            byte[] bytes = new byte[1024];
//            while ((read = fileInputStream.read(bytes)) != -1) {
//                outputStream.write(bytes, 0, read);
//            }
//            outputStream.flush();
//            outputStream.close();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
//}
//
//}
