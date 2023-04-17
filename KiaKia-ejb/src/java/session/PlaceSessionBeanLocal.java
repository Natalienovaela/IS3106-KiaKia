/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Place;
import error.CityOrCountryNotSelected;
import error.PlaceNotFoundException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author Natalienovaela
 */
@Local
public interface PlaceSessionBeanLocal {

    public List<Place> searchPlaceByCityOrCountry(String city, String country) throws CityOrCountryNotSelected;

    public Place getPlace(Long placeId) throws PlaceNotFoundException;

    public List<Place> getAllPlaces();
    
}
