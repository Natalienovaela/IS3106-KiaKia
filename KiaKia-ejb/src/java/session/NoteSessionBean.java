/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author vinessa
 */
@Stateless
public class NoteSessionBean implements NoteSessionBeanLocal {

    @PersistenceContext(unitName = "KiaKia-ejbPU")
    private EntityManager em;

    
    
}
