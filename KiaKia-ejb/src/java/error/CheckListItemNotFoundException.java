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
public class CheckListItemNotFoundException  extends Exception{

    /**
     * Creates a new instance of <code>CheckListItemNotFoundException</code>
     * without detail message.
     */
    public CheckListItemNotFoundException() {
    }

    /**
     * Constructs an instance of <code>CheckListItemNotFoundException</code>
     * with the specified detail message.
     *
     * @param msg the detail message.
     */
    public CheckListItemNotFoundException(String msg) {
        super(msg);
    }
}
