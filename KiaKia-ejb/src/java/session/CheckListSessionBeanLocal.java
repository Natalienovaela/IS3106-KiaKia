/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.CheckList;
import entity.CheckListItem;
import error.CheckListItemNotFoundException;
import error.CheckListNotFoundException;
import error.TripNotFoundException;
import error.UnknownPersistenceException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author Natalienovaela
 */
@Local
public interface CheckListSessionBeanLocal {

    public CheckList createNewCheckList(Long tripId, String name) throws UnknownPersistenceException, TripNotFoundException;

    public void updateCheckList(CheckList checkList) throws CheckListNotFoundException;

    public List<CheckList> getAllCheckListInTrip(Long tripId) throws TripNotFoundException;

    public CheckList createCheckListItem(Long checkListId, String content) throws CheckListNotFoundException;

    public void removeCheckListItem(Long checkListId, Long checkListItemId) throws CheckListNotFoundException, CheckListItemNotFoundException;
    
}
