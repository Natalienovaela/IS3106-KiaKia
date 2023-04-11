/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package error;

/**
 *
 * @author Natalienovaela
 */
public class FolderNotFoundException extends Exception {

    /**
     * Creates a new instance of <code>FolderNotFoundException</code> without
     * detail message.
     */
    public FolderNotFoundException() {
    }

    /**
     * Constructs an instance of <code>FolderNotFoundException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public FolderNotFoundException(String msg) {
        super(msg);
    }
}
