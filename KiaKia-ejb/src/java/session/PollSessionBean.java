/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Poll;
import entity.Trip;
import entity.User;
import error.PollClosedException;
import error.PollNotFoundException;
import error.TripNotFoundException;
import error.UnknownPersistenceException;
import error.UserHasPolledException;
import error.UserNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;

/**
 *
 * @author vinessa
 */
@Stateless
public class PollSessionBean implements PollSessionBeanLocal {

    @EJB
    private TripSessionBeanLocal tripSessionBeanLocal;

    @EJB
    private UserSessionBeanLocal userSessionBeanLocal;

    @PersistenceContext(unitName = "KiaKia-ejbPU")
    private EntityManager em;

    //for datainit
    @Override
    public Long createNewPoll(Poll poll, Long tripId) throws UnknownPersistenceException, TripNotFoundException {

        try {
            Trip trip = em.find(Trip.class, tripId);
//            User user = em.find(User.class, userId);

            if (trip != null && poll != null) {
                em.persist(poll);

//                User creator = userSessionBeanLocal.retrieveUserByUserId(userId);
//                poll.setCreator(creator);
                trip.getPolls().add(poll);

                em.flush(); //only need to flush bcs we are returning the id
                return poll.getPollId();
            } else {
                throw new TripNotFoundException("Trip id " + tripId + " does not exist");
            }
        } catch (PersistenceException ex) {
            throw new UnknownPersistenceException(ex.getMessage());
        }
    }

    @Override
    public Poll retrievePollByPollId(Long pollId) throws PollNotFoundException {
        Poll poll = em.find(Poll.class, pollId);

        if (poll != null) {
            return poll;
        } else {
            throw new PollNotFoundException("Poll ID " + pollId + " does not exist!");
        }
    }

    @Override
    public void updatePoll(Poll u) throws PollNotFoundException {
        try {
            Poll oldPoll = retrievePollByPollId(u.getPollId());
            oldPoll.setDescription(u.getDescription());
            oldPoll.setOptions(u.getOptions());
        } catch (PollNotFoundException ex) {
            throw new PollNotFoundException(ex.getMessage());
        }
    }

    @Override
    public void pollOption(Poll p, Long votedOption, Long userId) throws PollNotFoundException, UserNotFoundException, UserHasPolledException, PollClosedException {
        try {
            Poll oldPoll = retrievePollByPollId(p.getPollId());
            User u = userSessionBeanLocal.retrieveUserByUserId(userId);
            if (!hasUserPolled(oldPoll, u) && !oldPoll.isIsClosed()) {
                oldPoll.getPolledBy().add(u);
                HashMap<Long, List<Long>> oldVoting = oldPoll.getVoting();
                oldVoting.get(votedOption).add(u.getUserId());
            } else if (hasUserPolled(oldPoll, u)) {
                throw new UserHasPolledException("User has already polled");
            } else {
                throw new PollClosedException("Poll is already closed");
            }
        } catch (PollNotFoundException e) {
            throw new PollNotFoundException(e.getMessage());
        }
    }

    @Override
    public HashMap<Long, Double> calculatePercentage(Poll p) {
        HashMap<Long, List<Long>> voting = p.getVoting();
        HashMap<Long, Integer> count = new HashMap<>();
        int totalVotes = 0;
        for (Map.Entry<Long, List<Long>> entry : voting.entrySet()) {
            List<Long> votes = entry.getValue();
            int optionVote = 0;
            for (Long i : votes) {
                totalVotes++;
                optionVote++;
            }
            count.put(entry.getKey(), optionVote);
        }
        HashMap<Long, Double> res = new HashMap<>();
        for (Map.Entry<Long, Integer> c : count.entrySet()) {
            if (totalVotes > 0) {
                res.put(c.getKey(), (c.getValue() / Double.valueOf(totalVotes)));
            } else {
                res.put(c.getKey(), Double.valueOf(0));
            }
        }
        return res;
    }

    @Override
    public List<Poll> retrieveAllPolls() {
        return em.createQuery("SELECT p FROM Poll p").getResultList();
    }

    @Override
    public boolean hasUserPolled(Poll p, User u) {
        return p.getPolledBy().contains(u);
    }

    @Override
    public void removePoll(Long tripId, Long pollId) throws TripNotFoundException, PollNotFoundException {
        Trip trip = em.find(Trip.class, tripId);
        Poll poll = em.find(Poll.class, pollId);

        if (trip != null && poll != null) {
            trip.getPolls().remove(poll);
            em.remove(poll);
        } else {
            if (trip == null) {
                throw new TripNotFoundException("Trip not found in the database");
            }
            if (poll == null) {
                throw new PollNotFoundException("Poll not found in the database");
            }
        }
    }

    @Override
    public List<Poll> retrieveAllPollsInTrip(Long tripId) throws TripNotFoundException {
        Trip trip;
        try {
            trip = tripSessionBeanLocal.retrieveTripByTripId(tripId);
            System.out.println(trip.getTripId());
        } catch (TripNotFoundException ex) {
            System.out.println("Exception found");
            throw new TripNotFoundException(ex.getMessage());
        }
        System.out.println("POLLS IN TRIP ID: " + tripId);
        for(Poll p: trip.getPolls()) {
            System.out.println(p.getDescription());
        }
        return trip.getPolls();
    }

}
