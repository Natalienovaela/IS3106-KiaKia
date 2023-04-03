/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Wishlist;
import error.WishlistNotFoundException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author varrene
 */
@Local
public interface WishlistSessionBeanLocal {
    public void createWishlist(Wishlist w);
    public Wishlist getwishlistbyId(Long id) throws WishlistNotFoundException;
    /*public List<Wishlist> searchWishlistByFolderName(String folderName);*/
    public List<Wishlist> searchWishlistByTripCountry(String countryName);
    public void deleteWishlist(Long id);
    public void addTripToWishlist(Long tripId, Long wishlistId);
}
