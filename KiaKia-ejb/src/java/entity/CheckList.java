/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 *
 * @author Natalienovaela
 */
@Entity
public class CheckList implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long checkListId;
    
    private String title;
    private List<String> content;
    private Boolean isShared;

    public Long getCheckListId() {
        return checkListId;
    }

    public void setCheckListId(Long checkListId) {
        this.checkListId = checkListId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (checkListId != null ? checkListId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the checkListId fields are not set
        if (!(object instanceof CheckList)) {
            return false;
        }
        CheckList other = (CheckList) object;
        if ((this.checkListId == null && other.checkListId != null) || (this.checkListId != null && !this.checkListId.equals(other.checkListId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.CheckList[ id=" + checkListId + " ]";
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getContent() {
        return content;
    }

    public void setContent(List<String> content) {
        this.content = content;
    }

    public Boolean getIsShared() {
        return isShared;
    }

    public void setIsShared(Boolean isShared) {
        this.isShared = isShared;
    }
    
}
