/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.File;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author YC
 */
@Entity
public class User implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String username;
    private String email;
    private String password;
    private String name;
    @Temporal(TemporalType.DATE)
    private Date dob;
    private Wishlist wishlist;
    private File photo;
    private String resetPasswordToken;
    @Temporal(TemporalType.DATE)
    private Date tokenExpiryDate;

    @ManyToMany
    private List<Trip> adminTrips;

    @ManyToMany
    private List<Trip> viewerTrips;

    @ManyToMany
    private List<Trip> editorTrips;

    @ManyToMany
    private List<Trip> wishlistTrips; // pending

    @ManyToMany
    private List<Place> wishlistPlaces; // pending

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (userId != null ? userId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the userId fields are not set
        if (!(object instanceof User)) {
            return false;
        }
        User other = (User) object;
        if ((this.userId == null && other.userId != null) || (this.userId != null && !this.userId.equals(other.userId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.User[ id=" + userId + " ]";
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public File getPhoto() {
        return photo;
    }

    public void setPhoto(File photo) {
        this.photo = photo;
    }

    public Wishlist getWishlist() {
        return wishlist;
    }

    public void setWishlist(Wishlist wishlist) {
        this.wishlist = wishlist;
    }
    
    
    
    public List<Trip> getAdminTrips() {
        return adminTrips;
    }

    public void setAdminTrips(List<Trip> adminTrips) {
        this.adminTrips = adminTrips;
    }

    public List<Trip> getViewerTrips() {
        return viewerTrips;
    }

    public void setViewerTrips(List<Trip> viewerTrips) {
        this.viewerTrips = viewerTrips;
    }

    public List<Trip> getEditorTrips() {
        return editorTrips;
    }

    public void setEditorTrips(List<Trip> editorTrips) {
        this.editorTrips = editorTrips;
    }

    public List<Trip> getWishlistTrips() {
        return wishlistTrips;
    }

    public void setWishlistTrips(List<Trip> wishlistTrips) {
        this.wishlistTrips = wishlistTrips;
    }

    public List<Place> getWishlistPlaces() {
        return wishlistPlaces;
    }

    public void setWishlistPlaces(List<Place> wishlistPlaces) {
        this.wishlistPlaces = wishlistPlaces;
    }

    public String getResetPasswordToken() {
        return resetPasswordToken;
    }

    public void setResetPasswordToken(String resetPasswordToken) {
        this.resetPasswordToken = resetPasswordToken;
    }

    public Date getTokenExpiryDate() {
        return tokenExpiryDate;
    }

    public void setTokenExpiryDate(Date tokenExpiryDate) {
        this.tokenExpiryDate = tokenExpiryDate;
    }

}
