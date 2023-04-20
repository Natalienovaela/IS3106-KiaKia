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

/**
 *
 * @author MK
 */
@Entity
public class Budget implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long budgetId;
    private BigDecimal budgetAmt;
    private boolean isShared;

    public Budget() {
    }

    public Budget(BigDecimal budgetAmt, boolean isShared) {
        this.budgetAmt = budgetAmt;
        this.isShared = isShared;
    }

    public Long getBudgetId() {
        return budgetId;
    }

    public void setBudgetId(Long budgetId) {
        this.budgetId = budgetId;
    }

    public BigDecimal getBudgetAmt() {
        return budgetAmt;
    }

    public void setBudgetAmt(BigDecimal budgetAmt) {
        this.budgetAmt = budgetAmt;
    }

    public boolean isIsShared() {
        return isShared;
    }

    public void setIsShared(boolean isShared) {
        this.isShared = isShared;
    }

}