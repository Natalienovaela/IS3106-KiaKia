/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Trip;
import entity.Wishlist;
import error.WishlistNotFoundException;
import java.util.HashMap;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author varrene
 */
@Stateless
public class WishlistSessionBean implements WishlistSessionBeanLocal {

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    @PersistenceContext
    private EntityManager em;

    @Override
    public void createWishlist(Wishlist w) {
        em.persist(w);
    }

    @Override
    public Wishlist getwishlistbyId(Long id) throws WishlistNotFoundException {
        Wishlist w = em.find(Wishlist.class, id);
        
        if (w != null) {
            return w;
        } else {
            throw new WishlistNotFoundException("Wishlist ID " + id + " does not exist!");
        }
    }

    /*@Override
    public List<Wishlist> searchWishlistByFolderName(String folderName, Long id) throws WishlistNotFoundException {
        Wishlist currentWishlist = getwishlistbyId(id);
       return List
        
    }*/

    @Override
    public List<Wishlist> searchWishlistByTripCountry(String countryName) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void deleteWishlist(Long id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void addTripToWishlist(Long tripId, Long wishlistId) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
    
}
