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
public class CheckListNotFoundException extends Exception{

    /**
     * Creates a new instance of <code>CheckListNotFoundException</code> without
     * detail message.
     */
    public CheckListNotFoundException() {
    }

    /**
     * Constructs an instance of <code>CheckListNotFoundException</code> with
     * the specified detail message.
     *
     * @param msg the detail message.
     */
    public CheckListNotFoundException(String msg) {
        super(msg);
    }
}
