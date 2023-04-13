/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import enumeration.CityEnum;
import enumeration.CountryEnum;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author Natalienovaela
 */
@Local
public interface CityOrCountrySessionBeanLocal {

    public List<CityEnum> getCityEnumList();

    public List<CountryEnum> getCountryEnumList();
    
}
