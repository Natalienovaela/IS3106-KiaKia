/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import enumeration.CityEnum;
import enumeration.CountryEnum;
import java.util.Arrays;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author Natalienovaela
 */
@Stateless
public class CityOrCountrySessionBean implements CityOrCountrySessionBeanLocal {

    private CountryEnum countryEnum;
    
    private CityEnum cityEnum;
    
    @PersistenceContext(unitName = "KiaKia-ejbPU")
    private EntityManager em;

    @Override
    public List<CountryEnum> getCountryEnumList() {
        return Arrays.asList(countryEnum.values());
    }
    
    @Override
    public List<CityEnum> getCityEnumList() {
        return Arrays.asList(cityEnum.values());
    }
    
}
