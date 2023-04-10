/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.PlaceLineItem;
import error.DayItineraryNotFoundException;
import error.PlaceLineItemNotFoundException;
import error.PlaceNotFoundException;
import error.TripNotFoundException;
import javax.ejb.Local;

/**
 *
 * @author Natalienovaela
 */
@Local
public interface PlaceLineItemSessionBeanLocal {

    public PlaceLineItem createPlaceLineItem(Long itineraryId, Long placeId) throws PlaceNotFoundException, DayItineraryNotFoundException;

    public void removePlaceLineItem(Long itineraryId, Long placeLineItemId) throws DayItineraryNotFoundException, PlaceLineItemNotFoundException;

    public PlaceLineItem createBucketListItem(Long tripId, Long placeId) throws PlaceNotFoundException, TripNotFoundException;

    public void removeBucketListItem(Long tripId, Long placeLineItemId) throws TripNotFoundException, PlaceLineItemNotFoundException;
    
}
