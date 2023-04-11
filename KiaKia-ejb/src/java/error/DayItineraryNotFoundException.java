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
public class DayItineraryNotFoundException extends Exception{

    /**
     * Creates a new instance of <code>DayItineraryNotFoundException</code>
     * without detail message.
     */
    public DayItineraryNotFoundException() {
    }

    /**
     * Constructs an instance of <code>DayItineraryNotFoundException</code> with
     * the specified detail message.
     *
     * @param msg the detail message.
     */
    public DayItineraryNotFoundException(String msg) {
        super(msg);
    }
}
