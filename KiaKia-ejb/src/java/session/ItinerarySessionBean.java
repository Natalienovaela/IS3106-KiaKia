/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.DayItinerary;
import entity.Trip;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;
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
        
        int day = (int) TimeUnit.DAYS.convert((endDate.getTime() - startDate.getTime()), TimeUnit.MILLISECONDS);
        day++;
        
        List<DayItinerary> itineraries = new ArrayList<>();
        Calendar date = Calendar.getInstance();
        date.setTime(startDate);
        
        for(int i = 0; i < day; i++) {
            int j = i+1;
            DayItinerary itinerary = new DayItinerary("Day " + j, date.getTime());
            em.persist(itinerary);
            itineraries.add(itinerary);
            date.add(Calendar.DATE, 1);
        }
        
        if(trip.getItinerary().isEmpty()) {
            trip.setItinerary(itineraries);
            trip.setStartDate(startDate);
            trip.setEndDate(endDate);
        } else {
            List<DayItinerary> oldItineraries = trip.getItinerary();
            for(DayItinerary oldItinerary: oldItineraries) {
                int i = 0;
                itineraries.get(i).setPlaceLineItem(oldItinerary.getPlaceLineItem());
                em.remove(oldItinerary);
                i++;
            }
            trip.setItinerary(itineraries);
            trip.setStartDate(startDate);
            trip.setEndDate(endDate);
        }
        
        return itineraries;
        
    }

    //when update itinerary, can just set the list to the new list, hence easier can just reorder in front end using the splice'' method
    
    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
}
