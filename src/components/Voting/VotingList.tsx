import React from "react";
import { Candidates, CandidateData } from "./CandidateData";
import { Voters, VoterData } from "../VoterInfo";
import CandidateCard from "./CandidateCard";
import "./VoteList.css";
import { useNavigate } from "react-router-dom";

const VotingList = () => {
  const [voterdata] = React.useState<VoterData | null>(Voters[0]);

  // Filter candidates based on user's location
  const filteredCandidates = Candidates.filter(
    (candidate) => candidate.location === voterdata?.userlocation
  );
  const navigate = useNavigate();

  const handleVote = (candidate: CandidateData) => {
    alert(`You are voting for ${candidate.cname} in ${candidate.location}!`);
    // navigate(`/votecasting/${candidate.cid}`);
    navigate(`/votecandidate/${candidate.cid}`);
  };

  const backBtn = () => {
    navigate("/profile");
  }
  const exitBtn = () => {
    navigate("/");
  }

  return (
    <div className="container mt-1">
      <h2 className="text-center mb-4 voting-page-line">CANDIDATE LIST</h2>
      <div className="d-flex flex-row justify-content-between">
        <button onClick={backBtn} className="back-btn">BACK</button>
        <button onClick={exitBtn} className="exit-btn-2">EXIT</button>
      </div>

      {/* Candidate List */}
      <div className="row">
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((candidate) => (
            <div className="col-md-12 mb-4" key={candidate.cname}>
              <CandidateCard
                candidate={candidate}
                onSelect={handleVote} // Pass the voting handler
              />
            </div>
          ))
        ) : (
          <p className="text-center">No candidates available for selection.</p>
        )}
      </div>
    </div>
  );
};

export default VotingList;
