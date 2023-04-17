/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Budget;
import entity.BudgetExpenseCategory;
import error.BudgetNotFoundException;
import error.CategoryNotFoundException;
import error.TripNotFoundException;
import error.UnableToSetBudgetException;
import java.math.BigDecimal;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author MK
 */
@Local
public interface BudgetSessionBeanLocal 
{
    
    public void setBudget(Long tripId, Budget newB, Long categoryId) throws UnableToSetBudgetException, TripNotFoundException, CategoryNotFoundException;
    
    public void updateBudget(Budget budget) throws BudgetNotFoundException;
    
    public void deleteBudget(Long budgetId, Long tripId) throws BudgetNotFoundException, TripNotFoundException;
    
    public BigDecimal getBudgetByCategory(Long tripId, Long categoryId) throws BudgetNotFoundException, TripNotFoundException, CategoryNotFoundException;
    
    public List<BudgetExpenseCategory> getAvailableBudgetCategory(Long tripId) throws TripNotFoundException;
    
    public BigDecimal getTotalBudget(Long tripId) throws TripNotFoundException;
        
}