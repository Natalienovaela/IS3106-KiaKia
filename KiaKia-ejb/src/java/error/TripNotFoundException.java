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
public class TripNotFoundException extends Exception{

    /**
     * Creates a new instance of <code>TripNotFoundException</code> without
     * detail message.
     */
    public TripNotFoundException() {
    }

    /**
     * Constructs an instance of <code>TripNotFoundException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public TripNotFoundException(String msg) {
        super(msg);
    }
}
