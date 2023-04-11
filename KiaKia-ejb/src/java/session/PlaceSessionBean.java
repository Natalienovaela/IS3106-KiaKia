/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Place;
import error.CityOrCountryNotSelected;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author Natalienovaela
 */
@Stateless
public class PlaceSessionBean implements PlaceSessionBeanLocal {

    @PersistenceContext(unitName = "KiaKia-ejbPU")
    private EntityManager em;

    @Override
    public List<Place> searchPlaceByCityOrCountry(String city, String country) throws CityOrCountryNotSelected {
        if(city != null) {
            return em.createQuery("SELECT p FROM Place p WHERE p.city = :city").setParameter("city", city).getResultList();
        }
        else if(country != null) {
            return em.createQuery("SELECT p FROM Place p WHERE p.country = :country").setParameter("country", country).getResultList();
        }
        else {
            throw new CityOrCountryNotSelected("City or Country is not specified");
        }
    }
    
}
