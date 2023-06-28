// import Link from "next/link"

// export default function Home() {
//   return (<div>Home!!!
//     <div>
//     <Link href="/new">new</Link>
//     </div>
//   </div>)
// }

"use client";

import React from "react";
import BracketForm from "@/components/BracketForm";
import Bracket from "@/components/Bracket";
import contract from "../ethers"

export default function Home() {
  const createBracket = async (numParticipants, participantNames) => {
    try {
      // Call the createBracket function of the smart contract
      await contract.createBracket(numParticipants, participantNames);
      // Refresh the page to display the bracket
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Tournament Bracket Generator</h1>
      <BracketForm createBracket={createBracket} />
      <hr />
      <Bracket contract={contract} />
    </div>
  );
}