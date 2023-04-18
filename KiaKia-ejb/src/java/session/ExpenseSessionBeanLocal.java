/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Expense;
import error.CategoryNotFoundException;
import error.ExpenseNotFoundException;
import error.TripNotFoundException;
import java.math.BigDecimal;
import java.util.Map;
import javax.ejb.Local;

/**
 *
 * @author MK
 */
@Local
public interface ExpenseSessionBeanLocal 
{
    
    public void addExpense(Long tripId, Expense newE) throws TripNotFoundException, CategoryNotFoundException;
    
    public void updateExpense(Expense expense) throws ExpenseNotFoundException;
    
    public void deleteExpense(Long expenseId, Long tripId) throws ExpenseNotFoundException, TripNotFoundException;
    
    public Map<String, BigDecimal> getTotalExpenseByCategories(Long tripId) throws TripNotFoundException;
    
    public BigDecimal getTotalExpenseByCategory(Long tripId, Long categoryId) throws TripNotFoundException, CategoryNotFoundException;
    
    public BigDecimal getTotalExpense(Long tripId) throws TripNotFoundException;
        
    public BigDecimal getTotalExpenseByUser(Long userId, Long tripId) throws TripNotFoundException;
    
}