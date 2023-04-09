/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import enumeration.UserRoleEnum;
import java.io.Serializable;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 *
 * @author Natalienovaela
 */
@Entity
@Table(name = "TripAssignment", uniqueConstraints = {
    @UniqueConstraint(columnNames = { "userId", "tripId" })})
public class TripAssignment implements Serializable {

    @EmbeddedId
    private TripAssignmentId tripAssignmentId;
    
    @ManyToOne
    @MapsId("tripId")
    private Trip trip;
    
    @ManyToOne
    @MapsId("userId")
    private User user;
    
    @ManyToOne
    @Enumerated(EnumType.STRING)
    private UserRoleEnum userRoleEnum;
    
    @Embeddable
    public static class TripAssignmentId implements Serializable {
        private Long tripId;
        private Long userId;
        
        public TripAssignmentId() {
            
        }

        public Long getTripId() {
            return tripId;
        }

        public void setTripId(Long tripId) {
            this.tripId = tripId;
        }

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }
    }
    
    public TripAssignment() {
        
    }
    
    public TripAssignment(User user, Trip trip, UserRoleEnum userRoleEnum) {
        this.user = user;
        this.trip = trip;
        this.userRoleEnum = userRoleEnum;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (tripAssignmentId != null ? tripAssignmentId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof TripAssignment)) {
            return false;
        }
        TripAssignment other = (TripAssignment) object;
        if ((this.tripAssignmentId == null && other.tripAssignmentId != null) || (this.tripAssignmentId != null && !this.tripAssignmentId.equals(other.tripAssignmentId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.TripAssignment[ id=" + tripAssignmentId + " ]";
    }

    public TripAssignmentId getTripAssignmentId() {
        return tripAssignmentId;
    }

    public void setTripAssignmentId(TripAssignmentId tripAssignmentId) {
        this.tripAssignmentId = tripAssignmentId;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public UserRoleEnum getUserRoleEnum() {
        return userRoleEnum;
    }

    public void setUserRoleEnum(UserRoleEnum userRoleEnum) {
        this.userRoleEnum = userRoleEnum;
    }
    
}
