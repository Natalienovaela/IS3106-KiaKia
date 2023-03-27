/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Natalienovaela
 */
@Entity
public class PlaceLineItem implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placeLineItemId;
    
    @Temporal(TemporalType.DATE)
    private Date startTime;
    
    @Temporal(TemporalType.DATE)
    private Date endTime;
    
    private Boolean isShared;
    
    @ManyToOne(optional=false)
    private Place place;
    
    @OneToMany
    private List<Note> notes;
    
    @ManyToMany
    private List<User> votedUsers;
    

    public Long getPlaceLineItemId() {
        return placeLineItemId;
    }

    public void setPlaceLineItemId(Long placeLineItemId) {
        this.placeLineItemId = placeLineItemId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (placeLineItemId != null ? placeLineItemId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the placeLineItemId fields are not set
        if (!(object instanceof PlaceLineItem)) {
            return false;
        }
        PlaceLineItem other = (PlaceLineItem) object;
        if ((this.placeLineItemId == null && other.placeLineItemId != null) || (this.placeLineItemId != null && !this.placeLineItemId.equals(other.placeLineItemId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.PlaceLineItem[ id=" + placeLineItemId + " ]";
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Boolean isIsShared() {
        return isShared;
    }

    public void setIsShared(Boolean isShared) {
        this.isShared = isShared;
    }

    public Place getPlace() {
        return place;
    }

    public void setPlace(Place place) {
        this.place = place;
    }

    public List<Note> getNotes() {
        return notes;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }

    public List<User> getVotedUsers() {
        return votedUsers;
    }

    public void setVotedUsers(List<User> votedUsers) {
        this.votedUsers = votedUsers;
    }
    
}
