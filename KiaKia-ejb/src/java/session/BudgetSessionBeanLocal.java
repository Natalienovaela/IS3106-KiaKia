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
import java.util.Map;
import javax.ejb.Local;

/**
 *
 * @author MK
 */
@Local
public interface BudgetSessionBeanLocal 
{
    
    public void setBudget(Long tripId, Budget newB, Long categoryId) throws UnableToSetBudgetException, TripNotFoundException, CategoryNotFoundException;
    
    public void updateBudget(Long budgetId, Long budgetAmt) throws BudgetNotFoundException;
    
    public void deleteBudget(Long categoryId, Long tripId) throws CategoryNotFoundException, BudgetNotFoundException, TripNotFoundException;
    
    public Map<Long, BigDecimal> getBudgetByCategory(Long categoryId) throws BudgetNotFoundException, CategoryNotFoundException;
    
    public List<BudgetExpenseCategory> getAvailableBudgetCategory(Long tripId) throws TripNotFoundException;
    
    public List<BudgetExpenseCategory> getAssociatedCategory(Long tripId) throws TripNotFoundException;
    
    public List<BudgetExpenseCategory> getAssociatedBudgetCategory(Long tripId) throws TripNotFoundException;
    
    public List<BudgetExpenseCategory> getAllCategories(Long tripId) throws TripNotFoundException;
    
    public BigDecimal getTotalBudget(Long tripId) throws TripNotFoundException;
        
}