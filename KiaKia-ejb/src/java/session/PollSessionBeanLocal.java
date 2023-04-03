/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Poll;
import entity.User;
import error.PollClosedException;
import error.PollNotFoundException;
import error.TripNotFoundException;
import error.UnknownPersistenceException;
import error.UserHasPolledException;
import error.UserNotFoundException;
import javax.ejb.Local;

/**
 *
 * @author vinessa
 */
@Local
public interface PollSessionBeanLocal {

    public Poll retrievePollByPollId(Long PollId) throws PollNotFoundException;

    public void updatePoll(Poll u) throws PollNotFoundException;

    public void pollOption(Poll p, Long votedOption, Long userId) throws PollNotFoundException, UserNotFoundException, UserHasPolledException, PollClosedException;

    public boolean hasUserPolled(Poll p, User u);

    public Long createNewPoll(Poll poll, Long tripId, Long userId) throws UnknownPersistenceException, UserNotFoundException, TripNotFoundException;
    
}
