/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 *
 * @author varrene
 */
@Entity
public class Wishlist implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wishlistId;
    
    private Long userId;
//    private HashMap<String, List<Trip>> tripFolders;

    public Long getWishlistId() {
        return wishlistId;
    }

    public void setWishlistId(Long wishlistId) {
        this.wishlistId = wishlistId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

//    public HashMap<String, List<Trip>> getTripFolders() {
//        return tripFolders;
//    }
//
//    public void setTripFolders(HashMap<String, List<Trip>> tripFolders) {
//        this.tripFolders = tripFolders;
//    }
//    

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (wishlistId != null ? wishlistId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the wishlistId fields are not set
        if (!(object instanceof Wishlist)) {
            return false;
        }
        Wishlist other = (Wishlist) object;
        if ((this.wishlistId == null && other.wishlistId != null) || (this.wishlistId != null && !this.wishlistId.equals(other.wishlistId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Wishlist[ id=" + wishlistId + " ]";
    }
    
}
