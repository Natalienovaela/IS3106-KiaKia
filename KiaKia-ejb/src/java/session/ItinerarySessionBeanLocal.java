/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.DayItinerary;
import java.util.Date;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author Natalienovaela
 */
@Local
public interface ItinerarySessionBeanLocal {

    public List<DayItinerary> createItineraries(Date startDate, Date endDate, Long tripId);
    
}
