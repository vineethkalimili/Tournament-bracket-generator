import React, { useState } from "react";

export default function BracketForm({ createBracket }) {
  const [numParticipants, setNumParticipants] = useState("");
  const [participantNames, setParticipantNames] = useState([]);

  const handleNumParticipantsChange = (e) => {
    setNumParticipants(e.target.value);
  };

  const handleParticipantNameChange = (index, e) => {
    const names = [...participantNames];
    names[index] = e.target.value;
    setParticipantNames(names);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createBracket(numParticipants, participantNames);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Number of Participants:
        <input type="number" value={numParticipants} onChange={handleNumParticipantsChange} />
      </label>
      <br />
      {[...Array(Number(numParticipants))].map((_, index) => (
        <div key={index}>
          <label>
            Participant {index + 1} Name:
            <input type="text" value={participantNames[index] || ""} onChange={(e) => handleParticipantNameChange(index, e)} />
          </label>
          <br />
        </div>
      ))}
      <button type="submit">Generate Bracket</button>
    </form>
  );
}
