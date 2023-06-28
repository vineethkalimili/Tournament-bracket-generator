import React, { useState, useEffect } from "react";

export default function Bracket({ contract }) {
  const [bracketState, setBracketState] = useState([]);

  // Fetch the bracket state from the smart contract
  const fetchBracketState = async () => {
    try {
      const result = await contract.getBracketState();
      setBracketState(result);
    } catch (error) {
      console.error(error);
    }
  };

  // Update the match result in the smart contract
  const updateMatchResult = async (
    roundIndex,
    matchIndex,
    participant1Score,
    participant2Score,
    winner
  ) => {
    try {
      await contract.updateMatchResult(
        roundIndex,
        matchIndex,
        participant1Score,
        participant2Score,
        winner
      );
      fetchBracketState(); // Refresh the bracket state after updating the result
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = (event, roundIndex, matchIndex) => {
    event.preventDefault();
    const form = event.target;
    const participant1Score = parseInt(form.elements.participant1Score.value);
    const participant2Score = parseInt(form.elements.participant2Score.value);
    const winner = form.elements.winner.value;

    // Validate participant scores
    if (isNaN(participant1Score) || isNaN(participant2Score)) {
      console.error("Invalid score value");
      return;
    }

    // Check if the winner is one of the participants
    const participant1 = bracketState[roundIndex]?.matches[matchIndex]?.participant1;
    const participant2 = bracketState[roundIndex]?.matches[matchIndex]?.participant2;

    if (![participant1, participant2].includes(winner)) {
      console.error("Invalid winner");
      return;
    }

    updateMatchResult(roundIndex, matchIndex, participant1Score, participant2Score, winner);
    form.reset();
  };

  // Render the bracket matches
  const renderMatches = (matches, roundIndex) => {
    return (
      matches?.map((match, matchIndex) => (
        <div key={matchIndex} className="match">
          <div className="participant">{match[0]}</div>
          <form
            className="match-form"
            data-round={roundIndex}
            data-match={matchIndex}
            onSubmit={(event) => handleFormSubmit(event, roundIndex, matchIndex)}
          >
            <input
              type="number"
              name="participant1Score"
              placeholder="Score"
              min="0"
              required
            />
            <span>vs</span>
            <input
              type="number"
              name="participant2Score"
              placeholder="Score"
              min="0"
              required
            />
            <input type="text" name="winner" placeholder="Winner" required />
            <button type="submit">Update</button>
          </form>
          <div className="participant">{match[1]}</div>
          {match[5] && <div className="winner">Winner: {match[5]}</div>}
        </div>
      )) ?? []
    );
  };

  // Render the bracket rounds
const renderRounds = () => {
    return (
      bracketState?.map((round, roundIndex) => (
        <div key={roundIndex} className="round">
          <h3>Round {roundIndex + 1}</h3>
          {renderMatches(round.matches, roundIndex)}
  
          {/* Render the next round matches */}
          {roundIndex < bracketState.length - 1 && (
            <div className="next-round-matches">
              <h4>Next Round</h4>
              {renderMatches(bracketState[roundIndex + 1]?.matches, roundIndex + 1)}
            </div>
          )}
        </div>
      )) ?? []
    );
  };

  // Fetch the bracket state when the component mounts
  useEffect(() => {
    fetchBracketState();
  }, []);

  return (
    <div>
      <h2>Bracket</h2>
      {renderRounds()}
    </div>
  );
}
