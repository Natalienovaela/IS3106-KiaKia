/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import enumeration.CityEnum;
import enumeration.CountryEnum;
import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.Response;
import session.CityOrCountrySessionBeanLocal;

/**
 * REST Web Service
 *
 * @author Natalienovaela
 */
@Path("cityOrCountry")
public class CityOrCountryResource {
    @EJB
    private CityOrCountrySessionBeanLocal cityOrCountrySessionBeanLocal;
    
    @GET
    @Path("/city")
    public Response getCityEnumList() {
        List<CityEnum> cityList = cityOrCountrySessionBeanLocal.getCityEnumList();
        GenericEntity<List<CityEnum>> entity = new GenericEntity<List<CityEnum>>(cityList){};
        return Response.status(200).entity(entity).build();
    }
    
    @GET
    @Path("/country")
    public Response getCountryEnumList() {
        List<CountryEnum> countryList = cityOrCountrySessionBeanLocal.getCountryEnumList();
        GenericEntity<List<CountryEnum>> entity = new GenericEntity<List<CountryEnum>>(countryList){};
        return Response.status(200).entity(entity).build();
    }
    
}
