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
public class PollNotFoundException extends Exception{

    /**
     * Creates a new instance of <code>PollNotFoundException</code> without
     * detail message.
     */
    public PollNotFoundException() {
    }

    /**
     * Constructs an instance of <code>PollNotFoundException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public PollNotFoundException(String msg) {
        super(msg);
    }
}
