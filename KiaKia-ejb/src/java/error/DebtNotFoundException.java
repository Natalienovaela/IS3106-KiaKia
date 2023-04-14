/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package error;

/**
 *
 * @author MK
 */
public class DebtNotFoundException extends Exception {

    /**
     * Creates a new instance of <code>DebtNotFoundException</code> without
     * detail message.
     */
    public DebtNotFoundException() {
    }

    /**
     * Constructs an instance of <code>DebtNotFoundException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public DebtNotFoundException(String msg) {
        super(msg);
    }
}
