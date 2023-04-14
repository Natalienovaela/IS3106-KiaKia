/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Natalienovaela
 */
@Entity
public class DayItinerary implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dayItineraryId;
    
    @Temporal(TemporalType.DATE)
    private Date date;
    
    private String description;
    
    private Boolean isShared = Boolean.FALSE;
    
    @OneToMany
    private ArrayList<PlaceLineItem> placeLineItem;
    
    public DayItinerary() {
        
    }
    
    public DayItinerary(String description, Date date) {
        this.description = description;
        this.date = date;
    }

    public Long getDayItineraryId() {
        return dayItineraryId;
    }

    public void setDayItineraryId(Long dayItineraryId) {
        this.dayItineraryId = dayItineraryId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (dayItineraryId != null ? dayItineraryId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the dayItineraryId fields are not set
        if (!(object instanceof DayItinerary)) {
            return false;
        }
        DayItinerary other = (DayItinerary) object;
        if ((this.dayItineraryId == null && other.dayItineraryId != null) || (this.dayItineraryId != null && !this.dayItineraryId.equals(other.dayItineraryId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.DayItinerary[ id=" + dayItineraryId + " ]";
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getIsShared() {
        return isShared;
    }

    public void setIsShared(Boolean isShared) {
        this.isShared = isShared;
    }

    public ArrayList<PlaceLineItem> getPlaceLineItem() {
        return placeLineItem;
    }

    public void setPlaceLineItem(ArrayList<PlaceLineItem> placeLineItem) {
        this.placeLineItem = placeLineItem;
    }
    
}
