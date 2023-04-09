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
public class PlaceNotFoundException extends Exception {

    /**
     * Creates a new instance of <code>PlaceNotFoundException</code> without
     * detail message.
     */
    public PlaceNotFoundException() {
    }

    /**
     * Constructs an instance of <code>PlaceNotFoundException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public PlaceNotFoundException(String msg) {
        super(msg);
    }
}
