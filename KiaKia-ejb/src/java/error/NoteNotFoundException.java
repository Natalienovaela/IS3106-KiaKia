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
public class NoteNotFoundException extends Exception {

    /**
     * Creates a new instance of <code>NoteNotFoundException</code> without
     * detail message.
     */
    public NoteNotFoundException() {
    }

    /**
     * Constructs an instance of <code>NoteNotFoundException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public NoteNotFoundException(String msg) {
        super(msg);
    }
}
