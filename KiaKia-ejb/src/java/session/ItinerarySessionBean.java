/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.DayItinerary;
import entity.Trip;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author Natalienovaela
 */
@Stateless
public class ItinerarySessionBean implements ItinerarySessionBeanLocal {

    @PersistenceContext(unitName = "KiaKia-ejbPU")
    private EntityManager em;
    
    @Override
    public List<DayItinerary> createItineraries(Date startDate, Date endDate, Long tripId) {
        Trip trip = em.find(Trip.class, tripId);
        
        int day = (int)((endDate.getTime() - startDate.getTime())/(1000 * 3600 * 24));
        
        List<DayItinerary> itineraries = new ArrayList<>();
        
        
        for(int i = 0; i < itineraries.size(); i++) {
            int j = i+1;
            DayItinerary itinerary = new DayItinerary("Day " + j, startDate);
            em.persist(itinerary);
            itineraries.add(itinerary);
        }
        
        if(trip.getItinerary().isEmpty()) {
            trip.setItinerary(itineraries);
        } else {
            List<DayItinerary> newItineraries = trip.getItinerary();
            for(DayItinerary newItinerary: newItineraries) {
                int i = 0;
                itineraries.get(i).setPlaceLineItem(newItinerary.getPlaceLineItem());
                i++;
            }
        }
        
        return itineraries;
        
    }

    
    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
}
