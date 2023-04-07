/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

/**
 *
 * @author MK
 */
@Entity
public class Debt implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long debtId;
    private BigDecimal amtOwed;
    
    @ManyToOne
    //@JoinColumn(name = "debtor_id")
    private User debtor;
    
    @ManyToOne
    //@JoinColumn(name = "creditor_id")
    private User creditor;
    
    @ManyToOne
    private Expense expense;

    public Long getDebtId() {
        return debtId;
    }

    public void setDebtId(Long debtId) {
        this.debtId = debtId;
    }

    public BigDecimal getAmtOwed() {
        return amtOwed;
    }

    public void setAmtOwed(BigDecimal amtOwed) {
        this.amtOwed = amtOwed;
    }

    public User getDebtor() {
        return debtor;
    }

    public void setDebtor(User debtor) {
        this.debtor = debtor;
    }

    public User getCreditor() {
        return creditor;
    }

    public void setCreditor(User creditor) {
        this.creditor = creditor;
    }

    public Expense getExpense() {
        return expense;
    }

    public void setExpense(Expense expense) {
        this.expense = expense;
    }
    
}
