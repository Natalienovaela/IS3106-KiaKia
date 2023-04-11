/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.CheckList;
import entity.Trip;
import error.CheckListNotFoundException;
import error.TripNotFoundException;
import error.UnknownPersistenceException;
import java.util.List;
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
    public void createNewCheckList(Long tripId, CheckList checkList) throws UnknownPersistenceException, TripNotFoundException {

        try {
            em.persist(checkList);
            try {
                Trip trip = em.find(Trip.class, tripId);
                trip.getCheckLists().add(checkList);
            } catch (Exception ex) {
                throw new TripNotFoundException("Trip not found in the database");
            }
        } catch (PersistenceException ex) {

            throw new UnknownPersistenceException(ex.getMessage());
        }
    }
    
    @Override
    public void updateCheckList(CheckList checkList) throws CheckListNotFoundException {
        CheckList oldCheckList = em.find(CheckList.class, checkList.getCheckListId());
        
        if(oldCheckList != null ) {
            oldCheckList.setContent(checkList.getContent());
            oldCheckList.setIsShared(checkList.getIsShared());
            oldCheckList.setTitle(checkList.getTitle());
        } else {
            throw new CheckListNotFoundException("Checklist not found in the database");
        }
    }
    
    @Override
    public List<CheckList> getAllCheckListInTrip(Long tripId) throws TripNotFoundException {
        try {
            Trip trip = em.find(Trip.class, tripId);
            if(trip != null) {
                return trip.getCheckLists();
            } else {
                throw new TripNotFoundException("Trip not found");
            }
        }
        catch(Exception ex) {
            throw new TripNotFoundException("Trip not found");
        }
    }
}
