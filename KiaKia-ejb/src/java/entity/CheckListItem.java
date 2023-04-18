/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 *
 * @author Natalienovaela
 */
@Entity
public class CheckListItem implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long checklistItemId;
    
    private Boolean isChecked = Boolean.FALSE;
    private String description;

    public CheckListItem() {
        
    }
    
    public Long getChecklistItemId() {
        return checklistItemId;
    }

    public void setChecklistItemId(Long checklistItemId) {
        this.checklistItemId = checklistItemId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (checklistItemId != null ? checklistItemId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the checklistItemId fields are not set
        if (!(object instanceof CheckListItem)) {
            return false;
        }
        CheckListItem other = (CheckListItem) object;
        if ((this.checklistItemId == null && other.checklistItemId != null) || (this.checklistItemId != null && !this.checklistItemId.equals(other.checklistItemId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.CheckListItem[ id=" + checklistItemId + " ]";
    }

    public Boolean getIsChecked() {
        return isChecked;
    }

    public void setIsChecked(Boolean isChecked) {
        this.isChecked = isChecked;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
}
