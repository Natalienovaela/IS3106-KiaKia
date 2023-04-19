import Api from "../../Helpers/Api";
import CreatePoll from "./CreatePoll";
import Poll from "./Poll";
import React, { useState, useEffect } from "react";

const TripPolls = ({ userId, tripId, userRole }) => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    reloadPolls();
  }, []);

  const reloadPolls = () => {
    Api.getAllPollsInTrip(tripId)
      .then((res) => {
        if (!res.ok) {
          //http OK from server
          console.log("error");
          throw Error("could not fetch data");
        }
        return res.json(); //return another promise of data
      })
      .then((data) => {
        setPolls(data);
        console.log("POLLS IN THIS TRIP " + tripId);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="trip-polls">
      <div className="rowComponent">
        <h2>Polls</h2>
        {userRole !== "VIEWER" && (
          <CreatePoll tripId={tripId} userId={userId} setPolls={setPolls} />
        )}
        {/* <div>
        <button className="note btn container" onClick={handleCreateNote}>
          Create Note
        </button>
      </div> */}
      </div>
      {polls &&
        polls.map((poll) => (
          <div key={poll.pollId} className="rowComponent">
            <div className="pollComponent">
              <Poll
                userId={userId}
                tripId={tripId}
                pollId={poll.pollId}
                userRole={userRole}
                setPolls={setPolls}
              />
            </div>
            {/* <div>
              <button className="btn" onClick={() => handleDelete(note.noteId)}>
                Delete
              </button>
            </div> */}
          </div>
        ))}
    </div>
  );
};

export default TripPolls;
