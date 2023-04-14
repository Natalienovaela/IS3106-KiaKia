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
public class ExpenseNotFoundException extends Exception {

    /**
     * Creates a new instance of <code>ExpenseNotFoundException</code> without
     * detail message.
     */
    public ExpenseNotFoundException() {
    }

    /**
     * Constructs an instance of <code>ExpenseNotFoundException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public ExpenseNotFoundException(String msg) {
        super(msg);
    }
}
