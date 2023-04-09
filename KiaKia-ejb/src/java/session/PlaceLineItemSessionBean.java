/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.DayItinerary;
import entity.Place;
import entity.PlaceLineItem;
import error.DayItineraryNotFoundException;
import error.PlaceLineItemNotFoundException;
import error.PlaceNotFoundException;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author Natalienovaela
 */
@Stateless
public class PlaceLineItemSessionBean implements PlaceLineItemSessionBeanLocal {

    @PersistenceContext(unitName = "KiaKia-ejbPU")
    private EntityManager em;

    @Override
    public PlaceLineItem createPlaceLineItem(Long itineraryId, Long placeId) throws PlaceNotFoundException, DayItineraryNotFoundException {
        try {
            Place place = em.find(Place.class, placeId);
            try {
                DayItinerary itinerary = em.find(DayItinerary.class, itineraryId);

                PlaceLineItem placeLineItem = new PlaceLineItem();
                em.persist(placeLineItem);
                placeLineItem.setPlace(place);
                itinerary.getPlaceLineItem().add(placeLineItem);

                return placeLineItem;
            } catch (Exception ex) {
                throw new DayItineraryNotFoundException("Itinerary does not exist");
            }
        } catch (Exception ex) {
            throw new PlaceNotFoundException("Place does not exist");
        }
    }
    
    public void removePlaceLineItem(Long itineraryId, Long placeLineItemId) throws DayItineraryNotFoundException {
        try {
            DayItinerary itinerary = em.find(DayItinerary.class, itineraryId);
            try {
                PlaceLineItem placeLineItem = em.find(PlaceLineItem.class, placeLineItemId);
                itinerary.getPlaceLineItem().remove(placeLineItem);
                em.remove(placeLineItem);
            }
            catch (Exception ex) {
                throw new PlaceLineItemNotFoundException("Place line item does not exist");
            }
                
        }
        catch (Exception ex) {
                throw new DayItineraryNotFoundException("Itinerary does not exist");
            }
    }

}
