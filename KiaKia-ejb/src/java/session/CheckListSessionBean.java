/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.CheckList;
import error.CheckListNotFoundException;
import error.UnknownPersistenceException;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;

/**
 *
 * @author Natalienovaela
 */
@Stateless
public class CheckListSessionBean implements CheckListSessionBeanLocal {

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    @PersistenceContext(unitName = "KiaKia-ejbPU")
    private EntityManager em;

    @Override
    public void createNewCheckList(CheckList checkList) throws UnknownPersistenceException {

        try {
            em.persist(checkList);
        } catch (PersistenceException ex) {

            throw new UnknownPersistenceException(ex.getMessage());
        }
    }
    
    @Override
    public void updateCheckList(CheckList checkList) throws CheckListNotFoundException {
        CheckList oldCheckList = em.find(CheckList.class, checkList);
        
        if(oldCheckList != null ) {
            oldCheckList.setContent(checkList.getContent());
            oldCheckList.setIsShared(checkList.getIsShared());
            oldCheckList.setTitle(checkList.getTitle());
        } else {
            throw new CheckListNotFoundException("Checklist not found in the database");
        }
    }
}
