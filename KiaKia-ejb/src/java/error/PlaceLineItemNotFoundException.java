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
public class PlaceLineItemNotFoundException extends Exception{

    /**
     * Creates a new instance of <code>PlaceLineItemNotFoundException</code>
     * without detail message.
     */
    public PlaceLineItemNotFoundException() {
    }

    /**
     * Constructs an instance of <code>PlaceLineItemNotFoundException</code>
     * with the specified detail message.
     *
     * @param msg the detail message.
     */
    public PlaceLineItemNotFoundException(String msg) {
        super(msg);
    }
}
