/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Debt;
import entity.Expense;
import entity.Trip;
import entity.User;
import error.DebtNotFoundException;
import error.TripNotFoundException;
import error.UserNotFoundException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author MK
 */
@Stateless
public class DebtSessionBean implements DebtSessionBeanLocal 
{

    @PersistenceContext(unitName = "KiaKia-ejbPU")
    private EntityManager em;

    @Override
    public void handleDebt(Trip trip, Expense e, boolean isAddExpense) throws TripNotFoundException, DebtNotFoundException
    {
        User payer = e.getPayer();
        List<User> payees = e.getPayees();
        BigDecimal amtPerUser = e.getExpenseAmt().divide(new BigDecimal(payees.size() + 1));
        BigDecimal splitAmt = isAddExpense ? amtPerUser : amtPerUser.negate();

        for (User u: payees)
        {             
            Debt debt = getDebtByPayerAndBeneficiary(trip.getDebts(), payer.getUserId(), u.getUserId());
            
            if (debt != null)
            {
                if (debt.getCreditor().equals(payer))
                {
                    debt.setAmtOwed(debt.getAmtOwed().add(splitAmt));
                }
                else
                {
                    debt.setAmtOwed(debt.getAmtOwed().subtract(splitAmt));
                }
            }
            else
            {
                if (isAddExpense)
                {
                    addDebt(payer, u, splitAmt, trip);
                }
                else
                {
                    throw new DebtNotFoundException("Debt not found");
                }
            }
        }
    }
    
    public void addDebt(User creditor, User debtor, BigDecimal splitAmt, Trip trip) 
    {
        Debt d = new Debt();
        d.setCreditor(creditor);
        d.setDebtor(debtor);
        d.setAmtOwed(splitAmt);
        trip.getDebts().add(d);
        em.persist(d); 
    }

    @Override
    public void payDebt(Long tripId, Long payerId, Long beneficiaryId, Long amt) throws TripNotFoundException
    {
        if (tripId == null || payerId == null || beneficiaryId == null) 
        {
            throw new IllegalArgumentException("Trip ID, Payer ID, and Beneficiary ID cannot be null.");
        }
        
        Trip trip = em.find(Trip.class, tripId);
        if (trip == null)
        {
            throw new TripNotFoundException("Trip not found");
        }
        
        Debt d = getDebtByPayerAndBeneficiary(trip.getDebts(), payerId, beneficiaryId);
        
        BigDecimal amtToBePaid = new BigDecimal(amt);
        if (amtToBePaid.compareTo(BigDecimal.ZERO) == -1 || amtToBePaid.compareTo(d.getAmtOwed()) == 1)
        {
            throw new IllegalArgumentException("Amount to be paid cannot be negative or more than the amount owed.");
        }
        
        if (d.getCreditor().getUserId() == payerId)
        {
            d.setAmtOwed(d.getAmtOwed().subtract(amtToBePaid));
        }
        else
        {
            d.setAmtOwed(d.getAmtOwed().add(amtToBePaid));
        }
    }
    
    public Debt getDebtByPayerAndBeneficiary(List<Debt> debts, Long payerId, Long beneficiaryId)
    {
        for (Debt d: debts)
        {
            if ((d.getDebtor().getUserId().equals(payerId) && d.getCreditor().getUserId().equals(payerId)) 
                  || (d.getDebtor().getUserId().equals(beneficiaryId) && d.getCreditor().getUserId().equals(beneficiaryId)))
                {
                    return d;
                }
        }
        
        return null;
    }

    @Override
    public List<Debt> getDebtsByUser(Long userId, Long tripId) throws TripNotFoundException, UserNotFoundException
    {
        if (tripId == null || userId == null) 
        {
            throw new IllegalArgumentException("Trip ID or User ID cannot be null.");
        }
        
        Trip trip = em.find(Trip.class, tripId);
        if (trip == null)
        {
            throw new TripNotFoundException("Trip not found");
        }
        
        User user = em.find(User.class, userId);
        if (user == null)
        {
            throw new UserNotFoundException("User not found.");
        }
        
        List<Debt> debtsByUser = new ArrayList<>();
        for (Debt d: trip.getDebts())
        {
            if (d.getDebtor().equals(user) || d.getCreditor().equals(user))
            {
                debtsByUser.add(d);
            }
        }
        
        return debtsByUser;
    }

    @Override
    public List<Debt> getOverallDebts(Long tripId) throws TripNotFoundException
    {
        if (tripId == null) 
        {
            throw new IllegalArgumentException("Trip ID cannot be null.");
        }
        
        Trip trip = em.find(Trip.class, tripId);
        if (trip == null)
        {
            throw new TripNotFoundException("Trip not found");
        }
        
        return trip.getDebts();
    }

}