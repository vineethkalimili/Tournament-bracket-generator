

import { ethers } from "ethers";
import TournamentBracketGenerator from "./TournamentBracketGenerator.json"

// Connect to the Ethereum provider
// const provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/yhN7F2vQ9rUhr6ATQzuqrZrKO1xY_ejz");

// Connect to the Ethereum provider provided by MetaMask
const provider = new ethers.providers.Web3Provider(window.ethereum);

// Request access to the user's MetaMask accounts
async function requestAccounts() {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.error("Error requesting accounts:", error);
    }
  }
  
  // Check if MetaMask is installed and connected
  if (window.ethereum) {
    requestAccounts();
  } else {
    console.error("MetaMask is not installed.");
  }
// Get the signer from the provider
const signer = provider.getSigner();

// Create an instance of the smart contract
const contractAddress = "0x6ea29388A9e8cB920fAfe2Bb4D24AeF00497031B";
const contractABI = TournamentBracketGenerator;
const contract = new ethers.Contract(contractAddress, contractABI, signer);

export default contract;
