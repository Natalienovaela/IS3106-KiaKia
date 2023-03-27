/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package error;

/**
 *
 * @author vinessa
 */
public class DocumentUploadException extends Exception {

    /**
     * Creates a new instance of <code>DocumentUploadException</code> without
     * detail message.
     */
    public DocumentUploadException() {
    }

    /**
     * Constructs an instance of <code>DocumentUploadException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public DocumentUploadException(String msg) {
        super(msg);
    }
}
