/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.PlaceLineItem;
import error.DayItineraryNotFoundException;
import error.PlaceNotFoundException;
import javax.ejb.Local;

/**
 *
 * @author Natalienovaela
 */
@Local
public interface PlaceLineItemSessionBeanLocal {

    public PlaceLineItem createPlaceLineItem(Long itineraryId, Long placeId) throws PlaceNotFoundException, DayItineraryNotFoundException;
    
}
