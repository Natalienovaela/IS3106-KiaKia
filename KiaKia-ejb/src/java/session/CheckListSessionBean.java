/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.CheckList;
import entity.CheckListItem;
import entity.Trip;
import entity.User;
import error.CheckListItemNotFoundException;
import error.CheckListNotFoundException;
import error.TripNotFoundException;
import error.UnknownPersistenceException;
import error.UserNotFoundException;
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
    public CheckList createNewCheckList(Long tripId, String name) throws UnknownPersistenceException, TripNotFoundException {

        try {
            CheckList checkList = new CheckList(name);
            em.persist(checkList);
            try {
                Trip trip = em.find(Trip.class, tripId);
                trip.getCheckLists().add(checkList);
                return checkList;
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

        if (oldCheckList != null) {
            oldCheckList.setCheckListItem(checkList.getCheckListItem());
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
            if (trip != null) {
                List<CheckList> checklists = trip.getCheckLists();
                for (CheckList checklist : checklists) {
                    checklist.getCheckListItem().size();
                }
                return checklists;
            } else {
                throw new TripNotFoundException("Trip not found");
            }
        } catch (Exception ex) {
            throw new TripNotFoundException("Trip not found");
        }
    }

    @Override
    public CheckList createCheckListItem(Long checkListId, String content) throws CheckListNotFoundException {
        try {
            CheckList checklist = em.find(CheckList.class, checkListId);
            CheckListItem checkListItem = new CheckListItem();
            checkListItem.setDescription(content);
            em.persist(checkListItem);
            em.flush();
            checklist.getCheckListItem().add(checkListItem);
            return checklist;
        } catch (PersistenceException ex) {
            throw new CheckListNotFoundException("CheckList not found");
        }
    }

    @Override
    public void removeCheckListItem(Long checkListId, Long checklistItemId) throws CheckListNotFoundException, CheckListItemNotFoundException {
        try {
            CheckList checklist = em.find(CheckList.class, checkListId);
            try {
                CheckListItem checklistItem = em.find(CheckListItem.class, checklistItemId);
                checklist.getCheckListItem().remove(checklistItem);
                em.remove(checklistItem);
            } catch (IllegalArgumentException ex) {
                throw new CheckListItemNotFoundException("Checklist item not found");
            }

        } catch (PersistenceException ex) {
            throw new CheckListNotFoundException("CheckList not found");
        }
    }
}
