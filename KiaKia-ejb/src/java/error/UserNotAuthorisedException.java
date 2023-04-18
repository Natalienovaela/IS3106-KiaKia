package error;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author vinessa
 */
public class UserNotAuthorisedException extends Exception {

    /**
     * Creates a new instance of <code>UserNotAuthorisedException</code> without
     * detail message.
     */
    public UserNotAuthorisedException() {
    }

    /**
     * Constructs an instance of <code>UserNotAuthorisedException</code> with
     * the specified detail message.
     *
     * @param msg the detail message.
     */
    public UserNotAuthorisedException(String msg) {
        super(msg);
    }
}
