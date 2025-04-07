import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./components/Landing";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import VotingList from "./components/Voting/VotingList";
import CastVote from "./components/Voting/CastVote";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/voting" element={<VotingList />} />
          <Route path="votecandidate/:candidateId" element={<CastVote />} />
          {/* <Route path="/test/:candidateId" element={<Test/>} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
