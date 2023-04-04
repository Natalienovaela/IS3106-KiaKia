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
public class UserHasPolledException extends Exception {

    /**
     * Creates a new instance of <code>UserHasPolledException</code> without
     * detail message.
     */
    public UserHasPolledException() {
    }

    /**
     * Constructs an instance of <code>UserHasPolledException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public UserHasPolledException(String msg) {
        super(msg);
    }
}
