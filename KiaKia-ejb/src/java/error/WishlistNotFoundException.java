/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package error;

/**
 *
 * @author varrene
 */
public class WishlistNotFoundException extends Exception{

    /**
     * Creates a new instance of <code>WishlistNotFoundException</code> without
     * detail message.
     */
    public WishlistNotFoundException() {
    }

    /**
     * Constructs an instance of <code>WishlistNotFoundException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public WishlistNotFoundException(String msg) {
        super(msg);
    }
}
