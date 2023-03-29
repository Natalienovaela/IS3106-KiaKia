/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

/**
 *
 * @author vinessa
 */
@Entity
public class Poll implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long pollId;
    private String description;
    private HashMap<String, List<Long>> options;
    private boolean isClosed;
    
//    @ManyToOne(optional=false)
//    @JoinColumn(nullable=false)
//    private User creator;
    
//    @ManyToMany
//    private List<User> participants;

    public Long getPollId() {
        return pollId;
    }

    public void setPollId(Long pollId) {
        this.pollId = pollId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (pollId != null ? pollId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the pollId fields are not set
        if (!(object instanceof Poll)) {
            return false;
        }
        Poll other = (Poll) object;
        if ((this.pollId == null && other.pollId != null) || (this.pollId != null && !this.pollId.equals(other.pollId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Poll[ id=" + pollId + " ]";
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public HashMap<String, List<Long>> getOptions() {
        return options;
    }

    public void setOptions(HashMap<String, List<Long>> options) {
        this.options = options;
    }

    public boolean isIsClosed() {
        return isClosed;
    }

    public void setIsClosed(boolean isClosed) {
        this.isClosed = isClosed;
    }
    
}