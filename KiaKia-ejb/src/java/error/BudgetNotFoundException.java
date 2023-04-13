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
public class BudgetNotFoundException extends Exception {

    /**
     * Creates a new instance of <code>BudgetNotFoundException</code> without
     * detail message.
     */
    public BudgetNotFoundException() {
    }

    /**
     * Constructs an instance of <code>BudgetNotFoundException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public BudgetNotFoundException(String msg) {
        super(msg);
    }
}
