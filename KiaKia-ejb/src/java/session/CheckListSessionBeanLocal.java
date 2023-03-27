/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.CheckList;
import error.CheckListNotFoundException;
import error.UnknownPersistenceException;
import javax.ejb.Local;

/**
 *
 * @author Natalienovaela
 */
@Local
public interface CheckListSessionBeanLocal {

    public void createNewCheckList(CheckList checkList) throws UnknownPersistenceException;

    public void updateCheckList(CheckList checkList) throws CheckListNotFoundException;
    
}
