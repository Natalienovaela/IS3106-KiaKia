/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Debt;
import entity.Expense;
import entity.Trip;
import error.DebtNotFoundException;
import error.TripNotFoundException;
import error.UserNotFoundException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author MK
 */
@Local
public interface DebtSessionBeanLocal 
{
    
    public void handleDebt(Trip trip, Expense e, boolean isAddExpense) throws TripNotFoundException, DebtNotFoundException;
        
    public void payDebt(Long tripId, Long debtId, Long amt) throws TripNotFoundException;
        
    public List<Debt> getDebtsByUser(Long userId, Long tripID) throws TripNotFoundException, UserNotFoundException;
    
    public List<Debt> getDebtsOwedByUser(Long userId, Long tripId) throws TripNotFoundException, UserNotFoundException;

    public List<Debt> getOverallDebts(Long tripId) throws TripNotFoundException;
    
}